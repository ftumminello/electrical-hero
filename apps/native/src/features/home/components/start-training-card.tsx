import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import type { AccountDetail } from "@electrical-hero/shared";
import { useStartTraining } from "@electrical-hero/core/hooks/use-start-training";
import { formatAddress } from "@electrical-hero/core/lib/training";
import { Button } from "@electrical-hero/core/shared/button";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";

const PHASE_LABEL = {
  idle: "",
  generating: "Dispatch is writing your call (up to 40 s)",
  starting: "Opening the job",
};

export function StartTrainingCard({ account }: { account: AccountDetail }) {
  const router = useRouter();
  const { start, phase, isStarting, error } = useStartTraining();
  const [mode, setMode] = useState<"scenario" | "briefing">("scenario");

  const begin = async (next: "scenario" | "briefing") => {
    setMode(next);
    const sessionId = await start(account, next);
    if (sessionId) router.push(`/session/${sessionId}`);
  };

  return (
    <Card className="gap-4">
      <Text variant="eyebrow" className="text-ink-muted">
        Problem
      </Text>
      <Text variant="heading">{account.name}</Text>
      <Text variant="small" className="text-ink-muted">
        {formatAddress(account.address)} · {account.buildingType}
      </Text>
      <Text variant="spec">{account.serviceSummary}</Text>

      <Callout tone="danger" label="Know before you go">
        <Text>{account.criticalInfo}</Text>
      </Callout>

      <Text>
        You'll get a random service call at this site, written from its real site file and the company's work rules.
      </Text>

      {phase !== "generating" && (
        <View className="gap-3">
          <Button
            label="Start"
            isPending={isStarting && mode === "scenario"}
            disabled={isStarting}
            onPress={() => begin("scenario")}
          />
          <Button
            variant="secondary"
            label="Ask about this site first"
            isPending={isStarting && mode === "briefing"}
            disabled={isStarting}
            onPress={() => begin("briefing")}
          />
        </View>
      )}
      {isStarting && <StatusBadge status="pending" label={PHASE_LABEL[phase]} />}
      {error && (
        <View accessibilityRole="alert">
          <Text variant="small" className="text-line-red">
            {" "}
            {error}
          </Text>
        </View>
      )}
    </Card>
  );
}
