import { describe, expect, it } from "vitest";
import app from "../src/index";

describe("app shell", () => {
  it("GET /health returns ok", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok", app: "Electrical Hero" });
  });

  it("unknown routes return a JSON 404", async () => {
    const res = await app.request("/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not found" });
  });

  it("allows cross-origin requests", async () => {
    const res = await app.request("/health", { headers: { origin: "https://example.com" } });
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
  });
});
