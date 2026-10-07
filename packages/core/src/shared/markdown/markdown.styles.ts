import type { TypographyVariant } from "@electrical-hero/design-system/tokens";

export const MARKDOWN = "gap-3";

// `#` maps to `heading`; deeper levels step down to body-sized labels.
export const HEADING_VARIANT = (depth: number): TypographyVariant =>
  depth <= 1 ? "heading" : depth === 2 ? "body-l" : "label";

export const HEADING_EXTRA = (depth: number) => (depth >= 2 ? "font-semibold" : "");

export const LIST = "gap-1";
export const LIST_ITEM = "flex flex-row gap-2";
export const LIST_BULLET = "text-steel";
export const INLINE_CODE = "rounded-sm bg-surface-300 px-1 text-ink type-spec";
export const TABLE_CELL = "border-b border-border px-3 py-2 text-left";
export const TABLE_HEADER_CELL = "bg-surface-300";
