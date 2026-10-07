import { View } from "react-native";
import { getTrainingStats } from "@electrical-hero/core/lib/training-stats";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { Text } from "@electrical-hero/core/shared/text";
import { Screen } from "@features/shell/components/screen";
import { TextLink } from "@features/shell/components/text-link";
import { StatGrid } from "@features/training/components/stat-grid";
import { TrainingHistoryList } from "@features/training/components/training-history-list";

export function HistoryView() {
  const { history, isLoaded } = useTrainee();

  return (
    <Screen>
      <View className="gap-2">
        <TextLink href="/account">Back to your account</TextLink>
        <Text variant="eyebrow" className="text-ink-muted">
          Your track record
        </Text>
        <Text variant="display-l">Past Problems</Text>
        <Text className="text-ink-muted">
          Sessions started on this device. Open one to see the transcript and debrief.
        </Text>
      </View>
      {isLoaded && (
        <>
          <StatGrid stats={getTrainingStats(history)} />
          <TrainingHistoryList records={history} />
        </>
      )}
    </Screen>
  );
}
