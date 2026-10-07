import type { ReactNode } from "react";
import type { ColorScheme, ColorToken } from "@electrical-hero/design-system/tokens";

export type ThemePreference = ColorScheme | "system";

export type ThemeContextValue = {
  /** What the user picked; "system" follows the OS setting. */
  preference: ThemePreference;
  /** The scheme actually being rendered. */
  scheme: ColorScheme;
  /** Resolved hex values for things that can't take a class (icon colors, status bar, SVG fills). */
  colors: Record<ColorToken, string>;
  setPreference: (preference: ThemePreference) => void;
};

export type ThemeProviderProps = {
  children: ReactNode;
};
