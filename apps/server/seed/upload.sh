#!/usr/bin/env bash
# Uploads seed markdown to R2 and upserts seed rows into D1 (remote). Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")/.."
put() { pnpm exec wrangler r2 object put "$1" --file "$2" --content-type "text/markdown; charset=utf-8" --remote; }
for f in seed/clients/*.md; do put "eh-client-configs/$(basename "$f")" "$f"; done
for f in seed/rules/co-kestrel/*.md; do put "eh-company-rules/co-kestrel/$(basename "$f")" "$f"; done
for f in seed/templates/*.md; do put "eh-scenario-templates/$(basename "$f")" "$f"; done
pnpm exec wrangler d1 execute electrical-hero --remote --file seed/seed.sql
