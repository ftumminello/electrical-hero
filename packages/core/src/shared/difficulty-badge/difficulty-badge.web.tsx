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
    <span className={cn(DIFFICULTY_BADGE, "inline-flex", className)}>
      <span aria-hidden className={cn(DIFFICULTY_BARS, "inline-flex")}>
        {DIFFICULTY_LEVELS.map((step) => (
          <span
            key={step}
            className={cn(DIFFICULTY_BAR[step - 1], step <= level ? DIFFICULTY_BAR_ON : DIFFICULTY_BAR_OFF)}
          />
        ))}
      </span>
      <Text as="span" variant="label">
        <span className="sr-only">Difficulty: </span>
        {label}
      </Text>
    </span>
  );
};
