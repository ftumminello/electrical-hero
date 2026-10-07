# Electrical Hero — Backend Foundation Design

Date: 2026-10-07 · Status: draft for review · Scope: `apps/server` and `packages/shared`

## 1. Purpose

Electrical contractors use Electrical Hero to train their electricians on **real customer sites** (accounts) before and during work at those sites. The backend:

- holds the contractor's accounts and each site's detailed electrical configuration,
- holds the contractor's own rules for how work must be done,
- generates realistic training scenarios from preset scenario templates applied to a specific site,
- runs streamed AI conversations, either about the site or as a live scenario,
- grades the electrician's approach against the scenario rubric and the company rules.

**Success for this foundation:** a deployed Cloudflare Worker that we can drive end to end with `curl` from chat. That means listing accounts, reading a site, generating a scenario, chatting in a stream and getting a debrief. The frontends (Expo native, Vite web) can then build against the types in `packages/shared`.

**Constraints:** hackathon, under 24 hours. Use as few Cloudflare services as possible. No authentication. Use the best free open-weights model. All code is AI-generated, and we keep a prompt log.

## 2. Architecture

One Worker. Everything is bound to it, and nothing else runs.

```
 Expo app / Vite web / curl
            │  HTTPS JSON + SSE
            ▼
 ┌─────────────────────────── Worker: electrical-hero-api (Hono) ───────────────────────────┐
 │  routes/  accounts · rules · templates · scenarios · sessions                            │
 │  domain/  applicability · prompt builders · SSE normalizer · JSON extraction             │
 └───────┬──────────────────┬──────────────────────┬──────────────────────┬─────────────────┘
         ▼                  ▼                      ▼                      ▼
   D1  DB              R2 CLIENT_CONFIGS     R2 COMPANY_RULES      R2 SCENARIO_TEMPLATES      AI (Workers AI)
   accounts, scenarios, <accountId>.md       <companyId>/*.md      <templateId>.md            @cf/openai/gpt-oss-120b
   sessions, messages
```

| Decision | Choice | Why |
|---|---|---|
| Router | **Hono** (replaces the Express scaffold) | Native to Workers, tiny, has a built-in `streamSSE` helper. Express would need Node compatibility shims. |
| Structured data | **D1** | Accounts, scenarios, sessions and messages are relational and small. |
| Site configs, rules, templates | **R2**, three buckets | Matches the agreed model: configs, rules "in another bucket", and templates as the generator's own rules. Each is Markdown that the contractor can edit. |
| AI | **Workers AI, `@cf/openai/gpt-oss-120b`** | The strongest open-weights (Apache-2.0) model not restricted to the paid plan. 128K context, streaming. The model ID is a `vars` entry, so it can be swapped. |
| Retrieval | **None.** Whole files go into the prompt. | One site file plus the rules is well under 128K tokens. AI Search or Vectorize would add services for no gain. |
| Session state | D1 rows | No Durable Objects needed. Each turn reloads the history from D1. |
| Local dev port | `wrangler dev` on **3000** | The existing web proxy (`/api → :3000`) keeps working without changes. |

## 3. Data model

### D1 (`migrations/0001_init.sql`)

```sql
companies (id TEXT PK, name TEXT NOT NULL)

accounts (
  id TEXT PK, company_id TEXT NOT NULL REFERENCES companies(id),
  name TEXT NOT NULL, building_type TEXT NOT NULL,
  address_line1 TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, postal_code TEXT NOT NULL,
  site_contact_name TEXT, site_contact_phone TEXT,
  service_summary TEXT NOT NULL,     -- e.g. "480Y/277V 3φ 4W, 3000A switchboard"
  critical_info TEXT NOT NULL,       -- short must-know hazards/access notes
  features TEXT NOT NULL,            -- JSON array of tags, e.g. ["generator","ats","tenant-panels"]
  config_key TEXT NOT NULL           -- R2 key in CLIENT_CONFIGS
)

scenarios (
  id TEXT PK, account_id TEXT NOT NULL REFERENCES accounts(id), template_id TEXT NOT NULL,
  title TEXT NOT NULL, difficulty TEXT NOT NULL,
  briefing TEXT NOT NULL,            -- what dispatch tells the electrician (public)
  hidden_json TEXT NOT NULL,         -- {hiddenFacts, expectedApproach, rubric, redFlags} (never returned)
  created_at TEXT NOT NULL
)

sessions (
  id TEXT PK, account_id TEXT NOT NULL REFERENCES accounts(id), scenario_id TEXT REFERENCES scenarios(id),
  mode TEXT NOT NULL CHECK (mode IN ('briefing','scenario')),
  trainee_name TEXT NOT NULL, status TEXT NOT NULL CHECK (status IN ('active','completed')),
  debrief_json TEXT, created_at TEXT NOT NULL, ended_at TEXT
)

messages (
  id TEXT PK, session_id TEXT NOT NULL REFERENCES sessions(id),
  role TEXT NOT NULL CHECK (role IN ('user','assistant')), content TEXT NOT NULL, created_at TEXT NOT NULL
)
```

