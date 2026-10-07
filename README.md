# Electrical Hero

Monorepo with native (Expo Router / React Native), web (Next.js), and server (Cloudflare Worker) apps. UI is shared through
platform-split packages and styled with Tailwind (web) and NativeWind (native) from one design-system preset.

## Structure

```
apps/
  native/         Expo Router app (iOS / Android), Metro + NativeWind
  web/            Next.js app (Turbopack), Tailwind CSS
  server/         Cloudflare Worker API (Hono, D1, R2, Workers AI)
packages/
  design-system/  Volt Academy tokens + the shared Tailwind preset
  core/           Shared UI components, providers, hooks (.web / .native splits)
  shared/         Shared types and constants (built; also used by the server)
.claude/design-system/   Design system source (tokens.json, brand README)
```

## Getting started

Requirements: Node 24 (`nvm use`), pnpm (`corepack enable`).

```sh
pnpm install
pnpm build          # builds the shared package (needed before first run)
pnpm dev            # runs everything via Turborepo
```

Or run one app at a time:

```sh
pnpm dev:server     # http://localhost:3000/health
pnpm dev:web        # http://localhost:5173 (proxies /api -> server)
pnpm dev:native     # Expo dev server; scan the QR code with Expo Go
```

On a physical device, point the native app at your machine:
`EXPO_PUBLIC_API_URL=http://<your-lan-ip>:3000 pnpm dev:native`

## Backend (Cloudflare)

Deployed API: https://electrical-hero-api.electrical-hero.workers.dev (no auth; hackathon demo). Frontend guide: [`docs/api/README.md`](docs/api/README.md); OpenAPI spec: [`docs/api/openapi.yaml`](docs/api/openapi.yaml); TypeScript types: `packages/shared`.

Wrangler authenticates with the account-scoped token in `apps/server/.env` (gitignored), so run these from the repo root via pnpm:

```sh
pnpm --filter @electrical-hero/server test        # unit tests (vitest)
pnpm --filter @electrical-hero/server deploy      # wrangler deploy
pnpm --filter @electrical-hero/server db:migrate  # apply D1 migrations (remote)
pnpm --filter @electrical-hero/server seed        # upload seed markdown to R2 + upsert D1 rows (remote)
bash apps/server/scripts/smoke.sh https://electrical-hero-api.electrical-hero.workers.dev
```

`pnpm dev:server` runs `wrangler dev` with local (empty) D1/R2; point clients at the deployed URL to work with seeded data.

## Design system

The Volt Academy design system lives in `.claude/design-system/`. Its `tokens.json` is the source of truth; run
`pnpm tokens` after it changes to regenerate `packages/design-system/src/tokens/tokens.json`. `pnpm typecheck` fails if
the two drift.

Both apps load `createPreset(platform)` from `@electrical-hero/design-system/tailwind-preset`, so the same classes work
everywhere:

| Need          | Classes                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| Color         | Token names: `bg-surface-100`, `bg-surface-200`, `text-ink`, `text-ink-muted`, `bg-voltage`, `border-border` |
| Text styles   | `type-display-xl`, `type-display-l`, `type-heading`, `type-eyebrow`, `type-body-l`, `type-body`, `type-small`, `type-label`, `type-spec` |
| Spacing       | Tailwind defaults already match `space-1`…`space-12` (`p-4` = 16px)                                          |
| Radius        | `rounded-sm` (4), `rounded` / `rounded-md` (6), `rounded-lg` (8); nothing rounder                            |
| Shadow        | `shadow-card`, `shadow-pop` (prefer `border`)                                                                |

Rules worth remembering (see `.claude/design-system/README.md`): `voltage` is a fill only, paired with
`text-ink-on-voltage`; status is never color-only; safety procedures open with a `Callout`.

Prefer the components in `@electrical-hero/core` (`Text`, `Button`, `Card`, `Callout`, `StatusBadge`, `HazardStripes`,
`ThemeToggle`) over raw elements. Merge classes with `cn()` from `@electrical-hero/design-system/cn`.

## Theming

Light, dark and system themes work on both platforms. Every color class reads a CSS variable, so components never
need `dark:` variants.

- **Web:** `ThemeScript` (in `<head>`) sets `data-theme` on `<html>` before first paint; `ThemeProvider` keeps it in
  sync and stores the choice in `localStorage`.
- **Native:** `ThemeProvider` applies the scheme's variables with NativeWind `vars()` and calls NativeWind's
  `setColorScheme`, which also updates system UI. The choice is stored in AsyncStorage.

Read or change it anywhere with `useTheme()` from `@electrical-hero/core/providers/theme-provider`. It returns
`{ preference, scheme, colors, setPreference }`, where `colors` holds resolved hex values for icons, SVG fills and the
status bar.

## Shared component pattern

Each component in `packages/core/src` is a folder:

```
button/
  index.ts              export * from "./button"; export * from "./button.types";
  button.types.ts       props shared by both platforms
  button.styles.ts      class strings shared by both platforms
  button.web.tsx        semantic HTML
  button.native.tsx     React Native primitives
```

Web resolves `.web.*` first (Turbopack `resolveExtensions` + `moduleSuffixes`); Metro resolves `.native.*`. Import by
folder: `import { Button } from "@electrical-hero/core/shared/button"`. Keep class names as full literal strings so
Tailwind and NativeWind can find them.

## Scripts

- `pnpm build`: build all packages
- `pnpm typecheck`: typecheck all packages (core is checked once per platform)
- `pnpm verify`: build + typecheck
- `pnpm tokens`: regenerate design tokens from `.claude/design-system/tokens.json`
- `pnpm format`: Prettier, which also sorts Tailwind classes

## Adding dependencies

```sh
pnpm --filter @electrical-hero/web add <pkg>
cd apps/native && npx expo install <pkg>   # for native, use expo install
```

When `packages/core` needs a native library, add it as an optional peer dependency and as a devDependency pinned to
the **same version as `apps/native`**, so pnpm links one shared copy (a second copy of React or NativeWind breaks at
runtime).
