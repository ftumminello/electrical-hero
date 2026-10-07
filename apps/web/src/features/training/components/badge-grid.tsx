import type { TrainingStats } from "@electrical-hero/core/lib/training-stats";
import { cn } from "@electrical-hero/design-system/cn";
import { BadgeChip } from "@electrical-hero/core/shared/badge-chip";
import { Text } from "@electrical-hero/core/shared/text";

export function BadgeGrid({ badges }: { badges: TrainingStats["badges"] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <li
          key={badge.id}
          className={cn(
            "flex flex-col gap-2 rounded border p-4",
            badge.earned ? "border-border bg-surface-200" : "border-dashed border-border-strong bg-surface-100",
          )}
        >
          <div className={cn("flex flex-row items-center justify-between gap-2", !badge.earned && "opacity-50")}>
            <BadgeChip label={badge.name} icon={badge.icon} />
          </div>
          <Text variant="small" className="text-ink-muted">
            {badge.earned ? badge.description : `Locked · ${badge.description}`}
          </Text>
        </li>
      ))}
    </ul>
  );
}
