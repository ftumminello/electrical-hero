import { describe, expect, it } from "vitest";
import { isSafeId, jurisdictionFor, parseCodeSpec } from "../src/domain/codespecs";

const md = `---
id: us-wa
name: Washington State
nec_edition: 2023 NEC (NFPA 70-2023)
next_edition: 2026 NEC, effective 2026-12-31
authority: Washington State Department of Labor & Industries (L&I), Electrical Program
amendments: WAC 296-46B
---
## Adopted codes & effective dates

Text.
`;

describe("code specs", () => {
  it("parses front matter and body", () => {
    expect(parseCodeSpec(md)).toEqual({
      id: "us-wa",
      name: "Washington State",
      necEdition: "2023 NEC (NFPA 70-2023)",
      nextEdition: "2026 NEC, effective 2026-12-31",
      authority: "Washington State Department of Labor & Industries (L&I), Electrical Program",
      amendments: "WAC 296-46B",
      markdown: "## Adopted codes & effective dates\n\nText.",
    });
  });

  it("treats a missing next edition as null", () => {
    expect(parseCodeSpec(md.replace(/next_edition:.*\n/, "")).nextEdition).toBeNull();
  });

  it("rejects a spec without a NEC edition", () => {
    expect(() => parseCodeSpec(md.replace(/nec_edition:.*\n/, ""))).toThrow(/nec_edition/);
  });

  it("derives the jurisdiction from the state", () => {
    expect(jurisdictionFor(" WA ")).toBe("us-wa");
  });

  it("only accepts simple lower-case ids", () => {
    expect(isSafeId("us-wa")).toBe(true);
    expect(isSafeId("sp-loto")).toBe(true);
    for (const bad of ["../x", "sp.loto", "", "US-WA", "a/b"]) expect(isSafeId(bad), bad).toBe(false);
  });
});
