import type { ProblemAttempt } from "@electrical-hero/shared";
import { formatPoints } from "@/lib/format";

export function HistorySummary({ attempts }: { attempts: ProblemAttempt[] }) {
  const solved = attempts.filter((a) => a.outcome === "solved").length;
  const points = attempts.reduce((sum, a) => sum + a.pointsEarned, 0);
  const answered = attempts.reduce((sum, a) => sum + a.questionsAnswered, 0);
  const correct = attempts.reduce((sum, a) => sum + a.correctAnswers, 0);
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  const stats = [
    { label: "Problems solved", value: `${solved} of ${attempts.length}` },
    { label: "Points from problems", value: formatPoints(points) },
    { label: "Answers right", value: `${accuracy}%` },
  ];

  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 rounded border border-border bg-surface-200 p-4">
          <dt className="text-ink-muted type-eyebrow">{stat.label}</dt>
          <dd className="text-ink type-heading">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
