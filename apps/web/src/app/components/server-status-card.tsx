"use client";

import { useHealth } from "@electrical-hero/core/hooks/use-health";
import { Button } from "@electrical-hero/core/shared/button";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";

const HEALTH_URL = "/api/health";

export function ServerStatusCard() {
  const { status, recheck } = useHealth(HEALTH_URL);

  return (
    <Card as="section">
      <Text variant="eyebrow" className="text-ink-muted">
        System check
      </Text>
      <Text variant="heading">API server</Text>
      <Text variant="spec" as="p" className="text-ink-muted">
        GET {HEALTH_URL}
      </Text>
      {status === "checking" && <StatusBadge status="pending" label="Checking" />}
      {status === "ok" && <StatusBadge status="success" label="Connected" />}
      {status === "unreachable" && (
        <>
          <StatusBadge status="error" label="Unreachable" />
          <Text variant="small" className="text-ink-muted">
            Start the server with <Text variant="spec">pnpm dev:server</Text>, then check again.
          </Text>
        </>
      )}
      <Button
        variant="secondary"
        label="Check again"
        isPending={status === "checking"}
        onPress={recheck}
        className="self-start"
      />
    </Card>
  );
}
