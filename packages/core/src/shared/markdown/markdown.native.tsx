import type { ReactNode } from "react";
import { ScrollView, Text as RNText, View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { Text } from "../text";
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

// Nested <Text> inherits the parent's style, so inline pieces only add what differs.
const inline = (text: string): ReactNode =>
  parseInline(text).map((segment, i) =>
    segment.kind === "code" ? (
      <RNText key={i} className={INLINE_CODE}>
        {segment.text}
      </RNText>
    ) : segment.kind === "bold" ? (
      <RNText key={i} className="font-semibold">
        {segment.text}
      </RNText>
    ) : (
      segment.text
    ),
  );

const CELL_WIDTH = 140;

export const Markdown = ({ content, className }: MarkdownProps) => (
  <View className={cn(MARKDOWN, "min-w-0 max-w-full", className)}>
    {parseMarkdown(content).map((block, i) => {
      switch (block.kind) {
        case "heading":
          return (
            <Text key={i} variant={HEADING_VARIANT(block.depth)} as="h3" className={HEADING_EXTRA(block.depth)}>
              {inline(block.text)}
            </Text>
          );
        case "list":
          return (
            <View key={i} className={LIST}>
              {block.items.map((item, j) => (
                <View key={j} className={cn(LIST_ITEM, "min-w-0")} style={{ paddingLeft: item.indent * 16 }}>
                  <Text className={LIST_BULLET}>•</Text>
                  <Text className="min-w-0 flex-1">{inline(item.text)}</Text>
                </View>
              ))}
            </View>
          );
        case "table":
          return (
            <ScrollView
              key={i}
              horizontal
              nestedScrollEnabled
              className="max-w-full rounded border border-border"
              style={{ flexGrow: 0 }}
            >
              <View>
                {[block.header, ...block.rows].map((row, j) => (
                  <View key={j} className="flex-row">
                    {row.map((cell, k) => (
                      <View
                        key={k}
                        style={{ width: CELL_WIDTH }}
                        className={cn(TABLE_CELL, j === 0 && TABLE_HEADER_CELL)}
                      >
                        <Text variant="small" className={j === 0 ? "font-semibold" : undefined}>
                          {inline(cell)}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          );
        case "paragraph":
          return <Text key={i}>{inline(block.text)}</Text>;
      }
    })}
  </View>
);
