"use client";

import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { HazardStripes } from "@electrical-hero/core/shared/hazard-stripes";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { ErrorState, LoadingState } from "@/features/shell/components/request-state";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { TextLink } from "@/features/shell/components/text-link";
import { TraineeNameForm } from "@/features/training/components/trainee-name-form";
import { TrainingHistoryList } from "@/features/training/components/training-history-list";
import { SitePicker } from "../components/site-picker";
import { StartTrainingCard } from "../components/start-training-card";
import { DemoQrCode } from "../components/demo-qr-code";

export function HomeView() {
  const api = useApi();
  const trainee = useTrainee();
  const accounts = useRequest("accounts", () => api.listAccounts());
  const rules = useRequest("rules", () => api.getRules());

  const selectedId =
    accounts.data?.find((a) => a.id === trainee.currentAccountId)?.id ?? accounts.data?.[0]?.id ?? null;
  const account = useRequest(selectedId && `account:${selectedId}`, () => api.getAccount(selectedId!));

  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const stats = getTrainingStats(trainee.history);
  const firstName = trainee.traineeName?.split(" ")[0];

  return (
    <>
      <section className="relative bg-surface-inverse">
        <DemoQrCode />
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-12 md:px-6">
          <Text variant="eyebrow" className="text-voltage">
            {companyName ?? "Field training"}
          </Text>
          <Text variant="display-xl" className="text-ink-inverse">
            {firstName ? `Ready for the next call, ${firstName}?` : "Train on real job sites"}
          </Text>
          <Text variant="body-l" className="text-ink-inverse">
            Work a live service call at one of your company's customer sites, then get graded against the company's own
            rules.
          </Text>
          {stats.graded > 0 && (
            <Text variant="spec" className="text-ink-inverse">
              {stats.points} pts · average score {stats.averageScore} · {stats.graded} graded
            </Text>
          )}
        </div>
      </section>
      <HazardStripes />

      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
        {trainee.isLoaded && !trainee.traineeName && (
          <Card as="section" className="gap-4">
            <SectionHeading eyebrow="First things first" title="Who's training?" />
            <TraineeNameForm submitLabel="Start training" />
          </Card>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
          <section aria-labelledby="sites-heading" className="flex flex-col gap-4">
            <SectionHeading id="sites-heading" eyebrow="Where you're working" title="Job site" />
            {accounts.error && <ErrorState message={accounts.error} onRetry={accounts.reload} />}
            {accounts.isLoading && <LoadingState label="Loading job sites" />}
            {accounts.data && selectedId && (
              <SitePicker accounts={accounts.data} selectedId={selectedId} onSelect={trainee.setCurrentAccountId} />
            )}
          </section>

          <div className="flex flex-col gap-4">
            {account.error && <ErrorState message={account.error} onRetry={account.reload} />}
            {account.isLoading && <LoadingState label="Loading site details" />}
            {account.data && trainee.traineeName && <StartTrainingCard account={account.data} />}
            {account.data && trainee.isLoaded && !trainee.traineeName && (
              <Text className="text-ink-muted">Add your name above to start a problem at {account.data.name}.</Text>
            )}
          </div>
        </div>

        <section aria-labelledby="history-heading" className="flex flex-col gap-4">
          <SectionHeading
            id="history-heading"
            eyebrow="Your track record"
            title="Problems you've overcome"
            action={trainee.history.length > 0 && <TextLink href="/history">See all</TextLink>}
          />
          <TrainingHistoryList records={trainee.history.slice(0, 3)} />
        </section>
      </main>
    </>
  );
}
