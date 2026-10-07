import type { BadgeIcon } from "@electrical-hero/shared";

export type BadgeChipProps = {
  /** The badge's name, always shown as words. */
  label: string;
  icon: BadgeIcon;
  /** `sm` is icon-only with the name as its accessible label (leaderboard rows). Defaults to `md`. */
  size?: "sm" | "md";
  className?: string;
};
