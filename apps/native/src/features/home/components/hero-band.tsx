import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_NAME } from "@electrical-hero/shared";
import { Text } from "@electrical-hero/core/shared/text";

export function HeroBand() {
  const insets = useSafeAreaInsets();

  return (
    <View className="gap-3 bg-surface-inverse px-4 pb-12" style={{ paddingTop: insets.top + 48 }}>
      {/* The hero is always Panel Black, so the status bar stays light in both themes. */}
      <StatusBar style="light" />
      <Text variant="eyebrow" className="text-voltage">
        Electrician training
      </Text>
      <Text variant="display-l" className="text-ink-inverse">
        {APP_NAME}
      </Text>
      <Text variant="body-l" className="text-ink-inverse">
        Train like a pro. Work safe. Get licensed.
      </Text>
    </View>
  );
}
