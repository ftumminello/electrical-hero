import { APP_NAME } from "@electrical-hero/shared";
import { Text } from "@electrical-hero/core/shared/text";

export function HeroBand() {
  return (
    <header className="bg-surface-inverse">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-12 md:px-6">
        <Text variant="eyebrow" className="text-voltage">
          Electrician training
        </Text>
        <Text variant="display-xl" className="text-ink-inverse">
          {APP_NAME}
        </Text>
        <Text variant="body-l" className="text-ink-inverse">
          Train like a pro. Work safe. Get licensed.
        </Text>
      </div>
    </header>
  );
}
