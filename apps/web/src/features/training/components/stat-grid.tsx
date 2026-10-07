import type { TrainingStats } from "@electrical-hero/core/lib/training-stats";

export function StatGrid({ stats }: { stats: TrainingStats }) {
  const items = [
    { label: "Sessions", value: String(stats.sessions) },
    { label: "Graded", value: String(stats.graded) },
    { label: "Best score", value: stats.bestScore === null ? "—" : `${stats.bestScore} / 100` },
  ];

  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 rounded border border-border bg-surface-200 p-4">
          <dt className="text-ink-muted type-eyebrow">{item.label}</dt>
          <dd className="text-ink type-heading">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
