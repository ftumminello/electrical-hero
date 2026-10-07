import { describe, expect, it } from "vitest";
import app from "../src/index";

// No bindings and no network: these must be rejected before any R2 lookup or eCFR fetch.
const env = {} as Env;
const get = (path: string) => app.request(path, {}, env);

describe("reference endpoints reject bad ids up front", () => {
  it("rejects a regulation section outside OSHA parts 1910/1926", async () => {
    for (const section of ["1910.147a", "29.1910", "1904.7"]) {
      const res = await get(`/regulations/cfr/29/${section}`);
      expect(res.status, section).toBe(400);
      expect(((await res.json()) as { error: string }).error).toMatch(/1910\.333/);
    }
  });

  it("never looks up a protocol id that isn't a simple slug", async () => {
    for (const id of ["..%2Fx", "sp.loto", "SP-LOTO"]) {
      const res = await get(`/safety-protocols/${id}`);
      expect(res.status, id).toBe(404);
    }
  });

  it("never looks up a code-spec id that isn't a simple slug", async () => {
    const res = await get("/code-specs/US_WA");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "code spec not found" });
  });
});
