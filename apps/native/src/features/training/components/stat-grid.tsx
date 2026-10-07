import { View } from "react-native";
import type { TrainingStats } from "@electrical-hero/core/lib/training-stats";
import { Text } from "@electrical-hero/core/shared/text";

export function StatGrid({ stats }: { stats: TrainingStats }) {
  const items = [
    { label: "Sessions", value: String(stats.sessions) },
    { label: "Graded", value: String(stats.graded) },
    { label: "Best", value: stats.bestScore === null ? "—" : String(stats.bestScore) },
  ];

  return (
    <View className="flex-row gap-3">
      {items.map((item) => (
        <View key={item.label} className="flex-1 gap-1 rounded border border-border bg-surface-200 p-3">
          <Text variant="eyebrow" className="text-ink-muted">
            {item.label}
          </Text>
          <Text variant="heading">{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
