// Pure helpers for the eCFR versioner API (29 CFR: OSHA). Fetching and caching live in data/ecfr.ts.

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** OSHA general industry (1910) and construction (1926) sections only, so the endpoint is not an open proxy. */
export const isAllowedSection = (section: string): boolean => /^(1910|1926)\.\d{1,4}$/.test(section);

export const ecfrSectionUrl = (date: string, section: string): string =>
  `https://www.ecfr.gov/api/versioner/v1/full/${date}/title-29.xml?part=${section.split(".")[0]}&section=${section}`;

export const ecfrReaderUrl = (section: string): string => `https://www.ecfr.gov/current/title-29/section-${section}`;

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] !== "#") return ENTITIES[code.toLowerCase()] ?? match;
    const hex = code[1] === "x" || code[1] === "X";
    return String.fromCodePoint(parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10));
  });
}

const clean = (s: string): string => decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** Section XML → heading + plain-text paragraphs; amendment citations are dropped. */
export function ecfrXmlToText(xml: string): { heading: string; text: string } {
  const heading = clean(/<HEAD>([\s\S]*?)<\/HEAD>/.exec(xml)?.[1] ?? "");
  const body = xml.replace(/<CITA[\s\S]*?<\/CITA>/g, "");
  const paragraphs = [...body.matchAll(/<(P|FP)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)].map((m) => clean(m[2])).filter(Boolean);
  return { heading, text: paragraphs.join("\n\n") };
}