Seeded IDs are readable slugs (`acct-harbor-point-tower`). Runtime IDs come from `crypto.randomUUID()`.

### R2 layout

- `CLIENT_CONFIGS/<accountId>.md`: a detailed site file covering service entrance, switchgear and panel schedules, feeders, transformers, emergency/standby systems, special equipment, known issues and history, and access/safety notes. Panel and equipment IDs are consistent throughout, so scenarios can reference them.
- `COMPANY_RULES/<companyId>/*.md`: the contractor's work rules. Every object under the prefix is joined in key order. Each rule has a stable ID (e.g. `R-LOTO-01`) so debriefs can cite it.
- `SCENARIO_TEMPLATES/<templateId>.md`: YAML-style front matter plus a body.
  ```
  ---
  id: tmpl-partial-power-loss
  title: Tenant reports partial power loss
  difficulty: intermediate
  requires: [tenant-panels]          # account.features must include all of these
  skills: [troubleshooting, single-phasing, customer-communication]
  rules: [R-LOTO-01, R-VERIFY-01]    # company rules this template stresses
  ---
  Generation instructions, what to vary, outline of a good approach, red flags.
  ```

## 4. API (all JSON unless noted; types live in `packages/shared`)

| Method & path | Purpose |
|---|---|
| `GET /health` | Unchanged contract (`HealthResponse`) |
| `GET /accounts` | `AccountSummary[]` |
| `GET /accounts/:id` | `AccountDetail`: the row plus `configMarkdown` |
| `GET /rules` | `{ companyId, markdown }` for the single seeded company |
| `GET /scenario-templates?accountId=` | `ScenarioTemplateSummary[]`, filtered to templates the account qualifies for when `accountId` is given |
| `POST /scenarios` `{accountId, templateId?}` | AI generates a concrete scenario and stores it. Returns `ScenarioPublic` (no hidden fields). If `templateId` is omitted, picks a random applicable template. |
| `GET /scenarios/:id` | `ScenarioPublic` |
| `GET /accounts/:id/scenarios` | `ScenarioPublic[]` |
| `POST /sessions` `{accountId, scenarioId?, traineeName}` | Creates a session: `scenario` mode if `scenarioId` is given, otherwise `briefing`. In scenario mode, the opening dispatch message is stored as the first assistant message. |
| `GET /sessions/:id` | `SessionDetail`: the session plus its messages |
| `POST /sessions/:id/messages` `{content}` | **SSE stream.** Stores the user message, streams the AI reply, then stores the reply. |
| `POST /sessions/:id/debrief` | AI grades the transcript and returns `Debrief`, stored on the session (status → `completed`). Calling it again returns the stored debrief. |

**Our SSE contract** is normalized, so the frontends never see model-specific chunk formats:

```
event: delta   data: {"text":"..."}
event: done    data: {"messageId":"<uuid>"}
event: error   data: {"error":"..."}
```

Errors return `{ "error": string }` with status 400 for bad input, 404 for an unknown ID, or 502 for an AI failure. CORS is open (`*`).

## 5. AI behaviour

All three AI jobs load the same context: the **site config markdown**, plus the **company rules**, plus (for scenarios) the **scenario fields**. The grounding rule is the same in every system prompt: *only state facts that appear in the site file, rules, or scenario. If something isn't there, say it's not in the site records.*

1. **Briefing chat** (`mode=briefing`). The AI acts as the contractor's account lead, answering an electrician's questions about the site. It cites panel and equipment IDs and points to the relevant company rule IDs.
2. **Scenario chat** (`mode=scenario`). The AI acts as dispatch and the on-site customer contact. It reacts to the electrician's stated actions with observations consistent with `hiddenFacts`. It never reveals the cause outright. If the electrician states an unsafe action, the AI stays in character and voices concern as a real customer contact would. Formal judgment waits for the debrief.
3. **Scenario generation** (non-streaming JSON). Input is the template, site config and rules. Output: `{title, briefing, hiddenFacts[], expectedApproach[], rubric[{criterion, ruleId?}], redFlags[]}`.
4. **Debrief** (non-streaming JSON). Input is the scenario (including hidden fields), rules and transcript. Output: `{score 0–100, verdict, strengths[], gaps[], ruleViolations[{ruleId, evidence}], rubric[{criterion, met, evidence}]}`. In briefing mode the debrief rates the quality of the questions asked and what the electrician should still check, with rubric empty.

