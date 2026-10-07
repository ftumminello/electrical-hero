import { Hono } from "hono";
import type { AccountDetail, AccountSummary, ScenarioPublic } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { notFound } from "../http";
import { getAccount, listAccounts, listScenariosForAccount } from "../data/db";
import { getClientConfig } from "../data/content";
import { toAccountDetail, toAccountSummary, toScenarioPublic } from "../domain/mappers";

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
  });
