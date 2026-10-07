import type { ProblemAttempt } from "@electrical-hero/shared";
import { Text } from "@electrical-hero/core/shared/text";
import { TextLink } from "@/features/shell/components/text-link";
import { AttemptList } from "../components/attempt-list";
import { HistorySummary } from "../components/history-summary";

export function HistoryView({ attempts }: { attempts: ProblemAttempt[] }) {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-2">
        <TextLink href="/account">Back to your account</TextLink>
        <Text variant="eyebrow" className="text-ink-muted">
          Your track record
        </Text>
        <Text variant="display-l">Problems you've overcome</Text>
      </div>
      <HistorySummary attempts={attempts} />
      <AttemptList attempts={attempts} emptyText="Start your first problem to build your history." />
    </main>
  );
}
