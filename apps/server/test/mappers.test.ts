import { describe, expect, it } from "vitest";
import {
  hiddenJson,
  parseFeatures,
  scenarioHidden,
  toAccountSummary,
  toScenarioPublic,
  toSessionDetail,
  type AccountRow,
  type ScenarioRow,
  type SessionRow,
} from "../src/domain/mappers";

const account: AccountRow = {
  id: "acct-1", company_id: "co-1", name: "Tower", building_type: "Office",
  address_line1: "1 Main St", city: "Springfield", state: "IL", postal_code: "62701",
  site_contact_name: "Pat", site_contact_phone: "555-0100",
  service_summary: "480Y/277V", critical_info: "Roof access by escort only",
  features: '["generator","ats"]', config_key: "acct-1.md",
};

const generated = {
  title: "Dark suite", briefing: "Lights out in 400.",
  hiddenFacts: ["SECRET-CAUSE breaker 14 tripped"], expectedApproach: ["LOTO"],
  rubric: [{ criterion: "Applies LOTO", ruleId: "R-LOTO-01" }], redFlags: ["Works hot"],
};

const scenario: ScenarioRow = {
  id: "scn-1", account_id: "acct-1", template_id: "tmpl-a", title: "Dark suite", difficulty: "intermediate",
  briefing: "Lights out in 400.", hidden_json: hiddenJson(generated), created_at: "2026-10-07T00:00:00.000Z",
};

describe("mappers", () => {
  it("toAccountSummary parses features and shapes the address", () => {
    expect(toAccountSummary(account)).toEqual({
      id: "acct-1", name: "Tower", buildingType: "Office",
      address: { line1: "1 Main St", city: "Springfield", state: "IL", postalCode: "62701" },
      serviceSummary: "480Y/277V", features: ["generator", "ats"],
    });
  });

  it("parseFeatures tolerates bad JSON and non-arrays", () => {
    expect(parseFeatures("nope")).toEqual([]);
    expect(parseFeatures('{"a":1}')).toEqual([]);
    expect(parseFeatures('["a",2]')).toEqual(["a"]);
  });

  it("toScenarioPublic never exposes hidden fields", () => {
    const pub = toScenarioPublic(scenario);
    expect(Object.keys(pub).sort()).toEqual(["accountId", "briefing", "createdAt", "difficulty", "id", "templateId", "title"]);
    expect(JSON.stringify(pub)).not.toContain("SECRET-CAUSE");
  });

  it("scenarioHidden round-trips the generated hidden fields", () => {
    expect(scenarioHidden(scenario)).toEqual({
      hiddenFacts: generated.hiddenFacts, expectedApproach: generated.expectedApproach,
      rubric: generated.rubric, redFlags: generated.redFlags,
    });
  });

  it("toSessionDetail parses the stored debrief", () => {
    const session: SessionRow = {
      id: "s1", account_id: "acct-1", scenario_id: null, mode: "briefing", trainee_name: "Sam",
      status: "completed", debrief_json: '{"score":70,"verdict":"ok","strengths":[],"gaps":[],"ruleViolations":[],"rubric":[]}',
      created_at: "t0", ended_at: "t1",
    };
    const detail = toSessionDetail(session, [{ id: "m1", session_id: "s1", role: "user", content: "hi", created_at: "t0" }]);
    expect(detail.debrief?.score).toBe(70);
    expect(detail.messages).toEqual([{ id: "m1", role: "user", content: "hi", createdAt: "t0" }]);
    expect(detail.traineeName).toBe("Sam");
  });
});
