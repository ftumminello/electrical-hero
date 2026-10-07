import type { CodeSpec } from "@electrical-hero/shared";
import { parseFrontmatter } from "./frontmatter";

/** Ids that may be used as R2 keys: lower-case words joined by hyphens, nothing else. */
export const isSafeId = (id: string): boolean => /^[a-z0-9-]+$/.test(id);

export const jurisdictionFor = (state: string): string => `us-${state.trim().toLowerCase()}`;

export function parseCodeSpec(markdown: string): CodeSpec {
  const { data, body } = parseFrontmatter(markdown);
  const text = (field: string): string => {
    const value = data[field];
    if (typeof value !== "string" || !value) throw new Error(`code spec is missing ${field}`);
    return value;
  };
  const next = data.next_edition;
  return {
    id: text("id"),
    name: text("name"),
    necEdition: text("nec_edition"),
    nextEdition: typeof next === "string" && next ? next : null,
    authority: text("authority"),
    amendments: text("amendments"),
    markdown: body.trim(),
  };
}
