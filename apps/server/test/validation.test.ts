import { describe, expect, it } from "vitest";
import app from "../src/index";

// No bindings: these requests must be rejected before any D1/R2/AI access.
const env = {} as Env;
const post = (path: string, body: string) =>
  app.request(path, { method: "POST", headers: { "content-type": "application/json" }, body }, env);

describe("request validation", () => {
  it("POST /sessions rejects a body that is not JSON", async () => {
    const res = await post("/sessions", "not json");
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Request body must be valid JSON" });
  });

  it("POST /sessions rejects a blank traineeName", async () => {
    const res = await post("/sessions", JSON.stringify({ accountId: "acct-x", traineeName: "   " }));
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: string }).error).toMatch(/traineeName/);
  });

  it("POST /scenarios rejects a missing accountId", async () => {
    const res = await post("/scenarios", JSON.stringify({ templateId: "tmpl-x" }));
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: string }).error).toMatch(/accountId/);
  });

  it("POST /sessions/:id/messages rejects whitespace-only content", async () => {
    const res = await post("/sessions/s-1/messages", JSON.stringify({ content: "  \n " }));
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: string }).error).toMatch(/content/);
  });
});
