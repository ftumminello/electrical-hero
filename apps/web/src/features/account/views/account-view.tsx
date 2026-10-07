"use client";

import { Building2, MapPin } from "@electrical-hero/core/icons";
import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules, formatCityState } from "@electrical-hero/core/lib/training";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { Avatar } from "@electrical-hero/core/shared/avatar";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { ThemeToggle } from "@electrical-hero/core/shared/theme-toggle";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { TextLink } from "@/features/shell/components/text-link";
import { BadgeGrid } from "@/features/training/components/badge-grid";
import { StatGrid } from "@/features/training/components/stat-grid";
import { TraineeNameForm } from "@/features/training/components/trainee-name-form";
import { TrainingHistoryList } from "@/features/training/components/training-history-list";

export function AccountView() {
  const api = useApi();
  const trainee = useTrainee();
  const rules = useRequest("rules", () => api.getRules());
  const accounts = useRequest("accounts", () => api.listAccounts());

  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const currentSite = accounts.data?.find((a) => a.id === trainee.currentAccountId) ?? accounts.data?.[0] ?? null;
  const stats = getTrainingStats(trainee.history);
  const name = trainee.traineeName ?? "Trainee";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card as="section" className="gap-6 sm:flex-row sm:items-start">
          <Avatar name={name} size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Text variant="display-l">{name}</Text>
              <Text className="text-ink-muted">{companyName ?? "Electrician"}</Text>
            </div>
            <dl className="flex flex-row flex-wrap gap-x-8 gap-y-3">
              <div className="flex flex-col gap-1">
                <dt className="text-ink-muted type-eyebrow">Ranking points</dt>
                <dd className="text-ink type-heading">{stats.points}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-ink-muted type-eyebrow">Average score</dt>
                <dd className="text-ink type-heading">{stats.averageScore ?? "—"}</dd>
              </div>
            </dl>
            <TextLink href="/leaderboard">Company leaderboard</TextLink>
          </div>
        </Card>

        <Card as="section" className="gap-4">
          <Text as="h2" variant="eyebrow" className="text-ink-muted">
            Company
          </Text>
          <div className="flex flex-row items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-surface-inverse">
              <Building2 aria-hidden size={24} strokeWidth={2} className="text-voltage" />
            </span>
            <Text variant="heading" as="p">
              {companyName ?? "Your company"}
            </Text>
          </div>
          {currentSite && (
            <div className="flex flex-col gap-1">
              <Text as="h3" variant="label" className="text-ink-muted">
                Current job site
              </Text>
              <p className="flex flex-row items-center gap-2 text-ink type-body">
                <MapPin aria-hidden size={16} strokeWidth={2} className="shrink-0 text-steel" />
                {currentSite.name} · {formatCityState(currentSite.address)}
              </p>
              <TextLink href="/">Change job site</TextLink>
            </div>
          )}
        </Card>
      </div>

      <section aria-labelledby="badges-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="badges-heading"
          eyebrow={`${stats.badges.filter((b) => b.earned).length} of ${stats.badges.length} earned`}
          title="Badges"
        />
        <BadgeGrid badges={stats.badges} />
      </section>

      <section aria-labelledby="account-history-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="account-history-heading"
          eyebrow="Your track record"
          title="Problems you've overcome"
          action={trainee.history.length > 0 && <TextLink href="/history">See all</TextLink>}
        />
        <StatGrid stats={stats} />
        <TrainingHistoryList records={trainee.history.slice(0, 3)} />
      </section>

      <section aria-labelledby="settings-heading" className="flex flex-col gap-6">
        <SectionHeading id="settings-heading" title="Settings" />
        {trainee.isLoaded && <TraineeNameForm />}
        <div className="flex flex-col gap-2">
          <Text as="h3" variant="label">
            Appearance
          </Text>
          <ThemeToggle />
        </div>
      </section>
    </main>
  );
}
