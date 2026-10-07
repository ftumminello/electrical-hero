import { describe, expect, it } from "vitest";
import app from "../src/index";
import type { AccountRow, MessageRow, SessionRow } from "../src/domain/mappers";

const account: AccountRow = {
  id: "acct-1", company_id: "co-1", name: "Tower", building_type: "Office",
  address_line1: "1 Main St", city: "Springfield", state: "IL", postal_code: "62701",
  site_contact_name: null, site_contact_phone: null, service_summary: "480Y/277V",
  critical_info: "none", features: "[]", config_key: "acct-1.md",
};
const session: SessionRow = {
  id: "s-1", account_id: "acct-1", scenario_id: null, mode: "briefing", trainee_name: "Sam",
  status: "active", debrief_json: null, created_at: "t0", ended_at: null,
};

/** Just enough D1/R2/AI to drive POST /sessions/:id/messages for a briefing session. */
function fakeEnv(ai: (inputs: Record<string, unknown>) => unknown) {
  const messages: MessageRow[] = [];
  const statement = (sql: string, args: unknown[] = []) => ({
    bind: (...a: unknown[]) => statement(sql, a),
    first: async () =>
      sql.includes("FROM sessions") ? session : sql.includes("FROM accounts") ? account : null,
    all: async () => ({ results: sql.includes("FROM messages") ? [...messages] : [] }),
    run: async () => {
      if (sql.startsWith("INSERT INTO messages")) {
        const [id, session_id, role, content, created_at] = args as string[];
        messages.push({ id, session_id, role: role as MessageRow["role"], content, created_at });
      }
    },
  });
  const bucket = {
    get: async () => ({ text: async () => "site or rules text" }),
    list: async () => ({ objects: [{ key: "co-1/standards.md" }] }),
  };
  const env = {
    AI_MODEL: "@cf/openai/gpt-oss-120b",
    AI: { run: async (_m: string, inputs: Record<string, unknown>) => ai(inputs) },
    DB: { prepare: (sql: string) => statement(sql) },
    CLIENT_CONFIGS: bucket,
    COMPANY_RULES: bucket,
  } as unknown as Env;
  return { env, messages };
}

function sse(...payloads: string[]): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream({
    start(ctrl) {
      for (const p of payloads) ctrl.enqueue(enc.encode(`data: ${p}\n\n`));
      ctrl.close();
    },
  });
}

function ctx() {
  const pending: Promise<unknown>[] = [];
  return { pending, executionCtx: { waitUntil: (p: Promise<unknown>) => void pending.push(p), passThroughOnException() {}, props: {} } };
}

const send = (env: Env, executionCtx: unknown) =>
  app.request(
    "/sessions/s-1/messages",
    { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ content: "Where is LP-4A?" }) },
    env,
    executionCtx as ExecutionContext,
  );

describe("POST /sessions/:id/messages", () => {
  it("does not save the electrician's message when the AI fails before streaming", async () => {
    const { env, messages } = fakeEnv(() => {
      throw new Error("neurons exhausted");
    });
    const res = await send(env, ctx().executionCtx);
    expect(res.status).toBe(502);
    expect(messages).toEqual([]);
  });

  it("saves the message and the reply, and keeps the turn alive via waitUntil", async () => {
    const { env, messages } = fakeEnv(() => sse('{"response":"In "}', '{"response":"EC-04."}', "[DONE]"));
    const { pending, executionCtx } = ctx();
    const res = await send(env, executionCtx);
    const body = await res.text();
    await Promise.all(pending);
    expect(body).toContain("event: done");
    expect(pending.length).toBeGreaterThan(0);
    expect(messages.map((m) => [m.role, m.content])).toEqual([
      ["user", "Where is LP-4A?"],
      ["assistant", "In EC-04."],
    ]);
  });
});
