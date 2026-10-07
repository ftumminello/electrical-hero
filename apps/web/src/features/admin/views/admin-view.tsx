"use client";

import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Text } from "@electrical-hero/core/shared/text";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { AdminHeader } from "../components/admin-header";
import { IntegrationCard } from "../components/integration-card";
import { TradesQuestCard } from "../components/tradesquest-card";
import { useAdminSettings } from "../hooks/use-admin-settings";
import { INTEGRATIONS } from "../lib/integrations";

/** Mock admin: simulated connections to contractor software and the future TradesQuest API. */
export function AdminView() {
  const api = useApi();
  const accounts = useRequest("accounts", () => api.listAccounts());
  const rules = useRequest("rules", () => api.getRules());
  const admin = useAdminSettings();

  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  // A "connected" vendor reports matching the sites the API already holds, so the demo numbers line up.
  const siteCount = accounts.data?.length ?? 0;
  const connectedCount = Object.values(admin.settings.integrations).filter((s) => s?.status === "connected").length;

  return (
    <>
      <AdminHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-3">
          <Text variant="eyebrow" className="text-ink-muted">
            {companyName ?? "Your company"} · Admin
          </Text>
          <Text variant="display-l">Integrations</Text>
          <Text className="text-ink-muted">
            Connect Electrical Hero to the software your company already runs on, so customer sites, technicians and
            work orders flow in without retyping.
          </Text>
          <Callout tone="notice" label="Demo">
            Connections on this page are simulated. Nothing is sent to these vendors, and settings are saved in this
            browser only.
          </Callout>
        </div>

        <section aria-labelledby="software-heading" className="flex flex-col gap-4">
          <SectionHeading
            id="software-heading"
            eyebrow={`${connectedCount} of ${INTEGRATIONS.length} connected`}
            title="Contractor software"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                state={admin.isLoaded ? admin.settings.integrations[integration.id] : undefined}
                onConnect={() => admin.connect(integration.id, siteCount)}
                onSync={() => admin.sync(integration.id, siteCount)}
                onDisconnect={() => admin.disconnect(integration.id)}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="tradesquest-heading" className="flex flex-col gap-4">
          <SectionHeading id="tradesquest-heading" eyebrow="Coming soon" title="TradesQuest" />
          <TradesQuestCard
            tradesQuest={admin.settings.tradesQuest}
            onSave={admin.saveKey}
            onRemove={admin.removeKey}
            onTest={admin.testKey}
          />
        </section>
      </main>
    </>
  );
}
