import type { InlineSegment, MarkdownBlock } from "./markdown.types";

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());

const isTableSeparator = (line: string) => /^\s*\|?\s*:?-{3,}/.test(line);

/** A small, safe Markdown subset; anything else renders as plain paragraphs. */
export function parseMarkdown(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    const bullet = /^(\s*)(?:[-*]|\d+\.)\s+(.*)$/.exec(line);

    if (!line.trim()) {
      flushParagraph();
    } else if (heading) {
      flushParagraph();
      blocks.push({ kind: "heading", depth: heading[1]!.length, text: heading[2]!.trim() });
    } else if (bullet) {
      flushParagraph();
      const item = { indent: Math.floor(bullet[1]!.length / 2), text: bullet[2]! };
      const last = blocks.at(-1);
      if (last?.kind === "list") last.items.push(item);
      else blocks.push({ kind: "list", items: [item] });
    } else if (line.trim().startsWith("|")) {
      flushParagraph();
      const rows: string[][] = [];
      while (i < lines.length && lines[i]!.trim().startsWith("|")) {
        if (!isTableSeparator(lines[i]!)) rows.push(splitRow(lines[i]!));
        i++;
      }
      i--;
      const [header = [], ...body] = rows;
      blocks.push({ kind: "table", header, rows: body });
    } else {
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  return blocks;
}

/** Splits `code` and **bold** out of a line of text. */
export function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) segments.push({ kind: "text", text: text.slice(last, match.index) });
    segments.push(match[1] !== undefined ? { kind: "code", text: match[1] } : { kind: "bold", text: match[2]! });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ kind: "text", text: text.slice(last) });
  return segments;
}
