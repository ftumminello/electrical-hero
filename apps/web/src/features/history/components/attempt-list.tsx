import type { ProblemAttempt } from "@electrical-hero/shared";
import { DifficultyBadge } from "@electrical-hero/core/shared/difficulty-badge";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { formatDate, formatPoints } from "@/lib/format";

type AttemptListProps = {
  attempts: ProblemAttempt[];
  /** Shown when there are no attempts yet. */
  emptyText?: string;
};

export function AttemptList({ attempts, emptyText = "No problems finished yet." }: AttemptListProps) {
  if (attempts.length === 0) {
    return <Text className="text-ink-muted">{emptyText}</Text>;
  }

  return (
    <ul className="flex flex-col divide-y divide-border rounded border border-border bg-surface-200">
      {attempts.map((attempt) => (
        <li key={attempt.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <Text as="h3" className="font-semibold">
              {attempt.problemTitle}
            </Text>
            <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
              <Text as="span" variant="small" className="text-ink-muted">
                <time dateTime={attempt.completedAt}>{formatDate(attempt.completedAt)}</time>
              </Text>
              <DifficultyBadge difficulty={attempt.difficulty} />
              <Text as="span" variant="small" className="text-ink-muted">
                {attempt.correctAnswers} of {attempt.questionsAnswered} correct
              </Text>
            </div>
          </div>
          <div className="flex shrink-0 flex-row items-center gap-3">
            {attempt.outcome === "solved" ? (
              <StatusBadge status="success" label="Solved" />
            ) : (
              <StatusBadge status="error" label="Not solved" />
            )}
            <Text variant="spec">+{formatPoints(attempt.pointsEarned)}</Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
