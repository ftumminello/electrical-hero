import type {
  AccountDetail,
  AccountSummary,
  ApiError,
  CompanyRules,
  CreateScenarioRequest,
  CreateSessionRequest,
  Debrief,
  SafetyProtocol,
  SafetyProtocolSummary,
  ScenarioPublic,
  ScenarioTemplateSummary,
  SessionDetail,
} from "@electrical-hero/shared";
import { readChatStream } from "./chat-stream";
import { streamFetch } from "./stream-fetch";
import type { StreamResponse } from "./stream-fetch.types";

/** The deployed Cloudflare Worker. Local `wrangler dev` starts with empty storage. */
export const DEFAULT_API_URL = "https://electrical-hero-api.electrical-hero.workers.dev";

/** An error from the API. `message` is the server's `error` text, written to be shown to users. */
export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

const errorFrom = async (res: Pick<StreamResponse, "status" | "json">) => {
  const body = (await res.json().catch(() => null)) as ApiError | null;
  return new ApiRequestError(body?.error ?? `Request failed (${res.status})`, res.status);
};

export function createApiClient(baseUrl: string) {
  const url = (path: string) => `${baseUrl.replace(/\/$/, "")}${path}`;

  async function request<T>(path: string, init?: { method?: "GET" | "POST"; body?: unknown }): Promise<T> {
    let res: Response;
    try {
      res = await fetch(url(path), {
        method: init?.method ?? "GET",
        headers: init?.body === undefined ? undefined : { "content-type": "application/json" },
        body: init?.body === undefined ? undefined : JSON.stringify(init.body),
      });
    } catch {
      throw new ApiRequestError("Can't reach the server. Check your connection and try again.", 0);
    }
    if (!res.ok) throw await errorFrom(res);
    return (await res.json()) as T;
  }

  return {
    listAccounts: () => request<AccountSummary[]>("/accounts"),
    getAccount: (accountId: string) => request<AccountDetail>(`/accounts/${encodeURIComponent(accountId)}`),
    getRules: () => request<CompanyRules>("/rules"),
    listSafetyProtocols: () => request<SafetyProtocolSummary[]>("/safety-protocols"),
    getSafetyProtocol: (protocolId: string) =>
      request<SafetyProtocol>(`/safety-protocols/${encodeURIComponent(protocolId)}`),
    listTemplates: (accountId?: string) =>
      request<ScenarioTemplateSummary[]>(
        accountId ? `/scenario-templates?accountId=${encodeURIComponent(accountId)}` : "/scenario-templates",
      ),
    /** AI: takes 10–40 s. Omit `templateId` for a random template the site qualifies for. */
    createScenario: (body: CreateScenarioRequest) => request<ScenarioPublic>("/scenarios", { method: "POST", body }),
    getScenario: (scenarioId: string) => request<ScenarioPublic>(`/scenarios/${encodeURIComponent(scenarioId)}`),
    createSession: (body: CreateSessionRequest) => request<SessionDetail>("/sessions", { method: "POST", body }),
    getSession: (sessionId: string) => request<SessionDetail>(`/sessions/${encodeURIComponent(sessionId)}`),
    /** AI: grades and closes the session (10–30 s). Calling it again returns the same debrief. */
    debrief: (sessionId: string) =>
      request<Debrief>(`/sessions/${encodeURIComponent(sessionId)}/debrief`, { method: "POST" }),

    /** AI: streams the reply. `onText` gets each piece as it arrives; resolves with the saved message id. */
    async sendMessage(sessionId: string, content: string, onText: (text: string) => void): Promise<string> {
      let res: StreamResponse;
      try {
        res = await streamFetch(url(`/sessions/${encodeURIComponent(sessionId)}/messages`), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } catch {
        throw new ApiRequestError("Can't reach the server. Check your connection and try again.", 0);
      }
      // Problems found before streaming starts are plain JSON errors.
      if (!res.ok || !res.body) throw await errorFrom(res);
      return readChatStream(res.body, onText);
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;

/** A message safe to show the user for anything a request throws. */
export const errorMessage = (error: unknown) =>
  error instanceof Error && error.message ? error.message : "Something went wrong. Try again.";
