import { ActivityIndicator, View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { Check, X } from "../../icons";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import { BADGE, BADGE_STATUS } from "./status-badge.styles";
import type { StatusBadgeProps } from "./status-badge.types";

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const { colors } = useTheme();
  const styles = BADGE_STATUS[status];
  const iconColor = colors[styles.icon];

  return (
    <View accessibilityRole="text" accessibilityLabel={label} className={cn(BADGE, styles.container, className)}>
      {status === "success" && <Check size={14} strokeWidth={2} color={iconColor} />}
      {status === "error" && <X size={14} strokeWidth={2} color={iconColor} />}
      {status === "pending" && <ActivityIndicator size="small" color={iconColor} />}
      <Text variant="label" className={styles.text}>
        {label}
      </Text>
    </View>
  );
};
