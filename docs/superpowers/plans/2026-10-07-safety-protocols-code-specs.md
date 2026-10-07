# Safety Protocols & Code Specs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve safety protocols and per-jurisdiction code specs from R2, serve OSHA text live from eCFR, and feed protocols and code specs into scenario generation and debriefs.

**Architecture:**
- **New R2 content:** two buckets in the existing Markdown-with-front-matter style.
- **Pure parsers:** in `src/domain/` (protocols, code specs, eCFR XML).
- **Loaders:** in `src/data/`. `data/ecfr.ts` adds an upstream fetch with a 24 h in-memory cache.
- **Routes:** new thin routes, plus optional prompt blocks for the AI.

**Tech Stack:** as before (Hono, zod, D1, R2, Workers AI, vitest), plus the eCFR versioner API (free, no key).

**Spec:** `docs/superpowers/specs/2026-10-07-safety-protocols-code-specs-design.md`

## Global Constraints

- Buckets `eh-safety-protocols` (binding `SAFETY_PROTOCOLS`) and `eh-code-specs` (binding `CODE_SPECS`). Keys are `<id>.md`.
- Protocol and code-spec ids are served only if they match `^[a-z0-9-]+$`, otherwise 404 (no arbitrary R2 keys).
- `GET /regulations/cfr/29/{section}` accepts only `^(1910|1926)\.\d{1,4}$`, otherwise 400. Upstream not-found is 404; upstream failure is 502.
- eCFR requests send `accept-encoding: gzip` (eCFR returns 406 otherwise) and use the latest `up_to_date_as_of` for title 29 from `titles.json`.
- Never serve NEC or NFPA 70E text verbatim. Content is paraphrased with citations (content agents follow this).
- Chat prompts unchanged. Only generation and debriefs get protocols and code specs.
- No D1 migration. Jurisdiction = `us-<state lower-case>`.

## Review Focus

- **A protocol id with a slash or dots** (`../x`, `sp.loto`) → 404, never an R2 lookup of an arbitrary key. Pinned in `test/reference-routes.test.ts`.
- **A section like `1910.147a` or `29.1910`** → 400 before any network call. Pinned in `test/reference-routes.test.ts`.
- **eCFR down or slow** → 502 with a readable message; a failure is not cached. Covered by the `cached()` design (errors are never stored) and the smoke test.
- **A site in a state with no code-spec file** → `GET /accounts/{id}/code-specs` returns 404, but generation and debrief still work. Pinned in `test/prompts.test.ts` (site block without code spec) and in the route code.
- **Old scenarios in D1 without `protocolIds`** → their debrief still works with no protocols. Pinned in `test/mappers.test.ts`.

---

### Task 1: Shared types + parsers (protocols, code specs, eCFR XML)

**Files:**
- Modify: `packages/shared/src/index.ts`, `apps/server/src/domain/frontmatter.ts` (export `asList`), `apps/server/src/domain/templates.ts` (`protocols`)
- Create: `apps/server/src/domain/protocols.ts`, `apps/server/src/domain/codespecs.ts`, `apps/server/src/domain/ecfr.ts`
- Test: `apps/server/test/protocols.test.ts`, `apps/server/test/codespecs.test.ts`, `apps/server/test/ecfr.test.ts`; modify `apps/server/test/templates.test.ts`

**Interfaces (produces):**
- Shared types:
  - `SafetyProtocolSummary {id,title,category,appliesTo,rules,osha,nfpa70e}`
  - `SafetyProtocol extends SafetyProtocolSummary {markdown}`
  - `CodeSpec {id,name,necEdition,nextEdition,authority,amendments,markdown}`
  - `Regulation {section,heading,text,sourceUrl,asOf}`
  - `ScenarioTemplateSummary.protocols: string[]`
- `asList(v)` (from `frontmatter.ts`)
- `parseProtocol(md): SafetyProtocol`, `toProtocolSummary(p)`, `protocolApplies(p, features)`, `joinProtocols(ps): string`
- `parseCodeSpec(md): CodeSpec`, `jurisdictionFor(state): string`
- `isAllowedSection(s)`, `ecfrSectionUrl(date, section)`, `ecfrReaderUrl(section)`, `decodeEntities(s)`, `ecfrXmlToText(xml): {heading, text}`
- `isSafeId(id): boolean` (in `codespecs.ts`, reused by routes)

