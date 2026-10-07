# Electrical Hero API — frontend guide

- **Spec:** [`openapi.yaml`](./openapi.yaml) (OpenAPI 3.1). Import it into Postman, Insomnia or Swagger UI, or generate a client from it.
- **Types:** `import type { … } from "@electrical-hero/shared"`. These are the same shapes the server returns.
- **Base URL:** `https://electrical-hero-api.electrical-hero.workers.dev`
  - Vite dev: call `/api/...`, which the dev server proxies to `http://localhost:3000`.
  - Expo: set `EXPO_PUBLIC_API_URL` to the deployed URL. Local `wrangler dev` has empty storage.
- **No auth.** Errors are always `{ "error": string }`, readable enough to show to the user.

## Endpoints at a glance

| Method | Path | Returns | Notes |
|---|---|---|---|
| GET | `/health` | `HealthResponse` | |
| GET | `/accounts` | `AccountSummary[]` | Customer sites |
| GET | `/accounts/:accountId` | `AccountDetail` | Includes `criticalInfo` and the full site file `configMarkdown` |
| GET | `/accounts/:accountId/scenarios` | `ScenarioPublic[]` | Previously generated, newest first |
| GET | `/rules` | `CompanyRules` | Contractor rulebook (Markdown; rule ids like `R-LOTO-01`) |
| GET | `/scenario-templates?accountId=` | `ScenarioTemplateSummary[]` | Pass `accountId` to get only templates that site qualifies for |
| POST | `/scenarios` | `ScenarioPublic` (201) | **AI, ~10–40 s.** Body `{ accountId, templateId? }` |
| GET | `/scenarios/:scenarioId` | `ScenarioPublic` | |
| POST | `/sessions` | `SessionDetail` (201) | Body `{ accountId, scenarioId?, traineeName }`. No `scenarioId` starts a briefing chat |
| GET | `/sessions/:sessionId` | `SessionDetail` | Full transcript, plus `debrief` once graded |
| POST | `/sessions/:sessionId/messages` | **SSE stream** | **AI.** Body `{ content }`. See below |
| POST | `/sessions/:sessionId/debrief` | `Debrief` | **AI, ~10–30 s.** Closes the session; calling it again returns the same debrief |

## Screen flow

```
Accounts list ──► Account detail (criticalInfo, site file, rules)
                     │
                     ├─► "Ask about this site"  → POST /sessions {accountId, traineeName}           (briefing)
                     └─► "Train on a scenario"  → GET /scenario-templates?accountId=…
                                                → POST /scenarios {accountId, templateId?}
                                                → POST /sessions {accountId, scenarioId, traineeName} (scenario)
Chat screen:  render session.messages; on send → POST /sessions/:id/messages (stream)
Finish:       POST /sessions/:id/debrief → show score, verdict, strengths, gaps, ruleViolations, rubric
```

A scenario session already contains its first assistant message (`"Dispatch: …"`), so render `messages` right away. A briefing session starts empty.

## Streaming chat replies

`POST /sessions/:id/messages` responds with Server-Sent Events. `EventSource` can't POST, so read the body stream instead. The parser below works unchanged on web and in Expo. Only the `fetch` import differs: on Expo, use `import { fetch } from "expo/fetch"`, because React Native's built-in fetch doesn't stream. Expo provides `TextDecoder` globally.

```ts
import type { ApiError } from "@electrical-hero/shared";
// Expo: import { fetch } from "expo/fetch";

export async function sendMessage(
  baseUrl: string,
  sessionId: string,
  content: string,
  onText: (text: string) => void,
): Promise<string> {
  const res = await fetch(`${baseUrl}/sessions/${sessionId}/messages`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ content }),
  });
  // Problems found before streaming starts (bad input, completed session, AI down) are plain JSON errors.
  if (!res.ok || !res.body) throw new Error(((await res.json()) as ApiError).error);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let sep: number;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const event = /^event: (.*)$/m.exec(frame)?.[1];
      const data = JSON.parse(/^data: (.*)$/m.exec(frame)?.[1] ?? "{}");
      if (event === "delta") onText(data.text);           // append to the bubble
      else if (event === "done") return data.messageId;   // reply saved
      else if (event === "error") throw new Error(data.error);
    }
  }
  throw new Error("stream ended without a reply");
}
```

Show the electrician's message immediately (optimistic UI), then grow the assistant bubble from the `delta` events. After `done`, the server holds the same text. `GET /sessions/:id` returns both messages.

## Behaviour worth handling in the UI

- **AI latency:** scenario generation and debriefs take tens of seconds. Show a spinner, and disable the button to avoid double submits, because each call spends free AI quota.
- **502:** the AI failed or is out of the daily free allowance. It's usually safe to retry later. Show the `error` text.
- **Completed sessions:** after a debrief, `POST …/messages` returns 400 with `"session is completed; start a new session to keep training"`. Start a new session.
- **Debrief before chatting:** returns 400 with `"nothing to grade yet: the electrician has not sent any messages"`.
- **Hidden answers:** scenarios never expose the cause or rubric. Only `title`, `difficulty` and `briefing` are public. The rubric appears in the debrief.
- **Validation errors** name the field, e.g. `"✖ Too small: expected string to have >=1 characters\n  → at traineeName"`. Trim inputs and don't send blanks.
