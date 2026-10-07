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
  /** Safety protocol ids this scenario type exercises. */
  protocols: string[];
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

export interface SafetyProtocolSummary {
  id: string;
  title: string;
  category: string;
  /** Account features the site must have; empty = applies everywhere. */
  appliesTo: string[];
  /** Company rule ids, e.g. R-LOTO-01. */
  rules: string[];
  /** 29 CFR sections, fetchable from GET /regulations/cfr/29/{section}. */
  osha: string[];
  /** NFPA 70E article references (cited, never quoted). */
  nfpa70e: string[];
}

export interface SafetyProtocol extends SafetyProtocolSummary {
  markdown: string;
}

export interface CodeSpec {
  id: string;
  name: string;
  necEdition: string;
  nextEdition: string | null;
  authority: string;
  amendments: string;
  markdown: string;
}

/** OSHA regulation text fetched live from eCFR (public domain). */
export interface Regulation {
  section: string;
  heading: string;
  text: string;
  sourceUrl: string;
  /** eCFR "up to date as of" date for title 29. */
  asOf: string;
}
