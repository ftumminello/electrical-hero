# Electrical Hero

Monorepo with native (Expo / React Native), web (Vite + React), and server (Cloudflare Worker) apps, sharing TypeScript code via `packages/shared`.

## Structure

```
apps/
  native/   Expo app (iOS / Android)
  web/      Vite + React web app
  server/   Cloudflare Worker API (Hono, D1, R2, Workers AI)
packages/
  shared/   Shared types and constants
```

## Getting started

Requirements: Node 24 (`nvm use`), pnpm (`corepack enable`).

```sh
pnpm install
pnpm build          # builds shared package (needed before first run)
pnpm dev            # runs everything via Turborepo
```

Or run one app at a time:

```sh
pnpm dev:server     # http://localhost:3000/health
pnpm dev:web        # http://localhost:5173 (proxies /api -> server)
pnpm dev:native     # Expo dev server; scan QR with Expo Go
```

On a physical device, point the native app at your machine:
`EXPO_PUBLIC_API_URL=http://<your-lan-ip>:3000 pnpm dev:native`

## Backend (Cloudflare)

Deployed API: https://electrical-hero-api.electrical-hero.workers.dev (no auth; hackathon demo). Contract types live in `packages/shared`.

Wrangler authenticates with the account-scoped token in `apps/server/.env` (gitignored), so run these from the repo root via pnpm:

```sh
pnpm --filter @electrical-hero/server test        # unit tests (vitest)
pnpm --filter @electrical-hero/server deploy      # wrangler deploy
pnpm --filter @electrical-hero/server db:migrate  # apply D1 migrations (remote)
pnpm --filter @electrical-hero/server seed        # upload seed markdown to R2 + upsert D1 rows (remote)
bash apps/server/scripts/smoke.sh https://electrical-hero-api.electrical-hero.workers.dev
```

`pnpm dev:server` runs `wrangler dev` with local (empty) D1/R2; point clients at the deployed URL to work with seeded data.

## Scripts

- `pnpm build` – build all packages
- `pnpm typecheck` – typecheck all packages

CI runs build + typecheck on every PR.

## Adding dependencies

```sh
pnpm --filter @electrical-hero/web add <pkg>
cd apps/native && npx expo install <pkg>   # for native, use expo install
```
