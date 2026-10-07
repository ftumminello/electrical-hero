import { z } from "zod";

export const GeneratedScenarioSchema = z.object({
  title: z.string().min(1),
  briefing: z.string().min(1),
  hiddenFacts: z.array(z.string().min(1)).min(1),
  expectedApproach: z.array(z.string().min(1)).min(1),
  rubric: z.array(z.object({ criterion: z.string().min(1), ruleId: z.string().nullish() })).min(1),
  redFlags: z.array(z.string()).default([]),
});
export type GeneratedScenario = z.infer<typeof GeneratedScenarioSchema>;

export const DebriefSchema = z.object({
  score: z.coerce.number().min(0).max(100),
  verdict: z.string().min(1),
  strengths: z.array(z.string()).default([]),
  gaps: z.array(z.string()).default([]),
  ruleViolations: z.array(z.object({ ruleId: z.string(), evidence: z.string() })).default([]),
  rubric: z.array(z.object({ criterion: z.string(), met: z.boolean(), evidence: z.string() })).default([]),
});
