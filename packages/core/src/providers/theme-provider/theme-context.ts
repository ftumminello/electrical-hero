"use client";

import { createContext, useContext } from "react";
import { colors } from "@electrical-hero/design-system/tokens";
import type { ThemeContextValue } from "./theme-provider.types";

export const ThemeContext = createContext<ThemeContextValue>({
  preference: "system",
  scheme: "light",
  colors: colors.light,
  setPreference: () => {},
});

export const useTheme = () => useContext(ThemeContext);
