import { Hono } from "hono";
import type { ScenarioTemplateSummary } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { notFound } from "../http";
import { getAccount } from "../data/db";
import { listTemplates } from "../data/content";
import { parseFeatures } from "../domain/mappers";
import { isApplicable, toTemplateSummary } from "../domain/templates";

export const templates = new Hono<AppEnv>().get("/", async (c) => {
  let list = await listTemplates(c.env);
  const accountId = c.req.query("accountId");
  if (accountId) {
    const account = await getAccount(c.env.DB, accountId);
    if (!account) throw notFound("account not found");
    const features = parseFeatures(account.features);
    list = list.filter((t) => isApplicable(t, features));
  }
  const body: ScenarioTemplateSummary[] = list.map(toTemplateSummary);
  return c.json(body);
});
