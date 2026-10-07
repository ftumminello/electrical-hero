import type { ThemePreference } from "./theme-provider.types";

export const THEME_STORAGE_KEY = "electrical-hero:theme";

export const isThemePreference = (value: unknown): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system";
