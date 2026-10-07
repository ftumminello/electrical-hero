import { APP_NAME } from "@electrical-hero/shared";
import { ExternalLink } from "@electrical-hero/core/icons";
import { Text } from "@electrical-hero/core/shared/text";

/** The trainee site the admin area links back to (it lives on another host). */
const TRAINING_URL = process.env.NEXT_PUBLIC_TRAINING_URL ?? "https://electrical-hero.com";

/** Admin replaces the trainee header: different audience, and its nav would point at the wrong host. */
export function AdminHeader() {
  return (
    <header className="bg-surface-inverse">
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex flex-row items-center gap-3">
          <Text as="span" variant="heading" className="uppercase text-ink-inverse">
            {APP_NAME}
          </Text>
          <span className="rounded-sm bg-voltage px-2 py-0.5 text-ink-on-voltage type-eyebrow">Admin</span>
        </div>
        <a
          href={TRAINING_URL}
          className="flex min-h-11 flex-row items-center gap-2 rounded px-3 text-ink-inverse type-label hover:bg-ink-inverse/10"
        >
          Training site
          <ExternalLink aria-hidden size={16} strokeWidth={2} />
        </a>
      </div>
    </header>
  );
}
