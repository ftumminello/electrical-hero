# Prompt & Tool Log

The hackathon requires a 100% AI-generated codebase plus a short log of the tools and prompts used. This file is that log, appended as work proceeds.

## Tools

- **Claude Code** (Claude Opus 5.5): design, specs, all code and seed content.
- Claude Code skills used: `superpowers:brainstorming` (design process), `claude-api` and `cloudflare` (current platform docs before decisions).
- **Cloudflare**: Workers (Hono), D1, R2, Workers AI (`@cf/openai/gpt-oss-120b`).

## Session 1 — 2026-10-07 — backend design

The human directed. Claude asked questions, researched and wrote. Key prompts, paraphrased in order:

1. Shared the hackathon brief: AI that trains hands-on trades skills, judged on commercial application, human impact and training innovation.
2. "We are going to focus on electricians." Learner: apprentices, later refined to *contractors' electricians*.
3. Demo hardware: phone/tablet camera; "stub/simulate the VR/AR and real electrical parts". Time box: under 24 hours.
4. "Ignore the TradesQuest API — it's not ready for the hackathon."
5. "Let's specifically discuss what we can implement with respect to AR/VR and mobile." Claude researched WebXR on iOS/Android, MindAR and the 8th Wall shutdown.
6. "Here is the repo we will use … our job will be to create the backend services."
7. "We will use Cloudflare for all backend services … absolute efficiency in how we use CF workers, workers AI." No authentication.
8. "Electrical contractors will use [this] to train their electricians … for existing accounts." Data needed: a database of accounts, detailed client electrical configurations as generated markdown, contractor "rules" in another bucket, and a scenario generator with its own preset scenarios. Workers AI streams the chat.
9. "Since the frontend isn't built yet, we will test the backend via this chat." "Use the best open source 'free' AI model."

Output: `docs/superpowers/specs/2026-10-07-backend-foundation-design.md`.

## Session 1 — 2026-10-07 — backend build

10. "Approved, go ahead and build it." Claude wrote the implementation plan (`docs/superpowers/plans/2026-10-07-backend-foundation.md`), then implemented it test-first in 10 tasks: shared contract types → Hono Worker scaffold → template/rules parsing → AI stream + JSON handling → prompts and mappers → D1/R2/AI data layer → read routes → scenario/session/debrief routes → seed content (rulebook, 3 client sites, 5 scenario templates, all fictional and AI-written) → provision + deploy + smoke test.
11. "I have used another session to set up cf token". Wrangler auth is the account-scoped token in `apps/server/.env`, so the global login is untouched.
12. Deployed to `https://electrical-hero-api.electrical-hero.workers.dev`. `apps/server/scripts/smoke.sh` passes end to end (scenario generation, streamed chat and debrief on `@cf/openai/gpt-oss-120b`).
13. "Please generate the api spec that can be used by the frontend". Claude wrote `docs/api/openapi.yaml` (OpenAPI 3.1) and `docs/api/README.md` (frontend guide with an SSE client for web and Expo). Validated with Redocly lint and by checking live responses against the schemas with Ajv.
14. A fresh Claude reviewer reviewed the whole branch: no Critical findings, 4 Important. "We're not doing pull requests" / "we are in a rush": Claude merged the teammates' frontend commits from `origin/main`, pushed to `main`, then fixed the 4 Important findings test-first (turn atomicity in the streaming route, prompt-injection hardening, the role-play no longer acting for the trainee, scenario locations copied from the site file), redeployed, re-ran the smoke test and pushed again.
15. "Next, I want … safety protocols on demand … and local electrical code specs (research free api resources)". Claude found the eCFR API (official, free, no key) for OSHA text and confirmed there's no free API for NEC adoption or text. It specced and built the protocol, code-spec and live-regulation endpoints. Content agents wrote 12 protocols and a sourced Washington code spec; Claude reviewed and trimmed them and reconciled a GFCI conflict between a site file and the WA amendment.
16. "Please write a new document … how the frontend can access the safety protocols and electrical code": `docs/api/safety-and-code.md`.
17. "I upgraded to a paid CF plan": Claude confirmed Workers Paid on the account (no daily AI hard stop, pay-as-you-go) and updated the docs.
