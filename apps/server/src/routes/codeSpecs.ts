import { Hono } from "hono";
import type { CodeSpec } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { notFound } from "../http";
import { getCodeSpec } from "../data/content";

export const codeSpecs = new Hono<AppEnv>().get("/:id", async (c) => {
  const body: CodeSpec | null = await getCodeSpec(c.env, c.req.param("id"));
  if (!body) throw notFound("code spec not found");
  return c.json(body);
});
