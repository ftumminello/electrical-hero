import { View } from "react-native";
import { Trophy } from "@electrical-hero/core/icons";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { Avatar } from "@electrical-hero/core/shared/avatar";
import { BadgeChip } from "@electrical-hero/core/shared/badge-chip";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Text } from "@electrical-hero/core/shared/text";
import { Screen } from "@features/shell/components/screen";
import { TextLink } from "@features/shell/components/text-link";

export function LeaderboardView() {
  const api = useApi();
  const { colors } = useTheme();
  const trainee = useTrainee();
  const rules = useRequest("rules", () => api.getRules());
  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const stats = getTrainingStats(trainee.history);
  const name = trainee.traineeName ?? "You";

  return (
    <Screen>
      <View className="gap-2">
        <Text variant="eyebrow" className="text-ink-muted">
          {companyName ?? "Your company"}
        </Text>
        <Text variant="display-l">Company leaderboard</Text>
      </View>

      <Callout tone="notice" label="Coming soon">
        <Text>
          Company rankings need everyone's scores in one place. Right now scores are saved only on this device, so the
          leaderboard shows just you until the server shares them.
        </Text>
      </Callout>

      <View className="flex-row items-center gap-3 rounded border border-border bg-voltage/15 p-4">
        <Avatar name={name} size="sm" />
        <View className="flex-1">
          <Text className="font-semibold" numberOfLines={1}>
            {name} (you)
          </Text>
          <Text variant="small" className="text-ink-muted">
            {stats.graded} graded · average {stats.averageScore ?? "—"}
          </Text>
          <View className="mt-1 flex-row gap-1">
            {stats.badges
              .filter((b) => b.earned)
              .slice(0, 3)
              .map((badge) => (
                <BadgeChip key={badge.id} label={badge.name} icon={badge.icon} size="sm" />
              ))}
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <Trophy size={16} strokeWidth={2} color={colors["copper-text"]} />
          <Text variant="spec">{stats.points} pts</Text>
        </View>
      </View>

      <TextLink href="/account" back>Back to your account</TextLink>
    </Screen>
  );
}
