import type { TypographyVariant } from "@electrical-hero/design-system/tokens";

// Literal class names so Tailwind and NativeWind find them when scanning source.
export const TYPE_CLASS: Record<TypographyVariant, string> = {
  "display-xl": "type-display-xl",
  "display-l": "type-display-l",
  heading: "type-heading",
  eyebrow: "type-eyebrow",
  "body-l": "type-body-l",
  body: "type-body",
  small: "type-small",
  label: "type-label",
  spec: "type-spec",
};

export const HEADING_VARIANTS: TypographyVariant[] = ["display-xl", "display-l", "heading"];
