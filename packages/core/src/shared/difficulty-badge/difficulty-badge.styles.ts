import type { Difficulty } from "@electrical-hero/shared";

// Filled bars plus the level's name, so difficulty is never shown by color alone.
export const DIFFICULTY: Record<Difficulty, { label: string; level: number }> = {
  beginner: { label: "Beginner", level: 1 },
  intermediate: { label: "Intermediate", level: 2 },
  advanced: { label: "Advanced", level: 3 },
};

export const DIFFICULTY_LEVELS = [1, 2, 3] as const;

export const DIFFICULTY_BADGE = "flex flex-row items-center gap-2 self-start";
export const DIFFICULTY_BARS = "flex flex-row items-end gap-0.5";
export const DIFFICULTY_BAR = ["h-2 w-1.5 rounded-sm", "h-3 w-1.5 rounded-sm", "h-4 w-1.5 rounded-sm"] as const;
export const DIFFICULTY_BAR_ON = "bg-ink";
export const DIFFICULTY_BAR_OFF = "bg-border-strong/40";
