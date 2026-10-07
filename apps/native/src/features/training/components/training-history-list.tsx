import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { cn } from "@electrical-hero/design-system/cn";
import { ChevronRight } from "@electrical-hero/core/icons";
import { formatDate, isPassing } from "@electrical-hero/core/lib/training";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import type { TrainingRecord } from "@electrical-hero/core/providers/trainee-provider";
import { DifficultyBadge } from "@electrical-hero/core/shared/difficulty-badge";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";

type TrainingHistoryListProps = {
  records: TrainingRecord[];
  emptyText?: string;
};

export function TrainingHistoryList({
  records,
  emptyText = "Start your first problem to build your history.",
}: TrainingHistoryListProps) {
  const router = useRouter();
  const { colors } = useTheme();

  if (records.length === 0) return <Text className="text-ink-muted">{emptyText}</Text>;

  return (
    <View className="overflow-hidden rounded border border-border bg-surface-200">
      {records.map((record, i) => (
        <Pressable
          key={record.sessionId}
          accessibilityRole="button"
          onPress={() => router.push(`/session/${record.sessionId}`)}
          className={cn("flex-row items-center gap-3 p-4 active:bg-surface-300", i > 0 && "border-t border-border")}
        >
          <View className="flex-1 gap-1">
            <Text className="font-semibold">{record.title}</Text>
            <Text variant="small" className="text-ink-muted">
              {record.accountName} · {formatDate(record.startedAt)}
            </Text>
            <View className="flex-row flex-wrap items-center gap-2">
              {record.difficulty && <DifficultyBadge difficulty={record.difficulty} />}
              {record.grade ? (
                <>
                  <StatusBadge
                    status={isPassing(record.grade.score) ? "success" : "error"}
                    label={isPassing(record.grade.score) ? "Passed" : "Needs work"}
                  />
                  <Text variant="spec">{Math.round(record.grade.score)} / 100</Text>
                </>
              ) : (
                <Text variant="label" className="text-ink-muted">
                  Not graded yet
                </Text>
              )}
            </View>
          </View>
          <ChevronRight size={16} strokeWidth={2} color={colors.steel} />
        </Pressable>
      ))}
    </View>
  );
}
