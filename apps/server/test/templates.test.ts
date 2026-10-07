import { describe, expect, it } from "vitest";
import { isApplicable, parseTemplate, toTemplateSummary } from "../src/domain/templates";

const md = `---
id: tmpl-a
title: Test template
difficulty: advanced
requires: [generator]
skills: [troubleshooting]
rules: [R-LOTO-01]
protocols: [sp-loto]
---
Do the thing.
`;

describe("templates", () => {
  it("parseTemplate reads front matter and instructions", () => {
    expect(parseTemplate(md)).toEqual({
      id: "tmpl-a",
      title: "Test template",
      difficulty: "advanced",
      requires: ["generator"],
      skills: ["troubleshooting"],
      rules: ["R-LOTO-01"],
      protocols: ["sp-loto"],
      instructions: "Do the thing.",
    });
  });

  it("parseTemplate rejects an invalid difficulty", () => {
    expect(() => parseTemplate(md.replace("advanced", "expert"))).toThrow(/difficulty/);
  });

  it("parseTemplate rejects a missing id", () => {
    expect(() => parseTemplate(md.replace("id: tmpl-a\n", ""))).toThrow(/id/);
  });

  it("isApplicable needs every required feature", () => {
    expect(isApplicable({ requires: ["generator", "ats"] }, ["ats", "generator", "x"])).toBe(true);
    expect(isApplicable({ requires: ["generator", "ats"] }, ["generator"])).toBe(false);
    expect(isApplicable({ requires: [] }, [])).toBe(true);
  });

  it("toTemplateSummary drops the instructions", () => {
    expect(toTemplateSummary(parseTemplate(md))).not.toHaveProperty("instructions");
  });
});
