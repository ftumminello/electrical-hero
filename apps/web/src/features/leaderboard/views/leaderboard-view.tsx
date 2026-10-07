"use client";

import { Trophy } from "@electrical-hero/core/icons";
import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { Avatar } from "@electrical-hero/core/shared/avatar";
import { BadgeChip } from "@electrical-hero/core/shared/badge-chip";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Text } from "@electrical-hero/core/shared/text";
import { TextLink } from "@/features/shell/components/text-link";

export function LeaderboardView() {
  const api = useApi();
  const trainee = useTrainee();
  const rules = useRequest("rules", () => api.getRules());
  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const stats = getTrainingStats(trainee.history);
  const earned = stats.badges.filter((b) => b.earned);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-2">
        <TextLink href="/account">Back to your account</TextLink>
        <Text variant="eyebrow" className="text-ink-muted">
          {companyName ?? "Your company"}
        </Text>
        <Text variant="display-l">Company leaderboard</Text>
      </div>

      <Callout tone="notice" label="Coming soon">
        <Text>
          Company rankings need everyone's scores in one place. Right now scores are saved only on this device, so the
          leaderboard shows just you until the server shares them.
        </Text>
      </Callout>

      <ol className="flex flex-col rounded border border-border bg-surface-200">
        <li className="flex flex-row items-center gap-3 bg-voltage/15 p-4">
          <Text variant="spec" className="w-8 shrink-0 text-center">
            —
          </Text>
          <Avatar name={trainee.traineeName ?? "You"} size="sm" />
          <div className="flex min-w-0 flex-1 flex-col">
            <Text className="font-semibold" numberOfLines={1}>
              {trainee.traineeName ?? "You"} <span className="text-ink-muted type-small">(you)</span>
            </Text>
            <Text variant="small" className="text-ink-muted">
              {stats.graded} graded · average {stats.averageScore ?? "—"}
            </Text>
          </div>
          <div className="hidden flex-row gap-1 sm:flex">
            {earned.slice(0, 3).map((badge) => (
              <BadgeChip key={badge.id} label={badge.name} icon={badge.icon} size="sm" />
            ))}
          </div>
          <div className="flex flex-row items-center gap-1">
            <Trophy aria-hidden size={16} strokeWidth={2} className="text-copper-text" />
            <Text variant="spec">{stats.points} pts</Text>
          </div>
        </li>
      </ol>
    </main>
  );
}
