import { Text as RNText } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { HEADING_VARIANTS, TYPE_CLASS } from "./text.styles";
import type { TextProps } from "./text.types";

export const Text = ({ variant = "body", as, numberOfLines, className, children }: TextProps) => {
  const isHeading = as ? /^h\d$/.test(as) : HEADING_VARIANTS.includes(variant);

  return (
    <RNText
      accessibilityRole={isHeading ? "header" : undefined}
      numberOfLines={numberOfLines}
      ellipsizeMode={numberOfLines ? "tail" : undefined}
      className={cn(TYPE_CLASS[variant], "text-ink", className)}
    >
      {children}
    </RNText>
  );
};
