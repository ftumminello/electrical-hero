import { describe, expect, it } from "vitest";
import { decodeEntities, ecfrReaderUrl, ecfrSectionUrl, ecfrXmlToText, isAllowedSection } from "../src/domain/ecfr";

describe("eCFR helpers", () => {
  it("allows only OSHA parts 1910 and 1926 sections", () => {
    for (const ok of ["1910.333", "1926.417", "1910.1200"]) expect(isAllowedSection(ok), ok).toBe(true);
    for (const bad of ["1910.147a", "29.1910", "1904.7", "1910.", "1910.12345", ""]) expect(isAllowedSection(bad), bad).toBe(false);
  });

  it("builds the versioner and reader URLs", () => {
    expect(ecfrSectionUrl("2026-10-06", "1926.416")).toBe(
      "https://www.ecfr.gov/api/versioner/v1/full/2026-10-06/title-29.xml?part=1926&section=1926.416",
    );
    expect(ecfrReaderUrl("1910.333")).toBe("https://www.ecfr.gov/current/title-29/section-1910.333");
  });

  it("decodes named and numeric entities", () => {
    expect(decodeEntities("&#167; A &amp; B &#x2014; C &bogus;")).toBe("§ A & B — C &bogus;");
  });

  it("turns section XML into a heading and paragraphs, dropping citations", () => {
    const xml =
      '<DIV8 N="1926.416" TYPE="SECTION"><HEAD>§ 1926.416 General requirements.</HEAD><P>(a) <I>Protection.</I> A &amp; B</P><NOTE><HED>Note</HED><P>Note text.</P></NOTE><CITA TYPE="N">[44 FR 8577]</CITA></DIV8>';
    expect(ecfrXmlToText(xml)).toEqual({ heading: "§ 1926.416 General requirements.", text: "(a) Protection. A & B\n\nNote text." });
  });
});