**JSON reliability.** Workers AI's documented JSON mode doesn't cover this model and doesn't stream. We try `response_format: {type:"json_schema"}` and keep it only if it works on the first deploy. Either way we extract the first JSON object, validate it with zod, and retry once with the validation error attached, then fail with 502.

**Free-tier budget.** Workers Free allows 10,000 neurons a day (about $0.11). For this model that's roughly 25–30 chat turns a day at about 10K tokens of context. Mitigations: keep site files around 1,500–2,500 words, set `max_tokens` explicitly (the model's default is 256), use low reasoning effort for chat, and keep the model ID in `vars` so swapping to `@cf/zai-org/glm-4.7-flash` (about 5x cheaper) is one line.

## 6. Seed content (written by Claude Code, committed under `apps/server/seed/`)

- **Company:** one fictional contractor plus a rulebook (lockout/tagout, verifying absence of voltage, NFPA 70E PPE and approach boundaries, energized-work permits, customer notification before shutdowns, documentation and photos, labeling and panel schedules, escalation, generator and emergency-system handling). Each rule has a stable ID.
- **Accounts (3):**
  - A multi-tenant Class A office tower (480Y/277V, tenant step-down panels, generator plus ATS, fire pump)
  - A medical office building with an outpatient procedure suite (essential electrical system branches, generator)
  - A restaurant and retail strip center (208Y/120V, multiple meters, commercial kitchen loads)
- **Scenario templates (5):**
  - Tenant partial power loss
  - Planned shutdown to replace a breaker
  - Generator/ATS failed its monthly test
  - Add a dedicated circuit to a full panel
  - Hot spot found in an infrared scan of the switchboard

  Each template's `requires` lines up with the accounts' `features`, so every account qualifies for at least three templates.
- `seed/seed.sql` holds the D1 rows. `seed/upload.sh` pushes every Markdown file to the remote buckets with `wrangler r2 object put --remote`.

A runtime "generate a new simulated client" endpoint is **out of scope** for the foundation and is a natural next step.

## 7. Repo changes

- `apps/server`: drop Express, cors and tsx. Add `hono`, `zod`, `wrangler` and `vitest`. Add `wrangler.jsonc` (with `account_id` `f829b338b404de5d62877eed272edc9d`, `dev.port: 3000`, D1, 3 R2 and AI bindings, and a `vars.AI_MODEL`), `migrations/`, `seed/` and `src/{index,routes/*,domain/*}.ts`. Scripts: `dev`, `deploy`, `typecheck`, `test`, `db:migrate`, `seed`.
- `packages/shared`: API request/response types and SSE event types. No runtime dependencies.
- `docs/prompt-log.md`: the judges' log of tools and prompts used, appended as we go.
- No changes to `apps/web` or `apps/native`.

## 8. Testing

- **Unit tests** (vitest, pure functions, no Cloudflare runtime): template applicability, front-matter parsing, rule joining, the SSE normalizer against the chunk formats we see (OpenAI-style `choices[].delta.content` and Workers AI `response`, with reasoning deltas dropped), JSON extraction and validation, and the mapping from scenario to public view (asserting hidden fields never appear).
- **Live smoke test** (`apps/server/scripts/smoke.sh <baseUrl>`): health, list accounts, get account, list templates for an account, generate a scenario, create a scenario session, stream one message (`curl -N`), debrief. We run it from chat against the deployed `workers.dev` URL. That's the agreed way to test until a frontend exists.

## 9. Risks

| Risk | Mitigation |
|---|---|
| Free neuron cap reached during testing or the demo | Compact seeds, explicit `max_tokens`, low reasoning effort, one-line model swap |
| The model's JSON is unreliable | Validate, retry once, then return a clear 502 |
| The streamed chunk format differs from the docs | The normalizer handles both known shapes. The first deploy confirms which. |
| gpt-oss-120b turns out to be paid-only on this account | The first smoke test reveals it. Fall back to `glm-4.7-flash`. |
| Wrangler not logged in to the right account | `account_id` is pinned in config. The user runs `wrangler login` interactively if needed. |