- [ ] **Step 1: Failing tests.**
  - `protocols.test.ts`: parses the front matter and body; applicability (`[]` applies everywhere; `[generator]` needs the feature); the summary drops `markdown`; `joinProtocols` renders a `### <title> (<id>)` heading per protocol; a missing id throws.
  - `codespecs.test.ts`: parses the front-matter fields; `next_edition` absent → `null`; `jurisdictionFor(" WA ")` → `us-wa`; `isSafeId` accepts `us-wa` and `sp-loto` and rejects `../x`, `sp.loto` and `""`.
  - `ecfr.test.ts`:
    - `isAllowedSection` accepts `1910.333` and `1926.417`; rejects `1910.147a`, `29.1910`, `1904.7` and `1910.`.
    - The URLs are built correctly.
    - `ecfrXmlToText` on the fixture `<DIV8><HEAD>§ 1926.416 General requirements.</HEAD><P>(a) <I>Protection.</I> A &amp; B</P><NOTE><HED>Note</HED><P>Note text.</P></NOTE><CITA TYPE="N">[44 FR 8577]</CITA></DIV8>` returns heading `§ 1926.416 General requirements.` and text `(a) Protection. A & B\n\nNote text.` (the citation is dropped).
    - `decodeEntities` handles `&#167;` and `&#x2014;`.
  - `templates.test.ts`: the expected object gains `protocols: ["sp-loto"]` (the fixture adds `protocols: [sp-loto]`).
- [ ] **Step 2: Run, watch them fail** (`pnpm --filter @electrical-hero/server test`).
- [ ] **Step 3: Implement.**

```ts
// domain/ecfr.ts
const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
export const isAllowedSection = (s: string): boolean => /^(1910|1926)\.\d{1,4}$/.test(s);
export const ecfrSectionUrl = (date: string, section: string): string =>
  `https://www.ecfr.gov/api/versioner/v1/full/${date}/title-29.xml?part=${section.split(".")[0]}&section=${section}`;
export const ecfrReaderUrl = (section: string): string => `https://www.ecfr.gov/current/title-29/section-${section}`;
export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) =>
    code.startsWith("#x") || code.startsWith("#X") ? String.fromCodePoint(parseInt(code.slice(2), 16))
    : code.startsWith("#") ? String.fromCodePoint(parseInt(code.slice(1), 10))
    : (ENTITIES[code.toLowerCase()] ?? m));
}
const clean = (s: string): string => decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
export function ecfrXmlToText(xml: string): { heading: string; text: string } {
  const heading = clean(/<HEAD>([\s\S]*?)<\/HEAD>/.exec(xml)?.[1] ?? "");
  const body = xml.replace(/<CITA[\s\S]*?<\/CITA>/g, "");
  const paragraphs = [...body.matchAll(/<(P|FP)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)].map((m) => clean(m[2])).filter(Boolean);
  return { heading, text: paragraphs.join("\n\n") };
}
```

`protocols.ts` and `codespecs.ts` follow `templates.ts`: `parseFrontmatter`, required string fields (throw `"<kind> is missing <field>"`), and lists via `asList`. `joinProtocols` gives `` ps.map(p => `### ${p.title} (${p.id})\n\n${p.markdown}`).join("\n\n") ``. `isSafeId = (id) => /^[a-z0-9-]+$/.test(id)`.

- [ ] **Step 4: Tests pass + typecheck.**
- [ ] **Step 5: Commit** `feat(server): parsers for safety protocols, code specs and eCFR XML`.

### Task 2: Prompts carry protocols + code spec; scenarios remember protocol ids

**Files:** modify `src/domain/prompts.ts`, `src/domain/mappers.ts`; tests in `test/prompts.test.ts`, `test/mappers.test.ts`

**Interfaces:**
- `SiteContext.protocolsMarkdown?: string`, `SiteContext.codeSpecMarkdown?: string`
- `GROUNDING_RULE` names SITE FILE, COMPANY RULES, SAFETY PROTOCOLS, LOCAL CODE and SCENARIO
- `hiddenJson(g, protocolIds: string[])`
- `ScenarioHidden.protocolIds?: string[]`
- `scenarioHidden(row)` returns `protocolIds: []` when absent

- [ ] **Step 1: Failing tests.**
  - The site block includes `=== SAFETY PROTOCOLS ===` and `=== LOCAL CODE ===` only when they are given (assert both with and without).
  - `hiddenJson(generated, ["sp-loto"])` round-trips `protocolIds`.
  - A legacy `hidden_json` without `protocolIds` gives `protocolIds: []`.
- [ ] **Step 2: Fail. Step 3: implement.** `siteBlock` pushes the two optional blocks after COMPANY RULES. **Step 4: pass. Step 5: commit** `feat(server): AI prompts can carry safety protocols and local code`.

### Task 3: Data loaders, eCFR client, routes, AI wiring

**Files:**
- Modify: `wrangler.jsonc` (two R2 bindings), `worker-configuration.d.ts` (regenerated), `src/data/content.ts`, `src/routes/accounts.ts`, `src/routes/scenarios.ts`, `src/routes/sessions.ts`, `src/index.ts`, `seed/upload.sh`
- Create: `src/data/ecfr.ts`, `src/routes/protocols.ts`, `src/routes/codeSpecs.ts`, `src/routes/regulations.ts`
- Test: `test/reference-routes.test.ts`

**Interfaces:**
- `listProtocols(env)`, `getProtocol(env, id)`, `getCodeSpec(env, id)`
- `loadReference(env, account, protocolIds)` → `{protocolsMarkdown?, codeSpecMarkdown?}`
- `getRegulation(section)` → `Regulation`

