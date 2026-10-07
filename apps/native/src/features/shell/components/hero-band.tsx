import type { ReactNode } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HazardStripes } from "@electrical-hero/core/shared/hazard-stripes";
import { Text } from "@electrical-hero/core/shared/text";

type HeroBandProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function HeroBand({ eyebrow, title, children }: HeroBandProps) {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View className="gap-3 bg-surface-inverse px-4 pb-8" style={{ paddingTop: insets.top + 32 }}>
        {/* The hero is always Panel Black, so the status bar stays light in both themes. */}
        <StatusBar style="light" />
        <Text variant="eyebrow" className="text-voltage">
          {eyebrow}
        </Text>
        <Text variant="display-l" className="text-ink-inverse">
          {title}
        </Text>
        {children}
      </View>
      <HazardStripes />
    </View>
  );
}
