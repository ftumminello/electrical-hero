import { View } from "react-native";
import { useHealth } from "@electrical-hero/core/hooks/use-health";
import { Button } from "@electrical-hero/core/shared/button";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { API_URL } from "../../../lib/api";

const HEALTH_URL = `${API_URL}/health`;

export function ServerStatusCard() {
  const { status, recheck } = useHealth(HEALTH_URL);

  return (
    <Card>
      <Text variant="eyebrow" className="text-ink-muted">
        System check
      </Text>
      <Text variant="heading">API server</Text>
      <Text variant="spec" className="text-ink-muted">
        GET {HEALTH_URL}
      </Text>
      {status === "checking" && <StatusBadge status="pending" label="Checking" />}
      {status === "ok" && <StatusBadge status="success" label="Connected" />}
      {status === "unreachable" && (
        <View className="gap-2">
          <StatusBadge status="error" label="Unreachable" />
          <Text variant="small" className="text-ink-muted">
            Start the server with pnpm dev:server. On a physical device, set EXPO_PUBLIC_API_URL to your machine&apos;s
            LAN IP.
          </Text>
        </View>
      )}
      <Button variant="secondary" label="Check again" isPending={status === "checking"} onPress={recheck} />
    </Card>
  );
}
