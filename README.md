# Electrical Hero

Monorepo with native (Expo / React Native), web (Vite + React), and server (Express) apps, sharing TypeScript code via `packages/shared`.

## Structure

```
apps/
  native/   Expo app (iOS / Android)
  web/      Vite + React web app
  server/   Express API (TypeScript)
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

## Scripts

- `pnpm build` – build all packages
- `pnpm typecheck` – typecheck all packages

CI runs build + typecheck on every PR.

## Adding dependencies

```sh
pnpm --filter @electrical-hero/web add <pkg>
cd apps/native && npx expo install <pkg>   # for native, use expo install
```
