import type {
  AccountDetail,
  AccountSummary,
  ChatMessage,
  Debrief,
  Difficulty,
  ScenarioPublic,
  Session,
  SessionDetail,
  SessionMode,
  SessionStatus,
} from "@electrical-hero/shared";
import type { GeneratedScenario } from "./schemas";

export interface AccountRow {
  id: string;
  company_id: string;
  name: string;
  building_type: string;
  address_line1: string;
  city: string;
  state: string;
  postal_code: string;
  site_contact_name: string | null;
  site_contact_phone: string | null;
  service_summary: string;
  critical_info: string;
  features: string;
  config_key: string;
}

export interface ScenarioRow {
  id: string;
  account_id: string;
  template_id: string;
  title: string;
  difficulty: Difficulty;
  briefing: string;
  hidden_json: string;
  created_at: string;
}

export interface SessionRow {
  id: string;
  account_id: string;
  scenario_id: string | null;
  mode: SessionMode;
  trainee_name: string;
  status: SessionStatus;
  debrief_json: string | null;
  created_at: string;
  ended_at: string | null;
}

export interface MessageRow {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

/** The parts of a generated scenario that only the AI may see, plus the safety protocols it was built on. */
export type ScenarioHidden = Pick<GeneratedScenario, "hiddenFacts" | "expectedApproach" | "rubric" | "redFlags"> & {
  protocolIds: string[];
};

export function parseFeatures(json: string): string[] {
  try {
    const value: unknown = JSON.parse(json);
    return Array.isArray(value) ? value.filter((f): f is string => typeof f === "string") : [];
  } catch {
    return [];
  }
}

export const formatAddress = (r: AccountRow): string => `${r.address_line1}, ${r.city}, ${r.state} ${r.postal_code}`;

export function toAccountSummary(r: AccountRow): AccountSummary {
  return {
    id: r.id,
    name: r.name,
    buildingType: r.building_type,
    address: { line1: r.address_line1, city: r.city, state: r.state, postalCode: r.postal_code },
    serviceSummary: r.service_summary,
    features: parseFeatures(r.features),
  };
}

export function toAccountDetail(r: AccountRow, configMarkdown: string): AccountDetail {
  return {
    ...toAccountSummary(r),
    companyId: r.company_id,
    siteContact: { name: r.site_contact_name, phone: r.site_contact_phone },
    criticalInfo: r.critical_info,
    configMarkdown,
  };
}

export function toScenarioPublic(r: ScenarioRow): ScenarioPublic {
  return {
    id: r.id,
    accountId: r.account_id,
    templateId: r.template_id,
    title: r.title,
    difficulty: r.difficulty,
    briefing: r.briefing,
    createdAt: r.created_at,
  };
}

export function scenarioHidden(r: ScenarioRow): ScenarioHidden {
  const hidden = JSON.parse(r.hidden_json) as Partial<ScenarioHidden>;
  // Scenarios generated before safety protocols existed carry no protocolIds.
  return { ...(hidden as ScenarioHidden), protocolIds: hidden.protocolIds ?? [] };
}

export function hiddenJson(g: GeneratedScenario, protocolIds: string[]): string {
  const hidden: ScenarioHidden = {
    hiddenFacts: g.hiddenFacts,
    expectedApproach: g.expectedApproach,
    rubric: g.rubric,
    redFlags: g.redFlags,
    protocolIds,
  };
  return JSON.stringify(hidden);
}

export function toSession(r: SessionRow): Session {
  return {
    id: r.id,
    accountId: r.account_id,
    scenarioId: r.scenario_id,
    mode: r.mode,
    traineeName: r.trainee_name,
    status: r.status,
    createdAt: r.created_at,
    endedAt: r.ended_at,
  };
}

export const toChatMessage = (m: MessageRow): ChatMessage => ({
  id: m.id,
  role: m.role,
  content: m.content,
  createdAt: m.created_at,
});

export function toSessionDetail(s: SessionRow, messages: MessageRow[]): SessionDetail {
  return {
    ...toSession(s),
    messages: messages.map(toChatMessage),
    debrief: s.debrief_json ? (JSON.parse(s.debrief_json) as Debrief) : null,
  };
}
