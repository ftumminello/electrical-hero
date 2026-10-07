import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { Text } from "../text";
import {
  DIFFICULTY,
  DIFFICULTY_BADGE,
  DIFFICULTY_BAR,
  DIFFICULTY_BAR_OFF,
  DIFFICULTY_BAR_ON,
  DIFFICULTY_BARS,
  DIFFICULTY_LEVELS,
} from "./difficulty-badge.styles";
import type { DifficultyBadgeProps } from "./difficulty-badge.types";

export const DifficultyBadge = ({ difficulty, className }: DifficultyBadgeProps) => {
  const { label, level } = DIFFICULTY[difficulty];

  return (
    <View accessibilityLabel={`Difficulty: ${label}`} className={cn(DIFFICULTY_BADGE, className)}>
      <View className={DIFFICULTY_BARS}>
        {DIFFICULTY_LEVELS.map((step) => (
          <View
            key={step}
            className={cn(DIFFICULTY_BAR[step - 1], step <= level ? DIFFICULTY_BAR_ON : DIFFICULTY_BAR_OFF)}
          />
        ))}
      </View>
      <Text variant="label">{label}</Text>
    </View>
  );
};
