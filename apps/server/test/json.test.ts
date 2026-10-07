import { describe, expect, it } from "vitest";
import { completionText, extractJsonObject, parseModelJson } from "../src/domain/json";
import { DebriefSchema, GeneratedScenarioSchema } from "../src/domain/schemas";

describe("extractJsonObject", () => {
  it("finds an object surrounded by prose and code fences", () => {
    expect(extractJsonObject('Sure!\n```json\n{"a":1,"b":{"c":"}"}}\n```')).toEqual({ a: 1, b: { c: "}" } });
  });

  it("handles escaped quotes and braces inside strings", () => {
    expect(extractJsonObject('{"q":"say \\"hi\\" {"}')).toEqual({ q: 'say "hi" {' });
  });

  it("throws when there is no object", () => {
    expect(() => extractJsonObject("no json here")).toThrow(/no JSON object/);
  });

  it("throws on an unterminated object", () => {
    expect(() => extractJsonObject('{"a": 1')).toThrow(/unterminated/);
  });
});

describe("parseModelJson", () => {
  it("reports schema errors naming the field", () => {
    const r = parseModelJson('{"score": 50}', DebriefSchema);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/verdict/);
  });

  it("coerces numeric strings and defaults missing arrays", () => {
    expect(parseModelJson('{"score":"85","verdict":"Solid"}', DebriefSchema)).toEqual({
      ok: true,
      value: { score: 85, verdict: "Solid", strengths: [], gaps: [], ruleViolations: [], rubric: [] },
    });
  });

  it("requires a non-empty rubric for generated scenarios", () => {
    const r = parseModelJson(
      '{"title":"t","briefing":"b","hiddenFacts":["h"],"expectedApproach":["e"],"rubric":[],"redFlags":[]}',
      GeneratedScenarioSchema,
    );
    expect(r.ok).toBe(false);
  });

  it("returns the error message when no JSON is present", () => {
    expect(parseModelJson("nope", DebriefSchema)).toEqual({ ok: false, error: "no JSON object in model output" });
  });
});

describe("completionText", () => {
  it("reads both non-streaming output shapes", () => {
    expect(completionText({ choices: [{ message: { content: "x" } }] })).toBe("x");
    expect(completionText({ response: "y" })).toBe("y");
    expect(completionText(undefined)).toBe("");
  });
});
