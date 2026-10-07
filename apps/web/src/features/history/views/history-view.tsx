"use client";

import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { Text } from "@electrical-hero/core/shared/text";
import { TextLink } from "@/features/shell/components/text-link";
import { StatGrid } from "@/features/training/components/stat-grid";
import { TrainingHistoryList } from "@/features/training/components/training-history-list";

export function HistoryView() {
  const { history, isLoaded } = useTrainee();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-2">
        <TextLink href="/account" back>Back to your account</TextLink>
        <Text variant="eyebrow" className="text-ink-muted">
          Your track record
        </Text>
        <Text variant="display-l">Past Problems</Text>
        <Text className="text-ink-muted">
          Sessions started on this device. Open one to see the transcript and debrief.
        </Text>
      </div>
      {isLoaded && (
        <>
          <StatGrid stats={getTrainingStats(history)} />
          <TrainingHistoryList records={history} />
        </>
      )}
    </main>
  );
}
