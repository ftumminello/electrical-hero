import type { SafetyProtocol, SafetyProtocolSummary } from "@electrical-hero/shared";
import { asList, parseFrontmatter } from "./frontmatter";

export function parseProtocol(markdown: string): SafetyProtocol {
  const { data, body } = parseFrontmatter(markdown);
  const { id, title, category } = data;
  if (typeof id !== "string" || !id) throw new Error("safety protocol is missing an id");
  if (typeof title !== "string" || !title) throw new Error(`safety protocol ${id} is missing a title`);
  if (typeof category !== "string" || !category) throw new Error(`safety protocol ${id} is missing a category`);
  return {
    id,
    title,
    category,
    appliesTo: asList(data.applies_to),
    rules: asList(data.rules),
    osha: asList(data.osha),
    nfpa70e: asList(data.nfpa70e),
    markdown: body.trim(),
  };
}

export function toProtocolSummary(protocol: SafetyProtocol): SafetyProtocolSummary {
  const { markdown: _markdown, ...summary } = protocol;
  return summary;
}

export function protocolApplies(protocol: { appliesTo: string[] }, features: string[]): boolean {
  return protocol.appliesTo.every((f) => features.includes(f));
}

/** Protocols as one prompt block, each under a heading that carries its id. */
export function joinProtocols(protocols: SafetyProtocol[]): string {
  return protocols.map((p) => `### ${p.title} (${p.id})\n\n${p.markdown}`).join("\n\n");
}
