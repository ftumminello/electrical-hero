export type MarkdownProps = {
  /** Markdown text: headings, bullet lists, tables, paragraphs, `code` and **bold**. */
  content: string;
  /** Heading level used for `#`; deeper headings step down from it. Defaults to 3. */
  baseHeadingLevel?: 2 | 3 | 4;
  className?: string;
};

export type InlineSegment = { kind: "text" | "code" | "bold"; text: string };

export type MarkdownBlock =
  | { kind: "heading"; depth: number; text: string }
  | { kind: "list"; items: { indent: number; text: string }[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "paragraph"; text: string };
