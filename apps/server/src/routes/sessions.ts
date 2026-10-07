import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { z } from "zod";
import type { Debrief, SessionDetail } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { badRequest, notFound, readJson } from "../http";
import {
  completeSession,
  createSession,
  getAccount,
  getScenario,
  getSession,
  insertMessage,
  listMessages,
  newMessage,
  now,
} from "../data/db";
import { loadReference, loadSite } from "../data/content";
import { scenarioHidden, toSessionDetail, type ScenarioRow, type SessionRow } from "../domain/mappers";
import {
  briefingSystemPrompt,
  debriefMessages,
  scenarioSystemPrompt,
  type ModelMessage,
  type ScenarioForPrompt,
  type SiteContext,
} from "../domain/prompts";
import { DebriefSchema } from "../domain/schemas";
import { textDeltas } from "../domain/stream";
import { generateJson, streamChat } from "../ai";

const CreateSessionBody = z.object({
  accountId: z.string().min(1),
  scenarioId: z.string().min(1).optional(),
  traineeName: z.string().trim().min(1).max(100),
});

const SendMessageBody = z.object({ content: z.string().trim().min(1).max(4000) });

async function requireSession(db: D1Database, id: string): Promise<SessionRow> {
  const session = await getSession(db, id);
  if (!session) throw notFound("session not found");
  return session;
}

/**
 * Site file + rules, and the scenario (with hidden fields) when the session has one. With
 * `withReference` (debriefs) it also loads the scenario's safety protocols and the local code;
 * chat turns skip them to stay within the free AI budget.
 */
async function sessionContext(
  env: Env,
  session: SessionRow,
  withReference = false,
): Promise<{ site: SiteContext; scenario: ScenarioForPrompt | null }> {
  const account = await getAccount(env.DB, session.account_id);
  if (!account) throw notFound("account not found");
  const row = session.scenario_id ? await getScenario(env.DB, session.scenario_id) : null;
  const scenario = row ? { title: row.title, briefing: row.briefing, ...scenarioHidden(row) } : null;
  const site = await loadSite(env, account);
  if (!withReference) return { site, scenario };
  return { site: { ...site, ...(await loadReference(env, account, scenario?.protocolIds ?? [])) }, scenario };
}

export const sessions = new Hono<AppEnv>()
  .post("/", async (c) => {
    const req = await readJson(c, CreateSessionBody);
    const account = await getAccount(c.env.DB, req.accountId);
    if (!account) throw notFound("account not found");
    let scenario: ScenarioRow | null = null;
    if (req.scenarioId) {
      scenario = await getScenario(c.env.DB, req.scenarioId);
      if (!scenario) throw notFound("scenario not found");
      if (scenario.account_id !== account.id) throw badRequest("scenario belongs to a different account");
    }
    const session: SessionRow = {
      id: crypto.randomUUID(),
      account_id: account.id,
      scenario_id: scenario?.id ?? null,
      mode: scenario ? "scenario" : "briefing",
      trainee_name: req.traineeName,
      status: "active",
      debrief_json: null,
      created_at: now(),
      ended_at: null,
    };
    const opening = scenario ? newMessage(session.id, "assistant", `Dispatch: ${scenario.briefing}`) : null;
    await createSession(c.env.DB, session, opening);
    const body: SessionDetail = toSessionDetail(session, opening ? [opening] : []);
    return c.json(body, 201);
  })
  .get("/:id", async (c) => {
    const session = await requireSession(c.env.DB, c.req.param("id"));
    const body: SessionDetail = toSessionDetail(session, await listMessages(c.env.DB, session.id));
    return c.json(body);
  })
  .post("/:id/messages", async (c) => {
    const { content } = await readJson(c, SendMessageBody);
    const session = await requireSession(c.env.DB, c.req.param("id"));
    if (session.status !== "active") throw badRequest("session is completed; start a new session to keep training");
    const { site, scenario } = await sessionContext(c.env, session);
    const history = await listMessages(c.env.DB, session.id);
    const userMessage = newMessage(session.id, "user", content);
    const messages: ModelMessage[] = [
      { role: "system", content: scenario ? scenarioSystemPrompt(site, scenario) : briefingSystemPrompt(site) },
      ...[...history, userMessage].map((m) => ({ role: m.role, content: m.content })),
    ];
    // Called before streaming starts so an AI failure still returns a normal JSON 502,
    // and before saving the message so a failed turn leaves no orphan in the history.
    const upstream = await streamChat(c.env, messages);
    await insertMessage(c.env.DB, userMessage);
    return streamSSE(c, async (stream) => {
      const turn = (async () => {
        let reply = "";
        try {
          for await (const text of textDeltas(upstream)) {
            reply += text;
            await stream.writeSSE({ event: "delta", data: JSON.stringify({ text }) });
          }
          if (!reply.trim()) throw new Error("AI returned an empty reply");
          const saved = newMessage(session.id, "assistant", reply);
          await insertMessage(c.env.DB, saved);
          await stream.writeSSE({ event: "done", data: JSON.stringify({ messageId: saved.id }) });
        } catch (e) {
          await stream.writeSSE({ event: "error", data: JSON.stringify({ error: (e as Error).message }) });
        }
      })();
      // Keep the invocation alive so the reply is still saved if the client disconnects mid-stream.
      c.executionCtx.waitUntil(turn);
      await turn;
    });
  })
  .post("/:id/debrief", async (c) => {
    const session = await requireSession(c.env.DB, c.req.param("id"));
    if (session.debrief_json) {
      const stored = JSON.parse(session.debrief_json) as Debrief;
      return c.json(stored);
    }
    const transcript = await listMessages(c.env.DB, session.id);
    if (!transcript.some((m) => m.role === "user")) {
      throw badRequest("nothing to grade yet: the electrician has not sent any messages");
    }
    const { site, scenario } = await sessionContext(c.env, session, true);
    const debrief: Debrief = await generateJson(c.env, debriefMessages(site, transcript, scenario), DebriefSchema);
    await completeSession(c.env.DB, session.id, JSON.stringify(debrief), now());
    return c.json(debrief);
  });
