import { View } from "react-native";
import { Building2, MapPin } from "@electrical-hero/core/icons";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules, formatCityState } from "@electrical-hero/core/lib/training";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { Avatar } from "@electrical-hero/core/shared/avatar";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { ThemeToggle } from "@electrical-hero/core/shared/theme-toggle";
import { Screen } from "@features/shell/components/screen";
import { SectionHeading } from "@features/shell/components/section-heading";
import { TextLink } from "@features/shell/components/text-link";
import { BadgeGrid } from "@features/training/components/badge-grid";
import { StatGrid } from "@features/training/components/stat-grid";
import { TraineeNameForm } from "@features/training/components/trainee-name-form";
import { TrainingHistoryList } from "@features/training/components/training-history-list";

export function AccountView() {
  const api = useApi();
  const { colors } = useTheme();
  const trainee = useTrainee();
  const rules = useRequest("rules", () => api.getRules());
  const accounts = useRequest("accounts", () => api.listAccounts());

  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const currentSite = accounts.data?.find((a) => a.id === trainee.currentAccountId) ?? accounts.data?.[0] ?? null;
  const stats = getTrainingStats(trainee.history);
  const name = trainee.traineeName ?? "Trainee";

  return (
    <Screen>
      <Card className="gap-4">
        <View className="flex-row items-center gap-4">
          <Avatar name={name} size="lg" />
          <View className="flex-1 gap-1">
            <Text variant="display-l">{name}</Text>
            <Text className="text-ink-muted">{companyName ?? "Electrician"}</Text>
          </View>
        </View>
        <View className="flex-row gap-8">
          <View className="gap-1">
            <Text variant="eyebrow" className="text-ink-muted">
              Ranking points
            </Text>
            <Text variant="heading">{stats.points}</Text>
          </View>
          <View className="gap-1">
            <Text variant="eyebrow" className="text-ink-muted">
              Average score
            </Text>
            <Text variant="heading">{stats.averageScore ?? "—"}</Text>
          </View>
        </View>
        <TextLink href="/leaderboard">Company leaderboard</TextLink>
      </Card>

      <Card className="gap-4">
        <Text variant="eyebrow" className="text-ink-muted">
          Company
        </Text>
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded bg-surface-inverse">
            <Building2 size={24} strokeWidth={2} color={colors.voltage} />
          </View>
          <Text variant="heading" className="flex-1">
            {companyName ?? "Your company"}
          </Text>
        </View>
        {currentSite && (
          <View className="gap-1">
            <Text variant="label" className="text-ink-muted">
              Current job site
            </Text>
            <View className="flex-row items-center gap-2">
              <MapPin size={16} strokeWidth={2} color={colors.steel} />
              <Text className="flex-1">
                {currentSite.name} · {formatCityState(currentSite.address)}
              </Text>
            </View>
            <TextLink href="/">Change job site</TextLink>
          </View>
        )}
      </Card>

      <View className="gap-4">
        <SectionHeading
          eyebrow={`${stats.badges.filter((b) => b.earned).length} of ${stats.badges.length} earned`}
          title="Badges"
        />
        <BadgeGrid badges={stats.badges} />
      </View>

      <View className="gap-4">
        <SectionHeading
          eyebrow="Your track record"
          title="Past Problems"
          action={trainee.history.length > 0 && <TextLink href="/history">See all</TextLink>}
        />
        <StatGrid stats={stats} />
        <TrainingHistoryList records={trainee.history.slice(0, 3)} />
      </View>

      <View className="gap-6">
        <SectionHeading title="Settings" />
        {trainee.isLoaded && <TraineeNameForm />}
        <View className="gap-2">
          <Text variant="label">Appearance</Text>
          <ThemeToggle />
        </View>
      </View>
    </Screen>
  );
}
