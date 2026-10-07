"use client";

import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { companyNameFromRules } from "@electrical-hero/core/lib/training";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Text } from "@electrical-hero/core/shared/text";
import { ErrorState, LoadingState } from "@/features/shell/components/request-state";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { CodeSpecCard } from "../components/code-spec-card";
import { AddResourceForm, ResourceList } from "../components/code-resources";
import { useCodeResources } from "../hooks/use-code-resources";

/** Same rule as the API: a site's jurisdiction is us-<state>. */
const jurisdictionFor = (state: string) => `us-${state.trim().toLowerCase()}`;

/** Admin view of the electrical code in force at the company's sites, plus its own reference links. */
export function ElectricalCodesView() {
  const api = useApi();
  const accounts = useRequest("accounts", () => api.listAccounts());
  const rules = useRequest("rules", () => api.getRules());
  const resources = useCodeResources();

  const companyName = rules.data ? companyNameFromRules(rules.data.markdown) : null;
  const sites = accounts.data ?? [];
  const jurisdictions = [...new Set(sites.map((s) => jurisdictionFor(s.address.state)))].sort();
  const specs = useRequest(jurisdictions.length ? `code-specs:${jurisdictions.join(",")}` : null, () =>
    // A jurisdiction without a written summary yet simply drops out (the API answers 404).
    Promise.all(jurisdictions.map((id) => api.getCodeSpec(id).catch(() => null))),
  );

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-3">
        <Text variant="eyebrow" className="text-ink-muted">
          {companyName ?? "Your company"} · Admin
        </Text>
        <Text variant="display-l">Electrical codes</Text>
        <Text className="text-ink-muted">
          The code in force where your customer sites are, and the reference links your electricians should use.
        </Text>
      </div>

      <section aria-labelledby="jurisdictions-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="jurisdictions-heading"
          eyebrow="Used in scenarios and debriefs"
          title="Your jurisdictions"
        />
        {(accounts.isLoading || specs.isLoading) && <LoadingState label="Loading code summaries" />}
        {accounts.error && <ErrorState message={accounts.error} onRetry={accounts.reload} />}
        {specs.data?.map((spec, i) =>
          spec ? (
            <CodeSpecCard
              key={spec.id}
              spec={spec}
              siteNames={sites.filter((s) => jurisdictionFor(s.address.state) === spec.id).map((s) => s.name)}
            />
          ) : (
            <Callout key={jurisdictions[i]} tone="notice" label={jurisdictions[i]}>
              No code summary has been written for this jurisdiction yet.
            </Callout>
          ),
        )}
      </section>

      <section aria-labelledby="resources-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="resources-heading"
          eyebrow={`${resources.resources.length} links`}
          title="External code resources"
          action={
            <button
              type="button"
              onClick={resources.reset}
              className="min-h-11 rounded-sm px-2 text-neutral-blue type-label hover:underline"
            >
              Restore defaults
            </button>
          }
        />
        <Callout tone="notice" label="Demo">
          Resources are saved in this browser only, and the AI doesn't read them yet. Links open the source site in a
          new tab; NEC text stays on NFPA's site.
        </Callout>
        <ResourceList resources={resources.resources} onRemove={resources.remove} />
        <AddResourceForm onAdd={resources.add} />
      </section>
    </main>
  );
}
