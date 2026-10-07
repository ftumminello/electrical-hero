import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "../src/domain/frontmatter";

describe("parseFrontmatter", () => {
  it("parses scalars, lists, comments and colons in values", () => {
    const md = "---\nid: tmpl-x\ntitle: A: B\nrequires: [generator, ats]  # both needed\nempty: []\n---\nBody line\n";
    expect(parseFrontmatter(md)).toEqual({
      data: { id: "tmpl-x", title: "A: B", requires: ["generator", "ats"], empty: [] },
      body: "Body line\n",
    });
  });

  it("returns the whole text as body when there is no front matter", () => {
    expect(parseFrontmatter("# Just markdown")).toEqual({ data: {}, body: "# Just markdown" });
  });

  it("handles CRLF line endings", () => {
    expect(parseFrontmatter("---\r\nid: a\r\n---\r\nB")).toEqual({ data: { id: "a" }, body: "B" });
  });
});
