"use client";

import { useState } from "react";
import type { SafetyProtocolSummary } from "@electrical-hero/shared";
import { ChevronDown, ChevronUp, ExternalLink } from "@electrical-hero/core/icons";
import { useApi } from "@electrical-hero/core/providers/api-provider";
import { useRequest } from "@electrical-hero/core/hooks/use-request";
import { Card } from "@electrical-hero/core/shared/card";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { Text } from "@electrical-hero/core/shared/text";
import { ErrorState, LoadingState } from "@/features/shell/components/request-state";

type ProtocolCardProps = {
  protocol: SafetyProtocolSummary;
  /** Human label for the protocol's category, shown above the title. */
  categoryLabel: string;
  /** Names of the customer sites where this protocol applies. */
  siteNames: string[];
  totalSites: number;
};

/** OSHA text is public and live on eCFR; link straight to the official page. */
const ecfrUrl = (section: string) => `https://www.ecfr.gov/current/title-29/section-${section}`;

const Chip = ({ children }: { children: string }) => (
  <span className="rounded-sm border border-border-strong px-2 py-0.5 text-ink type-spec">{children}</span>
);

export function ProtocolCard({ protocol, categoryLabel, siteNames, totalSites }: ProtocolCardProps) {
  const api = useApi();
  const [open, setOpen] = useState(false);
  // Fetched only when opened: the list endpoint carries summaries, not the full procedure.
  const detail = useRequest(open ? `protocol:${protocol.id}` : null, () => api.getSafetyProtocol(protocol.id));
  const appliesEverywhere = protocol.appliesTo.length === 0;

  return (
    <Card as="article" className="gap-4">
      <div className="flex flex-col gap-1">
        <Text variant="eyebrow" className="text-ink-muted">
          {categoryLabel}
        </Text>
        <Text as="h3" variant="heading">
          {protocol.title}
        </Text>
        <Text variant="spec" className="text-ink-muted">
          {protocol.id}
        </Text>
      </div>

      <dl className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
        <dt className="text-ink-muted type-eyebrow">Applies at</dt>
        <dd className="text-ink type-small">
          {appliesEverywhere
            ? `Every site (${totalSites})`
            : siteNames.length
              ? siteNames.join(", ")
              : `No current site (needs ${protocol.appliesTo.join(", ")})`}
        </dd>

        <dt className="text-ink-muted type-eyebrow">Company rules</dt>
        <dd className="flex flex-row flex-wrap gap-1">
          {protocol.rules.map((rule) => (
            <Chip key={rule}>{rule}</Chip>
          ))}
        </dd>

        <dt className="text-ink-muted type-eyebrow">OSHA</dt>
        <dd className="flex flex-row flex-wrap gap-x-3 gap-y-1">
          {protocol.osha.map((section) => (
            <a
              key={section}
              href={ecfrUrl(section)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-row items-center gap-1 rounded-sm text-neutral-blue type-small hover:underline"
            >
              29 CFR {section}
              <ExternalLink aria-hidden size={14} strokeWidth={2} />
            </a>
          ))}
        </dd>

        {protocol.nfpa70e.length > 0 && (
          <>
            <dt className="text-ink-muted type-eyebrow">NFPA 70E</dt>
            <dd className="text-ink type-small">{protocol.nfpa70e.join(" · ")}</dd>
          </>
        )}
      </dl>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex min-h-11 flex-row items-center gap-2 self-start rounded-sm text-neutral-blue type-label hover:underline"
      >
        {open ? "Hide procedure" : "View procedure"}
        {open ? (
          <ChevronUp aria-hidden size={16} strokeWidth={2} />
        ) : (
          <ChevronDown aria-hidden size={16} strokeWidth={2} />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-border pt-4">
          {detail.isLoading && <LoadingState label="Loading procedure" />}
          {detail.error && <ErrorState message={detail.error} onRetry={detail.reload} />}
          {detail.data && <Markdown content={detail.data.markdown} baseHeadingLevel={4} />}
        </div>
      )}
    </Card>
  );
}
