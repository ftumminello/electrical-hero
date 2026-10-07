# Safety protocols & local code specs — design

Date: 2026-10-07 · Status: approved in chat ("yes, write the spec and build it") · Scope: `apps/server`, `packages/shared`, `docs/api`

## 1. Purpose

Electricians need two kinds of reference on demand, beside the site files they already get:

1. **Safety protocols:** the contractor's task-level procedures (lockout/tagout, energized diagnostics, arc-flash PPE, and so on), pregenerated as Markdown in R2 in the same style as the other content.
2. **Local electrical code specs:** what code is in force where a site is, who enforces it, and what the state changes. Federal OSHA electrical-safety text is fetched live from a free official API.

Scenario generation and debriefs use both, so expected steps and grading follow the written procedure and local code. Chat stays unchanged to protect the free Workers AI budget.

## 2. Research findings (2026-10-07)

| Source | Free API | Decision |
|---|---|---|
| [eCFR API](https://www.ecfr.gov/reader-aids/ecfr-developer-resources) (29 CFR 1910 / 1926: OSHA) | Yes. No key, public-domain text. Tested: title 29 current to 2026-10-06; requires a gzip `Accept-Encoding` | **Use live**, cached 24 h |
| NEC / NFPA 70 text | No. Copyrighted; NFPA allows free read-only web viewing only | Cite section numbers and paraphrase; never serve verbatim |
| NEC adoption by state ([NFPA CodeFinder](https://www.ecmweb.com/national-electrical-code/nfpa-codefinder-tool-debuts-maps-code-adoption), [NEMA report](https://www.csemag.com/adoption-of-the-national-electric-code-by-states-and-jurisdictions-now-online/)) | No public API; NEMA's report is members-only or paid | Hand-curate per jurisdiction in R2, with sources |
| [ICC Code Connect](https://solutions.iccsafe.org/codeconnect), UpCodes | Commercial | Not used |
| Washington (all demo sites are in WA) | No API; rules published as HTML/PDF | Curate `us-wa.md` from L&I and Washington State Register sources ([WSR 25-23-069](https://lawfilesext.leg.wa.gov/law/wsr/2025/23/25-23-069.htm), [WSR 26-01-100](https://lawfilesext.leg.wa.gov/law/wsr/2026/01/26-01-100.htm)) |

## 3. Content (R2, Markdown with front matter)

### 3.1 Safety protocols: new bucket `eh-safety-protocols`, `<id>.md`

```markdown
---
id: sp-loto
title: Lockout/tagout and verifying absence of voltage
category: isolation
applies_to: []                    # account features; empty = every site
rules: [R-LOTO-01, R-VERIFY-01]   # company rule IDs
osha: [1910.147, 1910.333]        # 29 CFR sections, fetchable live
nfpa70e: [Art. 120]               # article-level references only
---
## When this applies
## Hazards
## PPE & tools
## Procedure          (numbered steps)
## Verification
## Stop-work triggers
## Records
```

The 12 protocols, by `id` (`applies_to` in brackets):

- `sp-loto` []
- `sp-energized-diagnostics` []
- `sp-arc-flash-ppe` []
- `sp-energized-work-permit` []
- `sp-switching` []
- `sp-generator-ats` [generator]
- `sp-ups-batteries` [ups]
- `sp-motor-drives` [vfd]
- `sp-ev-chargers` [ev-chargers]
- `sp-healthcare-power` [essential-electrical-system]
- `sp-wet-locations` []
- `sp-fire-pump-impairment` [fire-pump]

Each is 350–900 words, cites company rule IDs and OSHA sections, and references NFPA 70E at article level only.

### 3.2 Code specs: new bucket `eh-code-specs`, `<jurisdictionId>.md`

```markdown
---
id: us-wa
name: Washington State
nec_edition: 2023 NEC (NFPA 70-2023)
next_edition: 2026 NEC, effective 2026-12-31
authority: Washington State Department of Labor & Industries (L&I), Electrical Program
amendments: WAC 296-46B
---
## Adopted codes & effective dates
## Authority, permits & inspections
## Licensing & supervision
## State amendments that matter on commercial jobs
## Workplace safety rules
## Sources
```

800–1,600 words. Facts are paraphrased with citations, and the Sources section links every page used. A site's jurisdiction is `us-<state>` from its D1 `state` column, so no migration is needed.

### 3.3 Templates link to protocols

Each scenario template gains `protocols: [...]`. Seed tests enforce:

- every listed protocol exists;
- every listed protocol applies to every site that qualifies for the template;
- every site's state has a code-spec file;
- the protocol and code-spec section structure and word ranges.

## 4. API (types in `packages/shared`, documented in `docs/api/openapi.yaml`)

| Method & path | Returns |
|---|---|
| `GET /safety-protocols` | `SafetyProtocolSummary[]` (front-matter fields) |
| `GET /safety-protocols/{protocolId}` | `SafetyProtocol` (summary plus `markdown`), 404 if unknown |
| `GET /accounts/{accountId}/safety-protocols` | `SafetyProtocolSummary[]` whose `appliesTo` ⊆ the account's features |
| `GET /code-specs/{jurisdictionId}` | `CodeSpec`, 404 if unknown |
| `GET /accounts/{accountId}/code-specs` | The `CodeSpec` for `us-<state>`; 404 if none is written yet |
| `GET /regulations/cfr/29/{section}` | `Regulation` `{ section, heading, text, sourceUrl, asOf }`, live from eCFR |

The regulations endpoint only accepts `^(1910|1926)\.\d{1,4}$`, so it cannot be an open proxy (400 otherwise). It returns 404 when eCFR has no such section and 502 when eCFR fails. Responses are cached in the Workers Cache API for 24 hours, including the eCFR "latest date" lookup.

## 5. AI integration

- `SiteContext` gains optional `protocolsMarkdown` and `codeSpecMarkdown`. The shared site block appends `=== SAFETY PROTOCOLS ===` and `=== LOCAL CODE ===` sections when they are present.
- The grounding rule's list of allowed sources becomes: site file, company rules, safety protocols, local code and scenario.
- **Generation:** loads the template's protocols plus the site's code spec. The template's protocol IDs are stored in `hidden_json` as `protocolIds`.
- **Debrief:** loads the same protocols (from `hidden_json`) plus the code spec. A briefing-session debrief loads the code spec only.
- **Chat:** unchanged.
- A missing code spec is not fatal to AI jobs: generation and debrief proceed without it. A missing listed protocol is a 500 seed error, the same as a missing site file.
- Budget: about +4k input tokens per generation and per debrief, which is roughly 14 generations a day on the free allowance.

## 6. Testing

- **Unit:**
  - protocol and code-spec front-matter parsing;
  - protocol applicability;
  - jurisdiction derivation;
  - eCFR XML to text (heading, paragraphs, entities);
  - section validation;
  - site block includes protocols and code spec when given;
  - `hidden_json` carries `protocolIds`;
  - route validation (400 for bad sections) without bindings.
- **Seed:** the rules in §3.3.
- **Smoke:**
  - list protocols, then one protocol;
  - the account's protocols;
  - the account's code spec;
  - `GET /regulations/cfr/29/1910.333` returns text;
  - a bad section returns 400;
  - scenario generation still passes.

## 7. Out of scope

City-level jurisdiction overrides, other states, and NFPA 70E or NEC verbatim text. Also not included: using protocols in chat, and keeping a snapshot of eCFR text in R2.
