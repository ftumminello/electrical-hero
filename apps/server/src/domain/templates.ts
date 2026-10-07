import type { Difficulty, ScenarioTemplateSummary } from "@electrical-hero/shared";
import { parseFrontmatter } from "./frontmatter";

export interface ScenarioTemplate extends ScenarioTemplateSummary {
  instructions: string;
}

const DIFFICULTIES: readonly string[] = ["beginner", "intermediate", "advanced"];

const asList = (v: string | string[] | undefined): string[] => (Array.isArray(v) ? v : v ? [v] : []);

export function parseTemplate(markdown: string): ScenarioTemplate {
  const { data, body } = parseFrontmatter(markdown);
  const { id, title, difficulty } = data;
  if (typeof id !== "string" || !id) throw new Error("scenario template is missing an id");
  if (typeof title !== "string" || !title) throw new Error(`scenario template ${id} is missing a title`);
  if (typeof difficulty !== "string" || !DIFFICULTIES.includes(difficulty)) {
    throw new Error(`scenario template ${id} has an invalid difficulty`);
  }
  return {
    id,
    title,
    difficulty: difficulty as Difficulty,
    requires: asList(data.requires),
    skills: asList(data.skills),
    rules: asList(data.rules),
    instructions: body.trim(),
  };
}

export function isApplicable(template: { requires: string[] }, features: string[]): boolean {
  return template.requires.every((f) => features.includes(f));
}

export function toTemplateSummary(template: ScenarioTemplate): ScenarioTemplateSummary {
  const { instructions: _instructions, ...summary } = template;
  return summary;
}
