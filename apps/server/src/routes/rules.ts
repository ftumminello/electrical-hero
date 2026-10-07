import { Hono } from "hono";
import type { CompanyRules } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { getCompanyRules } from "../data/content";

export const rules = new Hono<AppEnv>().get("/", async (c) => {
  const body: CompanyRules = { companyId: c.env.COMPANY_ID, markdown: await getCompanyRules(c.env, c.env.COMPANY_ID) };
  return c.json(body);
});
