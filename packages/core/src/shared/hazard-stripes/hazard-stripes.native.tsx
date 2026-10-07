import { useId } from "react";
import { View } from "react-native";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";
import { cn } from "@electrical-hero/design-system/cn";
import { useTheme } from "../../providers/theme-provider";
import { DEFAULT_HEIGHT, STRIPE_PITCH, STRIPE_WIDTH } from "./hazard-stripes.styles";
import type { HazardStripesProps } from "./hazard-stripes.types";

/** Accent edge only (hero band, safety divider). Never put text on it. */
export const HazardStripes = ({ height = DEFAULT_HEIGHT, className }: HazardStripesProps) => {
  const { colors } = useTheme();
  // useId output contains characters that break SVG url(#id) references.
  const patternId = `hazard${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn("w-full shrink-0 overflow-hidden", className)}
      style={{ height }}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id={patternId}
            width={STRIPE_PITCH}
            height={STRIPE_PITCH}
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-45)"
          >
            <Rect width={STRIPE_WIDTH} height={STRIPE_PITCH} fill={colors["surface-inverse"]} />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill={colors.voltage} />
        <Rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    </View>
  );
};
