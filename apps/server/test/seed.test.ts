import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseCodeSpec } from "../src/domain/codespecs";
import { isAllowedSection } from "../src/domain/ecfr";
import { parseProtocol, protocolApplies } from "../src/domain/protocols";
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
const protocolFiles = readdirSync(join(seed, "protocols"));
const protocols = protocolFiles.map((f) => parseProtocol(read("protocols", f)));
const accountStates = [...sql.matchAll(/'([A-Z]{2})', '\d{5}'/g)].map((m) => m[1]);

const inOrder = (text: string, headings: string[]): boolean => {
  const at = headings.map((h) => text.indexOf(h));
  return at.every((p) => p > -1) && at.every((p, i) => i === 0 || p > at[i - 1]);
};
const PROTOCOL_SECTIONS = ["## When this applies", "## Hazards", "## PPE & tools", "## Procedure", "## Verification", "## Stop-work triggers", "## Records"];
const CODE_SPEC_SECTIONS = [
  "## Adopted codes & effective dates",
  "## Authority, permits & inspections",
  "## Licensing & supervision",
  "## State amendments that matter on commercial jobs",
  "## Workplace safety rules",
  "## Sources",
];

/** Every site file must cover the same ground so scenarios have real detail to draw on. */
const SITE_FILE_SECTIONS = [
  "## 1. Site overview & access",
  "## 2. Contacts & escalation",
  "## 3. Utility service",
  "## 4. One-line diagram",
  "## 5. Switchboard & feeders",
  "## 6. Panel schedules",
  "## 7. Transformers",
  "## 8. Grounding & bonding",
  "## 9. Emergency, standby & life safety",
  "## 10. Motors, drives & special systems",
  "## 11. Lockout/tagout procedures",
  "## 12. Arc-flash & PPE",
  "## 13. Maintenance & test records",
  "## 14. Known issues, deficiencies & history",
];

describe("seed content", () => {
  it("has 11 templates and 3 accounts with site files", () => {
    expect(templates).toHaveLength(11);
    expect(accountFeatures).toHaveLength(3);
    expect(configKeys.sort()).toEqual(clientFiles.sort());
  });

  it("every account qualifies for at least six templates", () => {
    for (const features of accountFeatures) {
      expect(templates.filter((t) => isApplicable(t, features)).length).toBeGreaterThanOrEqual(6);
    }
  });

  it("every template applies to at least one account", () => {
    for (const t of templates) expect(accountFeatures.some((f) => isApplicable(t, f)), t.id).toBe(true);
  });

  it("every rule a template stresses exists in the company rulebook", () => {
    for (const t of templates) for (const id of t.rules) expect(rulesText).toContain(id);
  });

  it("every site file has all required sections, in order", () => {
    for (const f of clientFiles) {
      const text = read("clients", f);
      const positions = SITE_FILE_SECTIONS.map((h) => text.indexOf(h));
      for (const [i, pos] of positions.entries()) expect(pos, `${f}: ${SITE_FILE_SECTIONS[i]}`).toBeGreaterThan(-1);
      expect([...positions].sort((a, b) => a - b), `${f}: section order`).toEqual(positions);
    }
  });

  it("site files are detailed but still fit the AI budget", () => {
    for (const f of clientFiles) {
      const n = words(read("clients", f));
      expect(n, f).toBeGreaterThanOrEqual(3000);
      expect(n, f).toBeLessThanOrEqual(6000);
    }
    expect(words(rulesText)).toBeLessThanOrEqual(1500);
  });
});

describe("safety protocols", () => {
  it("has the 12 protocols, each file named after its id", () => {
    expect(protocols).toHaveLength(12);
    for (const [i, p] of protocols.entries()) expect(protocolFiles[i]).toBe(`${p.id}.md`);
  });

  it("every protocol has the seven sections in order and a usable length", () => {
    for (const f of protocolFiles) {
      const text = read("protocols", f);
      expect(inOrder(text, PROTOCOL_SECTIONS), f).toBe(true);
      expect(words(text), f).toBeGreaterThanOrEqual(350);
      expect(words(text), f).toBeLessThanOrEqual(900);
    }
  });

  it("protocols cite real company rules and fetchable OSHA sections", () => {
    for (const p of protocols) {
      expect(p.rules.length, p.id).toBeGreaterThan(0);
      for (const id of p.rules) expect(rulesText, `${p.id} -> ${id}`).toContain(id);
      for (const section of p.osha) expect(isAllowedSection(section), `${p.id} -> ${section}`).toBe(true);
    }
  });

  it("every template lists protocols that exist and apply wherever the template applies", () => {
    for (const t of templates) {
      expect(t.protocols.length, t.id).toBeGreaterThan(0);
      for (const id of t.protocols) {
        const p = protocols.find((x) => x.id === id);
        expect(p, `${t.id} -> ${id}`).toBeDefined();
        for (const features of accountFeatures.filter((f) => isApplicable(t, f))) {
          expect(protocolApplies(p!, features), `${t.id} -> ${id}`).toBe(true);
        }
      }
    }
  });
});

describe("code specs", () => {
  it("every account's state has a complete, sourced code spec", () => {
    expect(accountStates).toHaveLength(3);
    for (const state of new Set(accountStates)) {
      const file = `us-${state.toLowerCase()}.md`;
      const text = read("code-specs", file);
      expect(parseCodeSpec(text).id).toBe(`us-${state.toLowerCase()}`);
      expect(inOrder(text, CODE_SPEC_SECTIONS), file).toBe(true);
      expect(words(text), file).toBeGreaterThanOrEqual(800);
      expect(words(text), file).toBeLessThanOrEqual(1600);
      expect((text.match(/https:\/\//g) ?? []).length, file).toBeGreaterThanOrEqual(3);
    }
  });
});
