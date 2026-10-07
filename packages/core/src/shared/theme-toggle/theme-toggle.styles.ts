import type { ThemePreference } from "../../providers/theme-provider";

export const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export const TOGGLE_GROUP = "flex flex-row gap-1 self-start rounded border border-border-strong bg-surface-200 p-1";
export const TOGGLE_OPTION = "flex flex-row items-center gap-2 rounded-sm px-3 py-2";
export const TOGGLE_OPTION_SELECTED = "bg-voltage";
export const TOGGLE_LABEL = "text-ink-muted";
export const TOGGLE_LABEL_SELECTED = "text-ink-on-voltage";