- [ ] **Step 1: Failing test `reference-routes.test.ts`** (env `{}`, no bindings):
  - `GET /regulations/cfr/29/1910.147a` → 400 with an error naming the allowed form;
  - `GET /regulations/cfr/29/29.1910` → 400;
  - `GET /safety-protocols/..%2Fx` → 404;
  - `GET /safety-protocols/sp.loto` → 404;
  - `GET /code-specs/US_WA` → 404.
- [ ] **Step 2: Fail (404 or 500 from missing routes).**
- [ ] **Step 3: Implement.**

```ts
// data/ecfr.ts
const API = "https://www.ecfr.gov/api/versioner/v1";
const TTL_MS = 24 * 60 * 60 * 1000;
const memo = new Map<string, { at: number; value: unknown }>();
/** Per-isolate cache; failures are never stored. */
async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as T;
  const value = await load();
  memo.set(key, { at: Date.now(), value });
  return value;
}
async function upstream(url: string): Promise<Response> {
  try {
    return await fetch(url, { headers: { "accept-encoding": "gzip" }, cf: { cacheTtl: 86400, cacheEverything: true } });
  } catch (e) {
    throw new HttpError(502, `eCFR unreachable: ${(e as Error).message}`);
  }
}
```

`latestTitle29Date()` reads `titles.json` and takes the `up_to_date_as_of` of title 29 (502 if absent). `getRegulation(section)` returns 404 on an upstream 404, 502 on any other non-OK response, otherwise `ecfrXmlToText`. Routes:

- `protocols.ts`: `GET /` (summaries) and `GET /:id` (`isSafeId` else 404).
- `codeSpecs.ts`: `GET /:id` (`isSafeId` else 404).
- `regulations.ts`: `GET /cfr/29/:section` (`isAllowedSection` else 400).
- `accounts.ts`: `/:id/safety-protocols` (filtered by features) and `/:id/code-specs` (404 when none).
- `scenarios.ts`: `loadReference(env, account, template.protocols)` merged into the site context; `hiddenJson(generated, template.protocols)`.
- `sessions.ts`: debrief loads the reference with `scenario?.protocolIds ?? []`; chat does not.
- `upload.sh`: two more loops.

- [ ] **Step 4: Tests pass + typecheck. Step 5: Commit** `feat(server): safety protocol, code spec and OSHA regulation endpoints; AI uses them`.

### Task 4: Seed content wiring + seed tests

**Files:** modify `seed/templates/*.md` (add `protocols:`) and `test/seed.test.ts`; content from agents in `seed/protocols/*.md` and `seed/code-specs/us-wa.md`.

- [ ] **Step 1: Failing seed tests:**
  - 12 protocols, each parsing, with the 7 sections in order and 350–900 words;
  - their `rules` exist in the rulebook and their `osha` sections match `isAllowedSection`;
  - every template lists ≥1 protocol, every listed protocol exists, and it applies to every account that qualifies for the template;
  - every account's state has `code-specs/us-<state>.md`, which parses, has the 6 sections in order, is 800–1,600 words, and has ≥3 `https://` links.
- [ ] **Step 2: Fail. Step 3: Add `protocols:` to the 11 templates** per the spec mapping; review the agents' files. **Step 4: Pass. Step 5: Commit** `feat(server): seed safety protocols and Washington code spec`.

Template → protocols:

| Template | Protocols |
|---|---|
| partial-power-loss | loto, energized-diagnostics, arc-flash-ppe |
| planned-breaker-replacement | loto, switching |
| generator-failed-test | generator-ats, switching |
| full-panel-new-circuit | loto, arc-flash-ppe |
| switchboard-hot-spot | arc-flash-ppe, energized-work-permit |
| kitchen-gfci-trips | wet-locations, loto |
| ev-charger-fault | ev-chargers, loto |
| vfd-fault | motor-drives, loto |
| water-intrusion | wet-locations, arc-flash-ppe |
| fire-pump-transfer | fire-pump-impairment, generator-ats |
| lim-alarm | healthcare-power, energized-diagnostics |

All ids carry the `sp-` prefix.

### Task 5: Provision, upload, deploy, document, smoke

- [ ] Create both R2 buckets (`wrangler r2 bucket create`), `pnpm seed`, `pnpm run deploy`.
- [ ] `docs/api/openapi.yaml`: the 6 new paths, schemas `SafetyProtocolSummary`, `SafetyProtocol`, `CodeSpec` and `Regulation`, and `protocols` added to `ScenarioTemplateSummary`. Redocly lint must stay valid. Also update the `docs/api/README.md` table.
- [ ] `scripts/smoke.sh`: protocol list and one protocol, account protocols, account code spec, a live regulation (`1910.333` has text), a bad section → 400; the existing flow stays green.
- [ ] Generate 2–3 demo scenarios per site; record their ids; append to the prompt log; merge `origin/main`; full tests + typecheck; push.
