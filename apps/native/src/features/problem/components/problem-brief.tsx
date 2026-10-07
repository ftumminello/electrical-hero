import { useState } from "react";
import { Pressable, View } from "react-native";
import type { AccountDetail, ScenarioPublic, ScenarioTemplateSummary, SessionMode } from "@electrical-hero/shared";
import { BookOpen, ChevronDown, ChevronRight, MapPin, Wrench } from "@electrical-hero/core/icons";
import { formatAddress } from "@electrical-hero/core/lib/training";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Card } from "@electrical-hero/core/shared/card";
import { DifficultyBadge } from "@electrical-hero/core/shared/difficulty-badge";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { Text } from "@electrical-hero/core/shared/text";

type ProblemBriefProps = {
  mode: SessionMode;
  account: AccountDetail | null;
  scenario: ScenarioPublic | null;
  template: ScenarioTemplateSummary | null;
};

const humanize = (slug: string) => slug.replace(/-/g, " ");

export function ProblemBrief({ mode, account, scenario, template }: ProblemBriefProps) {
  const { colors } = useTheme();
  const [showSiteFile, setShowSiteFile] = useState(false);
  const title = scenario?.title ?? (account ? `Site briefing: ${account.name}` : "Site briefing");

  return (
    <View className="min-w-0 gap-6">
      <View className="gap-3">
        {account && (
          <View className="flex-row items-center gap-2">
            <MapPin size={16} strokeWidth={2} color={colors["ink-muted"]} />
            <Text variant="eyebrow" className="min-w-0 flex-1 text-ink-muted">
              {account.name}
            </Text>
          </View>
        )}
        <Text variant="display-l">{title}</Text>
        {scenario && <DifficultyBadge difficulty={scenario.difficulty} />}
        {account && (
          <Text variant="small" className="text-ink-muted">
            {formatAddress(account.address)}
          </Text>
        )}
      </View>

      {account && (
        <Callout tone="danger" label="Know before you go">
          <Text>{account.criticalInfo}</Text>
        </Callout>
      )}

      {mode === "scenario" && scenario ? (
        <Card className="gap-2">
          <Text variant="eyebrow" className="text-ink-muted">
            The call
          </Text>
          <Text variant="body-l">{scenario.briefing}</Text>
        </Card>
      ) : (
        <Text variant="body-l">
          Ask the account lead anything before you head out: hazards, where to isolate, access, and which company rules
          apply here.
        </Text>
      )}

      {template && (
        <Card className="gap-4">
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <BookOpen size={16} strokeWidth={2} color={colors.steel} />
              <Text variant="label">Company rules in play</Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {template.rules.map((rule) => (
                <Text key={rule} variant="spec">
                  {rule}
                </Text>
              ))}
            </View>
          </View>
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Wrench size={16} strokeWidth={2} color={colors.steel} />
              <Text variant="label">Skills tested</Text>
            </View>
            <Text className="capitalize">{template.skills.map(humanize).join(" · ")}</Text>
          </View>
        </Card>
      )}

      {account && (
        <View className="rounded border border-border bg-surface-200">
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: showSiteFile }}
            onPress={() => setShowSiteFile((open) => !open)}
            className="min-h-11 flex-row items-center justify-between gap-2 px-4 py-3"
          >
            <Text variant="label" className="min-w-0 flex-1">
              Site file: equipment, panels and safety notes
            </Text>
            {showSiteFile ? (
              <ChevronDown size={16} strokeWidth={2} color={colors.steel} />
            ) : (
              <ChevronRight size={16} strokeWidth={2} color={colors.steel} />
            )}
          </Pressable>
          {showSiteFile && (
            <View className="gap-4 border-t border-border p-4">
              {account.siteContact.name && (
                <Text variant="small">
                  {account.siteContact.name}
                  {account.siteContact.phone ? ` · ${account.siteContact.phone}` : ""}
                </Text>
              )}
              <Markdown content={account.configMarkdown} />
            </View>
          )}
        </View>
      )}
    </View>
  );
}
