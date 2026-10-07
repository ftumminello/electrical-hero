import { View } from "react-native";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { HeroBand } from "@features/shell/components/hero-band";
import { ErrorState, LoadingState } from "@features/shell/components/request-state";
import { Screen } from "@features/shell/components/screen";
import { SectionHeading } from "@features/shell/components/section-heading";
import { TextLink } from "@features/shell/components/text-link";
import { TraineeNameForm } from "@features/training/components/trainee-name-form";
import { TrainingHistoryList } from "@features/training/components/training-history-list";
import { SitePicker } from "../components/site-picker";
import { StartTrainingCard } from "../components/start-training-card";

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
    <Screen
      header={
        <HeroBand
          eyebrow={companyName ?? "Field training"}
          title={firstName ? `Ready for the next call, ${firstName}?` : "Train on real job sites"}
        >
          <Text variant="body-l" className="text-ink-inverse">
            Work a live service call at a customer site, then get graded against the company's own rules.
          </Text>
          {stats.graded > 0 && (
            <Text variant="spec" className="text-ink-inverse">
              {stats.points} pts · average {stats.averageScore} · {stats.graded} graded
            </Text>
          )}
        </HeroBand>
      }
    >
      {trainee.isLoaded && !trainee.traineeName && (
        <Card className="gap-4">
          <SectionHeading eyebrow="First things first" title="Who's training?" />
          <TraineeNameForm submitLabel="Start training" />
        </Card>
      )}

      <View className="gap-4">
        <SectionHeading eyebrow="Where you're working" title="Job site" />
        {accounts.error && <ErrorState message={accounts.error} onRetry={accounts.reload} />}
        {accounts.isLoading && <LoadingState label="Loading job sites" />}
        {accounts.data && selectedId && (
          <SitePicker accounts={accounts.data} selectedId={selectedId} onSelect={trainee.setCurrentAccountId} />
        )}
      </View>

      {account.error && <ErrorState message={account.error} onRetry={account.reload} />}
      {account.isLoading && <LoadingState label="Loading site details" />}
      {account.data && trainee.traineeName && <StartTrainingCard account={account.data} />}

      <View className="gap-4">
        <SectionHeading
          eyebrow="Your track record"
          title="Past Problems"
          action={trainee.history.length > 0 && <TextLink href="/history">See all</TextLink>}
        />
        <TrainingHistoryList records={trainee.history.slice(0, 3)} />
      </View>
    </Screen>
  );
}
