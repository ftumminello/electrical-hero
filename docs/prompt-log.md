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
