#!/usr/bin/env bash
# End-to-end check against a deployed Worker. Usage: scripts/smoke.sh https://electrical-hero-api.<sub>.workers.dev
set -euo pipefail
BASE="${1:?usage: smoke.sh <base-url>}"
ACCT=acct-harbor-point-tower
TMP="$(mktemp -d)"
json() { curl -sS -H 'content-type: application/json' "$@"; }
field() { node -pe "JSON.parse(require('fs').readFileSync(0,'utf8'))$1"; }
expect_status() { # expect_status <code> <curl args...>
  local want=$1; shift
  local got; got=$(curl -sS -o "$TMP/body" -w '%{http_code}' -H 'content-type: application/json' "$@")
  [[ $got == "$want" ]] || { echo "FAIL: expected $want got $got: $(cat "$TMP/body")"; exit 1; }
  echo "  ok $want $(head -c 160 "$TMP/body")"
}

echo "== health";            expect_status 200 "$BASE/health"
echo "== accounts";          json "$BASE/accounts" | field '.map(a => a.id).join(", ")'
echo "== account detail";    json "$BASE/accounts/$ACCT" | field '.configMarkdown.slice(0, 120)'
echo "== rules";             json "$BASE/rules" | field '.markdown.slice(0, 80)'
echo "== templates for $ACCT"; json "$BASE/scenario-templates?accountId=$ACCT" | field '.map(t => t.id).join(", ")'
echo "== template that does not apply -> 400"
expect_status 400 -X POST "$BASE/scenarios" -d '{"accountId":"acct-maple-commons","templateId":"tmpl-generator-failed-test"}'

echo "== generate scenario (AI)"
SCN=$(json -X POST "$BASE/scenarios" -d "{\"accountId\":\"$ACCT\",\"templateId\":\"tmpl-partial-power-loss\"}")
echo "$SCN" | head -c 600; echo
if grep -q hiddenFacts <<<"$SCN"; then echo "FAIL: hidden fields leaked"; exit 1; fi
SCN_ID=$(field '.id' <<<"$SCN")

echo "== scenario from another account -> 400"
expect_status 400 -X POST "$BASE/sessions" -d "{\"accountId\":\"acct-maple-commons\",\"scenarioId\":\"$SCN_ID\",\"traineeName\":\"Smoke\"}"

echo "== start scenario session"
SES=$(json -X POST "$BASE/sessions" -d "{\"accountId\":\"$ACCT\",\"scenarioId\":\"$SCN_ID\",\"traineeName\":\"Smoke Test\"}")
SES_ID=$(field '.id' <<<"$SES")
field '.messages[0].content' <<<"$SES"

echo "== empty briefing session cannot be debriefed -> 400"
BRF_ID=$(json -X POST "$BASE/sessions" -d "{\"accountId\":\"$ACCT\",\"traineeName\":\"Smoke\"}" | field '.id')
expect_status 400 -X POST "$BASE/sessions/$BRF_ID/debrief"

echo "== stream a reply (AI)"
# Capture the whole stream first: piping into `head` would close the pipe mid-stream and kill curl.
curl -sSN -X POST "$BASE/sessions/$SES_ID/messages" -H 'content-type: application/json' \
  -d '{"content":"I check in with the site contact, then go to the tenant panel. Before opening it I put on PPE per the label and verify my meter on a known live source."}' > "$TMP/stream"
node -e '
  const lines = require("fs").readFileSync(process.argv[1], "utf8").split("\n");
  const text = lines.filter((l) => l.startsWith("data: {\"text\"")).map((l) => JSON.parse(l.slice(6)).text).join("");
  console.log(`  reply (${text.length} chars): ${text}`);
' "$TMP/stream"
grep -q '^event: done' "$TMP/stream" || { echo "FAIL: no done event"; grep -A1 '^event: error' "$TMP/stream"; exit 1; }

echo "== debrief (AI)"
json -X POST "$BASE/sessions/$SES_ID/debrief" | field '.verdict'
echo "== debrief is stored and returned again"
json -X POST "$BASE/sessions/$SES_ID/debrief" | field '.score'
echo "== completed session rejects new messages -> 400"
expect_status 400 -X POST "$BASE/sessions/$SES_ID/messages" -d '{"content":"one more thing"}'
echo "SMOKE PASSED"
