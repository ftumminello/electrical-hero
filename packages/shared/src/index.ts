export const APP_NAME = "Electrical Hero";

export interface HealthResponse {
  status: "ok";
  app: string;
}

export interface ApiError {
  error: string;
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface AccountSummary {
  id: string;
  name: string;
  buildingType: string;
  address: Address;
  serviceSummary: string;
  features: string[];
}

export interface AccountDetail extends AccountSummary {
  companyId: string;
  siteContact: { name: string | null; phone: string | null };
  criticalInfo: string;
  configMarkdown: string;
}

export interface CompanyRules {
  companyId: string;
  markdown: string;
}

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface ScenarioTemplateSummary {
  id: string;
  title: string;
  difficulty: Difficulty;
  requires: string[];
  skills: string[];
  rules: string[];
}

export interface CreateScenarioRequest {
  accountId: string;
  templateId?: string;
}

export interface ScenarioPublic {
  id: string;
  accountId: string;
  templateId: string;
  title: string;
  difficulty: Difficulty;
  briefing: string;
  createdAt: string;
}

export type SessionMode = "briefing" | "scenario";
export type SessionStatus = "active" | "completed";

export interface CreateSessionRequest {
  accountId: string;
  scenarioId?: string;
  traineeName: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Session {
  id: string;
  accountId: string;
  scenarioId: string | null;
  mode: SessionMode;
  traineeName: string;
  status: SessionStatus;
  createdAt: string;
  endedAt: string | null;
}

export interface Debrief {
  score: number;
  verdict: string;
  strengths: string[];
  gaps: string[];
  ruleViolations: { ruleId: string; evidence: string }[];
  rubric: { criterion: string; met: boolean; evidence: string }[];
}

export interface SessionDetail extends Session {
  messages: ChatMessage[];
  debrief: Debrief | null;
}

export interface SendMessageRequest {
  content: string;
}

/** Server-sent events from POST /sessions/:id/messages. */
export type ChatStreamEvent =
  | { event: "delta"; data: { text: string } }
  | { event: "done"; data: { messageId: string } }
  | { event: "error"; data: { error: string } };
