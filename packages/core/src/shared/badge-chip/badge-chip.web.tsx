import { cn } from "@electrical-hero/design-system/cn";
import { Text } from "../text";
import { BADGE_ICON, CHIP, CHIP_ICON_ONLY, CHIP_TEXT } from "./badge-chip.styles";
import type { BadgeChipProps } from "./badge-chip.types";

export const BadgeChip = ({ label, icon, size = "md", className }: BadgeChipProps) => {
  const Icon = BADGE_ICON[icon];

  if (size === "sm") {
    return (
      <span role="img" aria-label={label} title={label} className={cn(CHIP_ICON_ONLY, "inline-flex", className)}>
        <Icon aria-hidden size={14} strokeWidth={2} className={CHIP_TEXT} />
      </span>
    );
  }

  return (
    <span className={cn(CHIP, "inline-flex", className)}>
      <Icon aria-hidden size={14} strokeWidth={2} className={CHIP_TEXT} />
      <Text as="span" variant="label" className={CHIP_TEXT}>
        {label}
      </Text>
    </span>
  );
};
