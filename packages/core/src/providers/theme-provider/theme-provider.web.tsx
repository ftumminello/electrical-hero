"use client";

import { useSyncExternalStore } from "react";
import { colors, type ColorScheme } from "@electrical-hero/design-system/tokens";
import { ThemeContext } from "./theme-context";
import { THEME_STORAGE_KEY, isThemePreference } from "./theme-storage";
import type { ThemePreference, ThemeProviderProps } from "./theme-provider.types";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();

// Used when localStorage is unavailable (blocked storage, some private modes).
let memoryPreference: ThemePreference = "system";

const readPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return memoryPreference;
  }
};

const resolveScheme = (preference: ThemePreference): ColorScheme => {
  if (preference !== "system") return preference;
  return matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

// ThemeScript sets the attribute before first paint; this keeps it in sync after.
const applyScheme = (scheme: ColorScheme) => {
  document.documentElement.dataset.theme = scheme;
  document.documentElement.style.colorScheme = scheme;
};

const notify = () => {
  applyScheme(resolveScheme(readPreference()));
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  const media = matchMedia(DARK_QUERY);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) notify();
  };

  listeners.add(listener);
  media.addEventListener("change", notify);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", notify);
    window.removeEventListener("storage", onStorage);
  };
};

const getSnapshot = () => {
  const preference = readPreference();
  return `${preference}:${resolveScheme(preference)}`;
};

const getServerSnapshot = () => "system:light";

const setPreference = (preference: ThemePreference) => {
  memoryPreference = preference;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {}
  notify();
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preference, scheme] = snapshot.split(":") as [ThemePreference, ColorScheme];

  return <ThemeContext value={{ preference, scheme, colors: colors[scheme], setPreference }}>{children}</ThemeContext>;
}
