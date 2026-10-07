# Safety protocols & electrical code — frontend guide

How the Expo and Next.js apps fetch and show the contractor's **safety protocols**, a site's **local electrical code spec**, and live **OSHA regulation text**. All of it is read-only `GET` JSON. There's no auth, and errors are always `{ "error": string }`, readable enough to show to a user.

- **Base URL:** `https://electrical-hero-api.electrical-hero.workers.dev` (Next.js dev: `/api/...`).
- **Types:** `import type { SafetyProtocol, SafetyProtocolSummary, CodeSpec, Regulation } from "@electrical-hero/shared"`.
- **Full schema:** [`openapi.yaml`](./openapi.yaml). The general API guide is [`README.md`](./README.md).

## Endpoints

| Method | Path | Returns | Use it for |
|---|---|---|---|
| GET | `/accounts/{accountId}/safety-protocols` | `SafetyProtocolSummary[]` | The protocols that apply **at this site** (matched to the site's equipment) |
| GET | `/safety-protocols` | `SafetyProtocolSummary[]` | The contractor's whole protocol library |
| GET | `/safety-protocols/{protocolId}` | `SafetyProtocol` | One protocol, with its full procedure as Markdown |
| GET | `/accounts/{accountId}/code-specs` | `CodeSpec` | The electrical code in force where the site is |
| GET | `/code-specs/{jurisdictionId}` | `CodeSpec` | A jurisdiction directly, e.g. `us-wa` |
| GET | `/regulations/cfr/29/{section}` | `Regulation` | Live OSHA text for a section a protocol cites, e.g. `1910.333` |

Scenario templates (`GET /scenario-templates`) now carry `protocols: string[]`, the protocol IDs each scenario type exercises.

## The shapes

```ts
interface SafetyProtocolSummary {
  id: string;          // "sp-loto"
  title: string;       // "Lockout/tagout and verifying absence of voltage"
  category: string;    // "isolation" | "energized-work" | "ppe" | "permits" | "switching" | "emergency-systems" | …
  appliesTo: string[]; // site features required; [] = every site
  rules: string[];     // company rule IDs, e.g. "R-LOTO-01" (text via GET /rules)
  osha: string[];      // 29 CFR sections, e.g. "1910.147": fetchable from /regulations
  nfpa70e: string[];   // article references, e.g. "Art. 120" (citations only)
}
interface SafetyProtocol extends SafetyProtocolSummary {
  markdown: string;    // sections: When this applies · Hazards · PPE & tools · Procedure · Verification · Stop-work triggers · Records
}

interface CodeSpec {
  id: string;                 // "us-wa"
  name: string;               // "Washington State"
  necEdition: string;         // edition in force today, e.g. "2023 NEC (NFPA 70-2023)"
  nextEdition: string | null; // upcoming edition + effective date, if one is adopted
  authority: string;          // who permits and inspects
  amendments: string;         // the state's amendment rules, e.g. "WAC 296-46B"
  markdown: string;           // sections: Adopted codes & effective dates · Authority, permits & inspections ·
                              // Licensing & supervision · State amendments that matter on commercial jobs ·
                              // Workplace safety rules · Sources
}

interface Regulation {
  section: string;   // "1910.333"
  heading: string;   // "§ 1910.333 Selection and use of work practices."
  text: string;      // plain text, paragraphs separated by a blank line
  sourceUrl: string; // the official eCFR page: link to it
  asOf: string;      // eCFR "up to date as of" date, e.g. "2026-10-06"
}
```

## Suggested screens

### Site → "Safety" tab

1. `GET /accounts/{accountId}/safety-protocols` gives the list. Group it by `category` and show each `title`.
2. On tap, `GET /safety-protocols/{id}` and render `markdown`. Show `rules` as chips; tapping one shows that rule from `GET /rules`, where each rule is a `## R-XXX-01 — …` section.
3. Show `osha` as chips too. On tap, `GET /regulations/cfr/29/{section}` and show `heading`, then `text`, then "Source: eCFR, current as of {asOf}" linking to `sourceUrl`.

```ts
const api = (path: string) => fetch(`${BASE_URL}${path}`).then(async (r) => {
  const body = await r.json();
  if (!r.ok) throw new Error(body.error);
  return body;
});

const siteProtocols: SafetyProtocolSummary[] = await api(`/accounts/${accountId}/safety-protocols`);
const protocol: SafetyProtocol = await api(`/safety-protocols/${siteProtocols[0].id}`);
const osha: Regulation = await api(`/regulations/cfr/29/${protocol.osha[0]}`);
```

These responses are plain JSON, so the platform's normal `fetch` works on Expo too. You only need `expo/fetch` for the streamed chat.

### Site → "Code" tab

1. `GET /accounts/{accountId}/code-specs`.
2. Show a header card: `name`, **In force:** `necEdition`, **Next:** `nextEdition` (hide it when `null`), **Authority:** `authority`, **State amendments:** `amendments`.
3. Render `markdown` below. Its `## Sources` section links the official pages.
4. A **404** means no code spec has been written for that site's jurisdiction yet. Show "No local code summary for this location yet" rather than an error.

### Scenario screen

The template's `protocols` lists the procedures the scenario tests. Show them as "Know before you go" links to `/safety-protocols/{id}`. Debriefs grade against these same protocols and the site's code spec, so a trainee who reads them first knows what they'll be graded on.

## Rendering Markdown

`markdown` fields are CommonMark: headings, numbered and bullet lists, bold, links and tables. Any Markdown renderer works, for example `react-markdown` on web or `react-native-markdown-display` on Expo. Neither is installed yet; add one through the usual `pnpm` / `npx expo install`. Don't render it as HTML strings.

## Behaviour to handle

| Situation | What the API does | What the UI should do |
|---|---|---|
| Unknown protocol or code-spec id, or an id that isn't a simple slug like `sp-loto` | 404 | "Not found" |
| Site's jurisdiction has no code spec | 404 on `/accounts/{id}/code-specs` | The friendly empty state above |
| Section not in OSHA parts 1910 or 1926 (e.g. `1910.147a`) | 400 | Shouldn't happen if you only use IDs from `osha`. Show the error if it does |
| Section eCFR doesn't have | 404 | "Not found" |
| eCFR is down | 502 | "Regulation text is temporarily unavailable" plus a link to `https://www.ecfr.gov/current/title-29/section-{section}` |
| First fetch of a regulation | Can take 1–5 s; then cached for 24 h | Show a spinner on the first open |

## Legal notes to show in the UI

- **OSHA text** comes live from the official eCFR. It's public domain, so show it in full and link `sourceUrl`.
- **NEC and NFPA 70E** are copyrighted. Protocols and code specs cite their article and section numbers and **paraphrase**; they never reproduce the code. Put a one-line note on the Code tab: "Summaries for training. Always work to the adopted code and the authority having jurisdiction."
- Code specs were researched on 2026-10-07 from the sources they list; the date is in the file.
