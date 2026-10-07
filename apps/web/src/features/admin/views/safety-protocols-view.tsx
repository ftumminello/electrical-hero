"use client";

import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Text } from "@electrical-hero/core/shared/text";
import { ErrorState, LoadingState } from "@/features/shell/components/request-state";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { ProtocolCard } from "../components/protocol-card";

const CATEGORY_LABELS: Record<string, string> = {
  isolation: "Isolation & lockout",
  "energized-work": "Energized work",
  ppe: "PPE & arc flash",
  permits: "Permits",
  switching: "Switching",
  "emergency-systems": "Emergency systems",
  "stored-energy": "Stored energy",
  ev: "EV charging",
  healthcare: "Healthcare",
  "wet-locations": "Wet locations",
  "fire-protection": "Fire protection",
};
const categoryLabel = (category: string) => CATEGORY_LABELS[category] ?? category.replace(/-/g, " ");

/** Read-only admin view of the company's safety protocols, as scenarios and debriefs use them. */
export function SafetyProtocolsView() {
  const api = useApi();
  const protocols = useRequest("safety-protocols", () => api.listSafetyProtocols());
  const accounts = useRequest("accounts", () => api.listAccounts());
  const rules = useRequest("rules", () => api.getRules());

  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const sites = accounts.data ?? [];
  const list = protocols.data ?? [];
  // Two balanced groups read better than one section per category (most categories hold a single protocol).
  const groups = [
    { id: "every-site", title: "Required at every site", items: list.filter((p) => p.appliesTo.length === 0) },
    { id: "site-equipment", title: "Depends on site equipment", items: list.filter((p) => p.appliesTo.length > 0) },
  ];
  const everywhere = groups[0].items.length;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-3">
        <Text variant="eyebrow" className="text-ink-muted">
          {companyName ?? "Your company"} · Admin
        </Text>
        <Text variant="display-l">Safety protocols</Text>
        <Text className="text-ink-muted">
          The procedures your electricians must follow on the job. Training scenarios are built on them and debriefs
          grade against them.
        </Text>
        {protocols.data && (
          <Text variant="spec" className="text-ink">
            {list.length} protocols · {everywhere} apply at every site · {list.length - everywhere} depend on site
            equipment
          </Text>
        )}
        <Callout tone="notice" label="Read-only">
          Protocols are maintained as Markdown files in Cloudflare R2. Editing from this page isn't built yet.
        </Callout>
      </div>

      {protocols.isLoading && <LoadingState label="Loading safety protocols" />}
      {protocols.error && <ErrorState message={protocols.error} onRetry={protocols.reload} />}

      {protocols.data &&
        groups.map((group) => (
          <section key={group.id} aria-labelledby={group.id} className="flex flex-col gap-4">
            <SectionHeading id={group.id} eyebrow={`${group.items.length} protocols`} title={group.title} />
            <div className="grid gap-4 lg:grid-cols-2">
              {group.items.map((protocol) => (
                <ProtocolCard
                  key={protocol.id}
                  protocol={protocol}
                  categoryLabel={categoryLabel(protocol.category)}
                  totalSites={sites.length}
                  siteNames={sites
                    .filter((site) => protocol.appliesTo.every((f) => site.features.includes(f)))
                    .map((site) => site.name)}
                />
              ))}
            </div>
          </section>
        ))}
    </main>
  );
}
