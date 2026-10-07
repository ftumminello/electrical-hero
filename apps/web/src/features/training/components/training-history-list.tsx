import Link from "next/link";
import type { TrainingRecord } from "@electrical-hero/core/providers/trainee-provider";
import { ChevronRight } from "@electrical-hero/core/icons";
import { DifficultyBadge } from "@electrical-hero/core/shared/difficulty-badge";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { formatDate, isPassing } from "@electrical-hero/core/lib/training";

type TrainingHistoryListProps = {
  records: TrainingRecord[];
  emptyText?: string;
};

export function TrainingHistoryList({
  records,
  emptyText = "Start your first problem to build your history.",
}: TrainingHistoryListProps) {
  if (records.length === 0) return <Text className="text-ink-muted">{emptyText}</Text>;

  return (
    <ul className="flex flex-col divide-y divide-border rounded border border-border bg-surface-200">
      {records.map((record) => (
        <li key={record.sessionId}>
          <Link
            href={`/session/${record.sessionId}`}
            className="flex flex-col gap-2 rounded p-4 hover:bg-surface-300 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <Text as="h3" className="font-semibold">
                {record.title}
              </Text>
              <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
                <Text as="span" variant="small" className="text-ink-muted">
                  {record.accountName} · <time dateTime={record.startedAt}>{formatDate(record.startedAt)}</time>
                </Text>
                {record.difficulty && <DifficultyBadge difficulty={record.difficulty} />}
              </div>
            </div>
            <div className="flex shrink-0 flex-row items-center gap-3">
              {record.grade ? (
                <>
                  <StatusBadge
                    status={isPassing(record.grade.score) ? "success" : "error"}
                    label={isPassing(record.grade.score) ? "Passed" : "Needs work"}
                  />
                  <Text variant="spec">{Math.round(record.grade.score)} / 100</Text>
                </>
              ) : (
                <Text as="span" variant="label" className="text-ink-muted">
                  Not graded yet
                </Text>
              )}
              <ChevronRight aria-hidden size={16} strokeWidth={2} className="text-steel" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
