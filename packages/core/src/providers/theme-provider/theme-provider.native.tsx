import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, vars } from "nativewind";
import { colors, themeVariables } from "@electrical-hero/design-system/tokens";
import { ThemeContext } from "./theme-context";
import { THEME_STORAGE_KEY, isThemePreference } from "./theme-storage";
import type { ThemePreference, ThemeProviderProps } from "./theme-provider.types";

const schemeVars = {
  light: vars(themeVariables.light),
  dark: vars(themeVariables.dark),
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>();

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .catch(() => null)
      .then((stored) => {
        const initial = isThemePreference(stored) ? stored : "system";
        setColorScheme(initial);
        setPreferenceState(initial);
      });
  }, []);

  // Render nothing (the splash screen stays up) until the saved preference is known.
  if (!preference) return null;

  const scheme = colorScheme === "dark" ? "dark" : "light";

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    setColorScheme(next);
    AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {});
  };

  return (
    <ThemeContext value={{ preference, scheme, colors: colors[scheme], setPreference }}>
      <View style={[styles.root, schemeVars[scheme]]}>{children}</View>
    </ThemeContext>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
