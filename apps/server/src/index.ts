import { Hono } from "hono";
import { cors } from "hono/cors";
import { APP_NAME, type HealthResponse } from "@electrical-hero/shared";
import type { AppEnv } from "./env";
import { errorResponse } from "./http";
import { accounts } from "./routes/accounts";
import { rules } from "./routes/rules";
import { templates } from "./routes/templates";

const app = new Hono<AppEnv>();

app.use("*", cors());
app.onError(errorResponse);
app.notFound((c) => c.json({ error: "Not found" }, 404));

app.get("/health", (c) => {
  const body: HealthResponse = { status: "ok", app: APP_NAME };
  return c.json(body);
});

app.route("/accounts", accounts);
app.route("/rules", rules);
app.route("/scenario-templates", templates);

export default app;
