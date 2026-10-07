/** Concatenates a company's rule files in key order so prompts are deterministic. */
export function joinRules(docs: { key: string; text: string }[]): string {
  return [...docs]
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
    .map((d) => d.text.trim())
    .join("\n\n");
}
