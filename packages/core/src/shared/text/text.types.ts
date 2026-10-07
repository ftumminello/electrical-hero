import type { ReactNode } from "react";
import type { TypographyVariant } from "@electrical-hero/design-system/tokens";

export type TextProps = {
  /** A design-system text style. Defaults to `body`. */
  variant?: TypographyVariant;
  /** Web only: the element to render. Defaults to a fitting tag for the variant. */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "code" | "label";
  numberOfLines?: number;
  className?: string;
  children: ReactNode;
};
