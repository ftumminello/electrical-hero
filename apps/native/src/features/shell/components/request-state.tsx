import { Button } from "@electrical-hero/core/shared/button";
import { Callout } from "@electrical-hero/core/shared/callout";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";

export function LoadingState({ label }: { label: string }) {
  return <StatusBadge status="pending" label={label} />;
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Callout tone="warning" label="Couldn't load">
      <Text>{message}</Text>
      {onRetry && <Button variant="secondary" label="Try again" onPress={onRetry} className="self-start" />}
    </Callout>
  );
}
