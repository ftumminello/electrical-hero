import { Fragment, type ReactNode } from "react";
import { cn } from "@electrical-hero/design-system/cn";
import { Text } from "../text";
import { TYPE_CLASS } from "../text/text.styles";
import { parseInline, parseMarkdown } from "./markdown.parse";
import {
  HEADING_EXTRA,
  HEADING_VARIANT,
  INLINE_CODE,
  LIST,
  LIST_BULLET,
  LIST_ITEM,
  MARKDOWN,
  TABLE_CELL,
  TABLE_HEADER_CELL,
} from "./markdown.styles";
import type { MarkdownProps } from "./markdown.types";

const inline = (text: string): ReactNode =>
  parseInline(text).map((segment, i) =>
    segment.kind === "code" ? (
      <code key={i} className={INLINE_CODE}>
        {segment.text}
      </code>
    ) : segment.kind === "bold" ? (
      <strong key={i} className="font-semibold">
        {segment.text}
      </strong>
    ) : (
      <Fragment key={i}>{segment.text}</Fragment>
    ),
  );

const HEADING_TAG = { 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6" } as const;

export const Markdown = ({ content, baseHeadingLevel = 3, className }: MarkdownProps) => (
  <div className={cn(MARKDOWN, "flex flex-col", className)}>
    {parseMarkdown(content).map((block, i) => {
      switch (block.kind) {
        case "heading": {
          const Tag = HEADING_TAG[Math.min(baseHeadingLevel + block.depth - 1, 6) as keyof typeof HEADING_TAG];
          return (
            <Tag
              key={i}
              className={cn("text-ink", TYPE_CLASS[HEADING_VARIANT(block.depth)], HEADING_EXTRA(block.depth))}
            >
              {inline(block.text)}
            </Tag>
          );
        }
        case "list":
          return (
            <ul key={i} className={cn(LIST, "flex flex-col")}>
              {block.items.map((item, j) => (
                <li key={j} className={LIST_ITEM} style={{ paddingLeft: item.indent * 16 }}>
                  <span aria-hidden className={LIST_BULLET}>
                    •
                  </span>
                  <Text as="span">{inline(item.text)}</Text>
                </li>
              ))}
            </ul>
          );
        case "table":
          return (
            <div key={i} className="overflow-x-auto rounded border border-border">
              <table className="w-full border-collapse type-small">
                <thead>
                  <tr>
                    {block.header.map((cell, j) => (
                      <th key={j} scope="col" className={cn(TABLE_CELL, TABLE_HEADER_CELL, "font-semibold text-ink")}>
                        {inline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k} className={cn(TABLE_CELL, "text-ink")}>
                          {inline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case "paragraph":
          return <Text key={i}>{inline(block.text)}</Text>;
      }
    })}
  </div>
);
