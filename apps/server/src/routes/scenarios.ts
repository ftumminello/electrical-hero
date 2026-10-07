import { Hono } from "hono";
import { z } from "zod";
import type { ScenarioPublic } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { badRequest, notFound, readJson } from "../http";
import { getAccount, getScenario, insertScenario, now } from "../data/db";
import { listTemplates, loadSite } from "../data/content";
import { hiddenJson, parseFeatures, toScenarioPublic, type ScenarioRow } from "../domain/mappers";
import { scenarioGenerationMessages } from "../domain/prompts";
import { GeneratedScenarioSchema } from "../domain/schemas";
import { isApplicable } from "../domain/templates";
import { generateJson } from "../ai";

const CreateScenarioBody = z.object({
  accountId: z.string().min(1),
  templateId: z.string().min(1).optional(),
});

export const scenarios = new Hono<AppEnv>()
  .post("/", async (c) => {
    const req = await readJson(c, CreateScenarioBody);
    const account = await getAccount(c.env.DB, req.accountId);
    if (!account) throw notFound("account not found");
    const features = parseFeatures(account.features);
    const applicable = (await listTemplates(c.env)).filter((t) => isApplicable(t, features));
    const template = req.templateId
      ? applicable.find((t) => t.id === req.templateId)
      : applicable[Math.floor(Math.random() * applicable.length)];
    if (!template) {
      throw badRequest(
        req.templateId
          ? `template ${req.templateId} does not exist or does not apply to this account`
          : "no scenario templates apply to this account",
      );
    }
    const site = await loadSite(c.env, account);
    const generated = await generateJson(c.env, scenarioGenerationMessages(site, template), GeneratedScenarioSchema);
    const row: ScenarioRow = {
      id: crypto.randomUUID(),
      account_id: account.id,
      template_id: template.id,
      title: generated.title,
      difficulty: template.difficulty,
      briefing: generated.briefing,
      hidden_json: hiddenJson(generated),
      created_at: now(),
    };
    await insertScenario(c.env.DB, row);
    const body: ScenarioPublic = toScenarioPublic(row);
    return c.json(body, 201);
  })
  .get("/:id", async (c) => {
    const row = await getScenario(c.env.DB, c.req.param("id"));
    if (!row) throw notFound("scenario not found");
    const body: ScenarioPublic = toScenarioPublic(row);
    return c.json(body);
  });
