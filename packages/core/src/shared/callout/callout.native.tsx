import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { Info, OctagonAlert, TriangleAlert } from "../../icons";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import { CALLOUT_BODY, CALLOUT_CONTAINER, CALLOUT_HEADER, CALLOUT_TONE } from "./callout.styles";
import type { CalloutProps } from "./callout.types";

const ICON = { danger: OctagonAlert, warning: TriangleAlert, notice: Info };

export const Callout = ({ tone, label, className, children }: CalloutProps) => {
  const { colors } = useTheme();
  const styles = CALLOUT_TONE[tone];
  const Icon = ICON[tone];

  return (
    <View accessibilityRole="summary" className={cn(CALLOUT_CONTAINER, className)}>
      <View className={cn(CALLOUT_HEADER, styles.header)}>
        <Icon size={16} strokeWidth={2} color={colors[styles.icon]} />
        <Text variant="eyebrow" className={styles.text}>
          {label ?? styles.label}
        </Text>
      </View>
      <View className={CALLOUT_BODY}>{typeof children === "string" ? <Text>{children}</Text> : children}</View>
    </View>
  );
};
