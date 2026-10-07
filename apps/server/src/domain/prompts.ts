import type { ScenarioHidden } from "./mappers";
import type { ScenarioTemplate } from "./templates";

export type ModelMessage = { role: "system" | "user" | "assistant"; content: string };

export interface SiteContext {
  accountName: string;
  address: string;
  configMarkdown: string;
  rulesMarkdown: string;
}

export type ScenarioForPrompt = ScenarioHidden & { title: string; briefing: string };

export const GROUNDING_RULE =
  "Only state facts that appear in the SITE FILE, COMPANY RULES, or SCENARIO in this prompt. If something is not there, say it is not in the site records. Never invent equipment, readings, settings, or history.";

const bullets = (items: string[]): string => (items.length ? items.map((i) => `- ${i}`).join("\n") : "- (none)");

function siteBlock(site: SiteContext): string {
  return [
    `SITE: ${site.accountName}, ${site.address}`,
    `=== SITE FILE ===\n${site.configMarkdown.trim()}`,
    `=== COMPANY RULES ===\n${site.rulesMarkdown.trim()}`,
  ].join("\n\n");
}

function scenarioBlock(s: ScenarioForPrompt): string {
  return [
    `=== SCENARIO: ${s.title} ===`,
    `Briefing given to the electrician:\n${s.briefing}`,
    `Hidden facts (never state these directly):\n${bullets(s.hiddenFacts)}`,
    `Expected approach:\n${bullets(s.expectedApproach)}`,
    `Rubric:\n${bullets(s.rubric.map((r) => (r.ruleId ? `${r.criterion} [${r.ruleId}]` : r.criterion)))}`,
    `Red flags:\n${bullets(s.redFlags)}`,
  ].join("\n\n");
}

export function briefingSystemPrompt(site: SiteContext): string {
  return [
    "You are the account lead at an electrical contracting company. One of your electricians is about to work at the customer site below and is asking you questions. Answer like an experienced foreman: clear, practical, brief. Name the exact panels, disconnects, and equipment IDs involved, point out hazards, and cite the company rule IDs that apply.",
    GROUNDING_RULE,
    siteBlock(site),
  ].join("\n\n");
}

export function scenarioSystemPrompt(site: SiteContext, scenario: ScenarioForPrompt): string {
  return [
    'You are running a live training scenario for an electrician at the customer site below. You play the company dispatcher and the on-site customer contact; start each line with "Dispatch:" or "Site contact:". The electrician tells you what they do; you describe what they see, measure, or are told, consistent with the hidden facts. Never reveal the hidden facts or the cause outright; let the electrician find them through sound steps. Keep each reply under 120 words. If the electrician describes an unsafe or rule-breaking action, react in character as a real dispatcher or site contact would (stop them, question it); do not lecture, because grading happens afterwards.',
    GROUNDING_RULE,
    siteBlock(site),
    scenarioBlock(scenario),
  ].join("\n\n");
}

export function scenarioGenerationMessages(site: SiteContext, template: ScenarioTemplate): ModelMessage[] {
  const system = [
    "You design realistic field training scenarios for electricians, set at a real customer site and judged against the contractor's own rules.",
    'Respond with ONLY a JSON object, no prose or code fences, of this shape: {"title": string, "briefing": string, "hiddenFacts": string[], "expectedApproach": string[], "rubric": [{"criterion": string, "ruleId": string | null}], "redFlags": string[]}',
    "briefing: what dispatch tells the electrician, 2-4 sentences, symptoms only, never the cause. hiddenFacts: what is actually going on, using exact equipment IDs from the site file. expectedApproach: the ordered steps a competent electrician takes, citing rule IDs. rubric: 4-7 gradeable criteria, with ruleId set when a company rule applies. redFlags: unsafe or rule-breaking actions to watch for.",
    GROUNDING_RULE,
    siteBlock(site),
  ].join("\n\n");
  const user = [
    `Template: ${template.title} (difficulty: ${template.difficulty})`,
    `Skills tested: ${template.skills.join(", ")}`,
    `Company rules to stress: ${template.rules.join(", ")}`,
    template.instructions,
  ].join("\n");
  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

export function debriefMessages(
  site: SiteContext,
  transcript: { role: "user" | "assistant"; content: string }[],
  scenario: ScenarioForPrompt | null,
): ModelMessage[] {
  const system = [
    "You are a strict but fair master electrician grading a trainee's session.",
    'Respond with ONLY a JSON object, no prose or code fences, of this shape: {"score": number from 0 to 100, "verdict": string, "strengths": string[], "gaps": string[], "ruleViolations": [{"ruleId": string, "evidence": string}], "rubric": [{"criterion": string, "met": boolean, "evidence": string}]}',
    "Only report rule violations the transcript actually shows, and quote the electrician's own words as evidence.",
    GROUNDING_RULE,
    siteBlock(site),
    ...(scenario ? [scenarioBlock(scenario)] : []),
  ].join("\n\n");
  const task = scenario
    ? "Grade the electrician against every rubric criterion above (met true or false, with evidence), list any company rule violations, and give an overall score and a one-sentence verdict."
    : "This was a site briefing, not a scenario. Judge how well the electrician prepared: did they ask about hazards, isolation points, applicable company rules, and site access? Return an empty rubric array, and list as gaps what they should still check before starting work.";
  const convo = transcript
    .map((m) => `${m.role === "user" ? "ELECTRICIAN" : "TRAINER"}: ${m.content}`)
    .join("\n\n");
  return [
    { role: "system", content: system },
    { role: "user", content: `${task}\n\n=== TRANSCRIPT ===\n${convo}` },
  ];
}
