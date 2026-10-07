import { Hono } from "hono";
import { cors } from "hono/cors";
import { APP_NAME, type HealthResponse } from "@electrical-hero/shared";
import type { AppEnv } from "./env";
import { errorResponse } from "./http";
import { accounts } from "./routes/accounts";
import { codeSpecs } from "./routes/codeSpecs";
import { protocols } from "./routes/protocols";
import { regulations } from "./routes/regulations";
import { rules } from "./routes/rules";
import { scenarios } from "./routes/scenarios";
import { sessions } from "./routes/sessions";
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
app.route("/scenarios", scenarios);
app.route("/sessions", sessions);
app.route("/safety-protocols", protocols);
app.route("/code-specs", codeSpecs);
app.route("/regulations", regulations);

export default app;
