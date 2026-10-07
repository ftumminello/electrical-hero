import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import type { TrainingStats } from "@electrical-hero/core/lib/training-stats";
import { BadgeChip } from "@electrical-hero/core/shared/badge-chip";
import { Text } from "@electrical-hero/core/shared/text";

export function BadgeGrid({ badges }: { badges: TrainingStats["badges"] }) {
  return (
    <View className="gap-3">
      {badges.map((badge) => (
        <View
          key={badge.id}
          className={cn(
            "gap-2 rounded border p-4",
            badge.earned ? "border-border bg-surface-200" : "border-dashed border-border-strong bg-surface-100",
          )}
        >
          <View className={badge.earned ? undefined : "opacity-50"}>
            <BadgeChip label={badge.name} icon={badge.icon} />
          </View>
          <Text variant="small" className="text-ink-muted">
            {badge.earned ? badge.description : `Locked · ${badge.description}`}
          </Text>
        </View>
      ))}
    </View>
  );
}
