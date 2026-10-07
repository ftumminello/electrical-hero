import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { isApplicable, parseTemplate } from "../src/domain/templates";

const seed = fileURLToPath(new URL("../seed/", import.meta.url));
const read = (...p: string[]) => readFileSync(join(seed, ...p), "utf8");
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

const templates = readdirSync(join(seed, "templates")).map((f) => parseTemplate(read("templates", f)));
const rulesText = readdirSync(join(seed, "rules/co-kestrel")).map((f) => read("rules/co-kestrel", f)).join("\n");
const sql = read("seed.sql");
const accountFeatures = [...sql.matchAll(/'(\[[^']*\])'/g)].map((m) => JSON.parse(m[1]) as string[]);
const configKeys = [...sql.matchAll(/'(acct-[a-z-]+\.md)'/g)].map((m) => m[1]);
const clientFiles = readdirSync(join(seed, "clients"));

describe("seed content", () => {
  it("has 5 templates and 3 accounts with site files", () => {
    expect(templates).toHaveLength(5);
    expect(accountFeatures).toHaveLength(3);
    expect(configKeys.sort()).toEqual(clientFiles.sort());
  });

  it("every account qualifies for at least three templates", () => {
    for (const features of accountFeatures) {
      expect(templates.filter((t) => isApplicable(t, features)).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every rule a template stresses exists in the company rulebook", () => {
    for (const t of templates) for (const id of t.rules) expect(rulesText).toContain(id);
  });

  it("site files and rules stay compact for the free AI budget", () => {
    for (const f of clientFiles) expect(words(read("clients", f))).toBeLessThanOrEqual(2600);
    expect(words(rulesText)).toBeLessThanOrEqual(1500);
  });
});
