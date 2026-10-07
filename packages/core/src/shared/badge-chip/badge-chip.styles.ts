import { Award, BookOpen, Flame, HardHat, Shield, Zap } from "../../icons";
import type { BadgeIcon } from "./badge-chip.types";

// Copper is the brand's achievement color; copper-text keeps words ≥4.5:1.
export const CHIP =
  "flex flex-row items-center gap-1 self-start rounded-sm border border-copper bg-copper/10 px-2 py-1";
export const CHIP_ICON_ONLY = "flex h-7 w-7 items-center justify-center rounded-sm border border-copper bg-copper/10";
export const CHIP_TEXT = "text-copper-text";

export const BADGE_ICON: Record<BadgeIcon, typeof Award> = {
  shield: Shield,
  zap: Zap,
  award: Award,
  flame: Flame,
  book: BookOpen,
  "hard-hat": HardHat,
};
