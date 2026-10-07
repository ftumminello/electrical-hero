"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AccountDetail } from "@electrical-hero/shared";
import { Button } from "@electrical-hero/core/shared/button";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { useStartTraining } from "@electrical-hero/core/hooks/use-start-training";
import { DISPATCH_VERBS, useCyclingText } from "@electrical-hero/core/hooks/use-cycling-text";
import { formatAddress } from "@electrical-hero/core/lib/training";

const PHASE_LABEL = {
  idle: "",
  starting: "Opening the job",
};

export function StartTrainingCard({ account }: { account: AccountDetail }) {
  const router = useRouter();
  const { start, phase, isStarting, error } = useStartTraining();
  const [mode, setMode] = useState<"scenario" | "briefing">("scenario");
  const dispatchVerb = useCyclingText(DISPATCH_VERBS, phase === "generating");

  const begin = async (next: "scenario" | "briefing") => {
    setMode(next);
    const sessionId = await start(account, next);
    if (sessionId) router.push(`/session/${sessionId}`);
  };

  return (
    <Card as="section" className="gap-4">
      <Text variant="eyebrow" className="text-ink-muted">
        Current scenario
      </Text>
      <Text variant="display-l" as="h2">
        {account.name}
      </Text>
      <Text className="text-ink-muted">
        {formatAddress(account.address)} · {account.buildingType}
      </Text>
      <Text variant="spec" as="p">
        {account.serviceSummary}
      </Text>

      <Callout tone="danger" label="Know before you go">
        <Text>{account.criticalInfo}</Text>
      </Callout>

      <Text variant="body-l">
        You'll get a random service call at this site, written from its real site file and the company's work rules. You
        won't know the cause until you find it.
      </Text>

      {!isStarting && (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            label="Start training"
            isPending={isStarting && mode === "scenario"}
            disabled={isStarting}
            onPress={() => begin("scenario")}
            className="w-full sm:w-auto"
          />
          <Button
            variant="secondary"
            label="Ask about this site first"
            isPending={isStarting && mode === "briefing"}
            disabled={isStarting}
            onPress={() => begin("briefing")}
            className="w-full sm:w-auto"
          />
        </div>
      )}
      <div aria-live="polite">
        {isStarting && (
          <StatusBadge
            status="pending"
            label={phase === "generating" ? `${dispatchVerb}… (up to 40 s)` : PHASE_LABEL[phase]}
          />
        )}
        {error && (
          <Text variant="small" className="text-line-red">
            <span role="alert">{error}</span>
          </Text>
        )}
      </div>
    </Card>
  );
}
