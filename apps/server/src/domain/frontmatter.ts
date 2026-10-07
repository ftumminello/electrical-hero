export interface Frontmatter {
  data: Record<string, string | string[]>;
  body: string;
}

/** Minimal front matter: `key: value` and `key: [a, b]` lines, `#` comments. Enough for our seed files. */
export function parseFrontmatter(markdown: string): Frontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(markdown);
  if (!match) return { data: {}, body: markdown };
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([A-Za-z_][\w-]*)\s*:\s*(.*?)\s*(#.*)?$/.exec(line);
    if (!field) continue;
    const raw = field[2];
    data[field[1]] =
      raw.startsWith("[") && raw.endsWith("]")
        ? raw.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean)
        : raw;
  }
  return { data, body: match[2] };
}
