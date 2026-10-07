import { Hono } from "hono";
import type { SafetyProtocol, SafetyProtocolSummary } from "@electrical-hero/shared";
import type { AppEnv } from "../env";
import { notFound } from "../http";
import { getProtocol, listProtocols } from "../data/content";
import { toProtocolSummary } from "../domain/protocols";

export const protocols = new Hono<AppEnv>()
  .get("/", async (c) => {
    const body: SafetyProtocolSummary[] = (await listProtocols(c.env)).map(toProtocolSummary);
    return c.json(body);
  })
  .get("/:id", async (c) => {
    const body: SafetyProtocol | null = await getProtocol(c.env, c.req.param("id"));
    if (!body) throw notFound("safety protocol not found");
    return c.json(body);
  });
