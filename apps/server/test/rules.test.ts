import { describe, expect, it } from "vitest";
import { joinRules } from "../src/domain/rules";

describe("joinRules", () => {
  it("joins rule files in key order separated by blank lines", () => {
    expect(joinRules([{ key: "co/b.md", text: "B\n" }, { key: "co/a.md", text: "  A" }])).toBe("A\n\nB");
  });
});
