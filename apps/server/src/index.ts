import { Hono } from "hono";
import { cors } from "hono/cors";
import { APP_NAME, type HealthResponse } from "@electrical-hero/shared";
import type { AppEnv } from "./env";
import { errorResponse } from "./http";

const app = new Hono<AppEnv>();

app.use("*", cors());
app.onError(errorResponse);
app.notFound((c) => c.json({ error: "Not found" }, 404));

app.get("/health", (c) => {
  const body: HealthResponse = { status: "ok", app: APP_NAME };
  return c.json(body);
});

export default app;
