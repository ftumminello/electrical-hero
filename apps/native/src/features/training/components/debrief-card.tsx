import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import type { Debrief } from "@electrical-hero/shared";
import { Check, X } from "@electrical-hero/core/icons";
import { isPassing } from "@electrical-hero/core/lib/training";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";

function PointList({ title, items, positive }: { title: string; items: string[]; positive: boolean }) {
  const { colors } = useTheme();
  if (items.length === 0) return null;
  const Icon = positive ? Check : X;

  return (
    <View className="gap-2">
      <Text variant="eyebrow" className="text-ink-muted">
        {title}
      </Text>
      {items.map((item, i) => (
        <View key={i} className="flex-row items-start gap-2">
          <Icon
            size={16}
            strokeWidth={2}
            color={positive ? colors.ground : colors["line-red"]}
            style={{ marginTop: 4 }}
          />
          <Text className="flex-1">{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function DebriefCard({ debrief }: { debrief: Debrief }) {
  const passed = isPassing(debrief.score);

  return (
    <Card className="gap-6">
      <View className="gap-3">
        <StatusBadge status={passed ? "success" : "error"} label={passed ? "Passed" : "Needs work"} />
        <View className="flex-row items-baseline gap-2">
          <Text variant="display-xl">{Math.round(debrief.score)}</Text>
          <Text variant="spec" className="text-ink-muted">
            / 100
          </Text>
        </View>
        <Text variant="body-l">{debrief.verdict}</Text>
      </View>

      <PointList title="What you did well" items={debrief.strengths} positive />
      <PointList title="What to work on" items={debrief.gaps} positive={false} />

      {debrief.ruleViolations.length > 0 && (
        <View className="gap-2">
          <Text variant="eyebrow" className="text-ink-muted">
            Company rules broken
          </Text>
          {debrief.ruleViolations.map((violation, i) => (
            <View key={i} className="gap-1">
              <Text variant="spec" className="text-line-red">
                {violation.ruleId}
              </Text>
              <Text className="text-ink-muted">“{violation.evidence}”</Text>
            </View>
          ))}
        </View>
      )}

      {debrief.rubric.length > 0 && (
        <View className="gap-2">
          <Text variant="eyebrow" className="text-ink-muted">
            Rubric · {debrief.rubric.filter((r) => r.met).length} of {debrief.rubric.length} met
          </Text>
          <View className="rounded border border-border">
            {debrief.rubric.map((item, i) => (
              <View key={i} className={cn("gap-1 p-3", i > 0 && "border-t border-border")}>
                <StatusBadge status={item.met ? "success" : "error"} label={item.met ? "Met" : "Missed"} />
                <Text className="font-semibold">{item.criterion}</Text>
                <Text variant="small" className="text-ink-muted">
                  {item.evidence}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Card>
  );
}
