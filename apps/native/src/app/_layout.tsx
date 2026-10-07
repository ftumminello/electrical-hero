import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Per-weight subpaths so only the weights the design system uses get bundled.
import { BarlowCondensed_600SemiBold } from "@expo-google-fonts/barlow-condensed/600SemiBold";
import { BarlowCondensed_700Bold } from "@expo-google-fonts/barlow-condensed/700Bold";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { JetBrainsMono_500Medium } from "@expo-google-fonts/jetbrains-mono/500Medium";
import { ApiProvider } from "@electrical-hero/core/providers/api-provider";
import { ThemeProvider, useTheme } from "@electrical-hero/core/providers/theme-provider";
import { TraineeProvider } from "@electrical-hero/core/providers/trainee-provider";
import { API_URL } from "../lib/api";

// Keep the native splash up until fonts and the saved theme are loaded.
SplashScreen.preventAutoHideAsync().catch(() => {});

function RootStack() {
  const { scheme, colors } = useTheme();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  // Root view color shows behind screen transitions and the keyboard.
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors["surface-100"]).catch(() => {});
  }, [colors]);

  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors["surface-100"] } }} />
    </>
  );
}

export default function RootLayout() {
  // Family names must match `nativeFontFamily` in the design-system tokens.
  const [fontsLoaded] = useFonts({
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    JetBrainsMono_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ApiProvider baseUrl={API_URL}>
          <TraineeProvider>
            <RootStack />
          </TraineeProvider>
        </ApiProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
