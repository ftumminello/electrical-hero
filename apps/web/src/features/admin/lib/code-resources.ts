export const RESOURCE_TYPES = [
  "Code text",
  "State amendments",
  "Inspection authority",
  "Federal regulation",
  "Manufacturer docs",
  "Other",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export type CodeResource = {
  id: string;
  name: string;
  url: string;
  type: ResourceType;
  /** e.g. "WA", "Seattle", "US", "National". */
  jurisdiction: string;
  notes?: string;
  addedAt: string;
};

/** Starter list of official sources the company would normally bookmark. Links checked 2026-10-07. */
export const DEFAULT_RESOURCES: CodeResource[] = [
  {
    id: "nfpa-70-free-access",
    name: "NFPA 70 (NEC): free read-only access",
    url: "https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards/free-access",
    type: "Code text",
    jurisdiction: "National",
    notes: "Free NFPA account required. Read-only; the code text can't be copied into Electrical Hero.",
    addedAt: "2026-10-07T00:00:00.000Z",
  },
  {
    id: "wac-296-46b",
    name: "WAC 296-46B: Washington electrical rules",
    url: "https://app.leg.wa.gov/WAC/default.aspx?cite=296-46B",
    type: "State amendments",
    jurisdiction: "WA",
    addedAt: "2026-10-07T00:00:00.000Z",
  },
  {
    id: "lni-electrical-rules",
    name: "L&I Electrical: laws, rules & policies",
    url: "https://lni.wa.gov/licensing-permits/electrical/laws-rules-policies",
    type: "Inspection authority",
    jurisdiction: "WA",
    notes: "Rulemaking status, including the 2026 NEC adoption.",
    addedAt: "2026-10-07T00:00:00.000Z",
  },
  {
    id: "osha-1910-subpart-s",
    name: "OSHA 29 CFR 1910 Subpart S: electrical",
    url: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-S",
    type: "Federal regulation",
    jurisdiction: "US",
    addedAt: "2026-10-07T00:00:00.000Z",
  },
];

/** Only http(s) links are saved, so a pasted `javascript:` or `data:` URL can never become a clickable link. */
export function parseResourceUrl(raw: string): URL | null {
  try {
    const url = new URL(raw.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}
