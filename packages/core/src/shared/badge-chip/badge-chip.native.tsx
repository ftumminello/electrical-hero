import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import { BADGE_ICON, CHIP, CHIP_ICON_ONLY, CHIP_TEXT } from "./badge-chip.styles";
import type { BadgeChipProps } from "./badge-chip.types";

export const BadgeChip = ({ label, icon, size = "md", className }: BadgeChipProps) => {
  const { colors } = useTheme();
  const Icon = BADGE_ICON[icon];
  const iconColor = colors["copper-text"];

  if (size === "sm") {
    return (
      <View accessibilityRole="image" accessibilityLabel={label} className={cn(CHIP_ICON_ONLY, className)}>
        <Icon size={14} strokeWidth={2} color={iconColor} />
      </View>
    );
  }

  return (
    <View className={cn(CHIP, className)}>
      <Icon size={14} strokeWidth={2} color={iconColor} />
      <Text variant="label" className={CHIP_TEXT}>
        {label}
      </Text>
    </View>
  );
};
