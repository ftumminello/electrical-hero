import { ScrollView, View } from "react-native";
import { Callout } from "@electrical-hero/core/shared/callout";
import { HazardStripes } from "@electrical-hero/core/shared/hazard-stripes";
import { Text } from "@electrical-hero/core/shared/text";
import { ThemeToggle } from "@electrical-hero/core/shared/theme-toggle";
import { HeroBand } from "../components/hero-band";
import { ServerStatusCard } from "../components/server-status-card";

export function HomeView() {
  return (
    <ScrollView className="flex-1 bg-surface-100" contentContainerClassName="pb-12">
      <HeroBand />
      <HazardStripes />
      <View className="gap-8 px-4 py-8">
        <ServerStatusCard />
        <Callout tone="danger">Never work a live panel without PPE rated for the arc-flash boundary.</Callout>
        <Callout tone="notice" label="NEC 210.8(A)">
          <Text>
            Dwelling-unit receptacles in bathrooms, garages, outdoors and kitchens need GFCI protection. Reference:{" "}
            <Text variant="spec">2026 NEC 210.8(A)</Text>.
          </Text>
        </Callout>
        <View className="gap-3">
          <Text variant="eyebrow" className="text-ink-muted">
            Appearance
          </Text>
          <ThemeToggle />
        </View>
      </View>
    </ScrollView>
  );
}
