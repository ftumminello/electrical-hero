import { Hono } from "hono";
import type { Regulation } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { badRequest } from "../http";
import { getRegulation } from "../data/ecfr";
import { isAllowedSection } from "../domain/ecfr";

export const regulations = new Hono<AppEnv>().get("/cfr/29/:section", async (c) => {
  const section = c.req.param("section");
  if (!isAllowedSection(section)) {
    throw badRequest("section must be an OSHA 29 CFR part 1910 or 1926 section, like 1910.333 or 1926.417");
  }
  const body: Regulation = await getRegulation(section);
  return c.json(body);
});
