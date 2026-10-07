import { describe, expect, it } from "vitest";
import { joinProtocols, parseProtocol, protocolApplies, toProtocolSummary } from "../src/domain/protocols";

const md = `---
id: sp-generator-ats
title: Generators and automatic transfer switches
category: emergency-systems
applies_to: [generator]
rules: [R-EMERG-01, R-ESC-01]
osha: [1910.147, 1910.333]
nfpa70e: [Art. 120, Art. 130]
---
## When this applies

Any work on a generator.
`;

describe("safety protocols", () => {
  it("parses front matter and body", () => {
    expect(parseProtocol(md)).toEqual({
      id: "sp-generator-ats",
      title: "Generators and automatic transfer switches",
      category: "emergency-systems",
      appliesTo: ["generator"],
      rules: ["R-EMERG-01", "R-ESC-01"],
      osha: ["1910.147", "1910.333"],
      nfpa70e: ["Art. 120", "Art. 130"],
      markdown: "## When this applies\n\nAny work on a generator.",
    });
  });

  it("rejects a protocol without an id", () => {
    expect(() => parseProtocol(md.replace("id: sp-generator-ats\n", ""))).toThrow(/id/);
  });

  it("applies when the site has every listed feature; an empty list applies everywhere", () => {
    const p = parseProtocol(md);
    expect(protocolApplies(p, ["generator", "ats"])).toBe(true);
    expect(protocolApplies(p, ["ats"])).toBe(false);
    expect(protocolApplies({ ...p, appliesTo: [] }, [])).toBe(true);
  });

  it("summary drops the markdown", () => {
    expect(toProtocolSummary(parseProtocol(md))).not.toHaveProperty("markdown");
  });

  it("joins protocols under titled headings", () => {
    const p = parseProtocol(md);
    expect(joinProtocols([p, { ...p, id: "sp-x", title: "X" }])).toBe(
      "### Generators and automatic transfer switches (sp-generator-ats)\n\n## When this applies\n\nAny work on a generator.\n\n### X (sp-x)\n\n## When this applies\n\nAny work on a generator.",
    );
  });
});
