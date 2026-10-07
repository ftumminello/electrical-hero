import { Button } from "@electrical-hero/core/shared/button";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import type { IntegrationState } from "../hooks/use-admin-settings";
import type { Integration } from "../lib/integrations";

type IntegrationCardProps = {
  integration: Integration;
  state: IntegrationState | undefined;
  onConnect: () => void;
  onSync: () => void;
  onDisconnect: () => void;
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export function IntegrationCard({ integration, state, onConnect, onSync, onDisconnect }: IntegrationCardProps) {
  const { name, category, icon: Icon, syncs } = integration;
  const connected = state?.status === "connected";
  const connecting = state?.status === "connecting";

  return (
    <Card as="article" className="gap-4">
      <div className="flex flex-row items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-surface-inverse">
          <Icon aria-hidden size={22} strokeWidth={2} className="text-voltage" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Text as="h3" variant="heading">
            {name}
          </Text>
          <Text variant="small" className="text-ink-muted">
            {category}
          </Text>
        </div>
        {connected && <StatusBadge status="success" label="Connected" />}
        {connecting && <StatusBadge status="pending" label="Connecting…" />}
      </div>

      <ul className="flex flex-col gap-1">
        {syncs.map((line) => (
          <li key={line} className="text-ink-muted type-small">
            {line}
          </li>
        ))}
      </ul>

      {connected && state && (
        <p className="text-ink type-small">
          {state.matchedSites ?? 0} customer sites matched · last synced{" "}
          {state.lastSyncAt ? formatTime(state.lastSyncAt) : "—"}
        </p>
      )}

      <div className="mt-auto flex flex-row flex-wrap gap-2">
        {connected ? (
          <>
            <Button variant="secondary" label="Sync now" onPress={onSync} />
            <Button variant="secondary" label="Disconnect" onPress={onDisconnect} />
          </>
        ) : (
          <Button
            variant="secondary"
            label={connecting ? "Connecting" : `Connect ${name}`}
            isPending={connecting}
            onPress={onConnect}
          />
        )}
      </div>
    </Card>
  );
}
