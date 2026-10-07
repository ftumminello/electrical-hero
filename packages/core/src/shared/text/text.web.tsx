import type { CSSProperties } from "react";
import type { TypographyVariant } from "@electrical-hero/design-system/tokens";
import { cn } from "@electrical-hero/design-system/cn";
import { TYPE_CLASS } from "./text.styles";
import type { TextProps } from "./text.types";

const DEFAULT_ELEMENT: Record<TypographyVariant, NonNullable<TextProps["as"]>> = {
  "display-xl": "h1",
  "display-l": "h1",
  heading: "h2",
  eyebrow: "p",
  "body-l": "p",
  body: "p",
  small: "p",
  label: "span",
  spec: "code",
};

// Emulates React Native's numberOfLines.
const clampStyle = (numberOfLines: number): CSSProperties =>
  numberOfLines === 1
    ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
    : { overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: numberOfLines };

export const Text = ({ variant = "body", as, numberOfLines, className, children }: TextProps) => {
  const Element = as ?? DEFAULT_ELEMENT[variant];

  return (
    <Element
      className={cn(TYPE_CLASS[variant], "text-ink", className)}
      style={numberOfLines ? clampStyle(numberOfLines) : undefined}
    >
      {children}
    </Element>
  );
};
