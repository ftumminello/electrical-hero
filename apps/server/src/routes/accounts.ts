import { Hono } from "hono";
import type { AccountDetail, AccountSummary, CodeSpec, SafetyProtocolSummary, ScenarioPublic } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { notFound } from "../http";
import { getAccount, listAccounts, listScenariosForAccount } from "../data/db";
import { getClientConfig, getCodeSpec, listProtocols } from "../data/content";
import { jurisdictionFor } from "../domain/codespecs";
import { parseFeatures, toAccountDetail, toAccountSummary, toScenarioPublic } from "../domain/mappers";
import { protocolApplies, toProtocolSummary } from "../domain/protocols";

export const accounts = new Hono<AppEnv>()
  .get("/", async (c) => {
    const body: AccountSummary[] = (await listAccounts(c.env.DB, c.env.COMPANY_ID)).map(toAccountSummary);
    return c.json(body);
  })
  .get("/:id", async (c) => {
    const row = await getAccount(c.env.DB, c.req.param("id"));
    if (!row) throw notFound("account not found");
    const body: AccountDetail = toAccountDetail(row, await getClientConfig(c.env, row.config_key));
    return c.json(body);
  })
  .get("/:id/scenarios", async (c) => {
    const row = await getAccount(c.env.DB, c.req.param("id"));
    if (!row) throw notFound("account not found");
    const body: ScenarioPublic[] = (await listScenariosForAccount(c.env.DB, row.id)).map(toScenarioPublic);
    return c.json(body);
  })
  .get("/:id/safety-protocols", async (c) => {
    const row = await getAccount(c.env.DB, c.req.param("id"));
    if (!row) throw notFound("account not found");
    const features = parseFeatures(row.features);
    const body: SafetyProtocolSummary[] = (await listProtocols(c.env))
      .filter((p) => protocolApplies(p, features))
      .map(toProtocolSummary);
    return c.json(body);
  })
  .get("/:id/code-specs", async (c) => {
    const row = await getAccount(c.env.DB, c.req.param("id"));
    if (!row) throw notFound("account not found");
    const jurisdiction = jurisdictionFor(row.state);
    const body: CodeSpec | null = await getCodeSpec(c.env, jurisdiction);
    if (!body) throw notFound(`no code spec has been written for ${jurisdiction} yet`);
    return c.json(body);
  });
