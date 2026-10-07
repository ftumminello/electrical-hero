"use client";

import { useState } from "react";
import type { CodeSpec } from "@electrical-hero/shared";
import { ChevronDown, ChevronUp } from "@electrical-hero/core/icons";
import { Card } from "@electrical-hero/core/shared/card";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { Text } from "@electrical-hero/core/shared/text";

type CodeSpecCardProps = {
  spec: CodeSpec;
  /** Customer sites in this jurisdiction. */
  siteNames: string[];
};

/** The jurisdiction summary the AI uses for scenarios and debriefs (served from R2 by the API). */
export function CodeSpecCard({ spec, siteNames }: CodeSpecCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card as="article" className="gap-4">
      <div className="flex flex-col gap-1">
        <Text variant="eyebrow" className="text-ink-muted">
          {spec.id}
        </Text>
        <Text as="h3" variant="heading">
          {spec.name}
        </Text>
      </div>

      <dl className="grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
        <dt className="text-ink-muted type-eyebrow">In force</dt>
        <dd className="text-ink type-body">{spec.necEdition}</dd>
        {spec.nextEdition && (
          <>
            <dt className="text-ink-muted type-eyebrow">Next</dt>
            <dd className="text-ink type-body">{spec.nextEdition}</dd>
          </>
        )}
        <dt className="text-ink-muted type-eyebrow">Authority</dt>
        <dd className="text-ink type-small">{spec.authority}</dd>
        <dt className="text-ink-muted type-eyebrow">State amendments</dt>
        <dd className="text-ink type-small">{spec.amendments}</dd>
        <dt className="text-ink-muted type-eyebrow">Your sites</dt>
        <dd className="text-ink type-small">{siteNames.length ? siteNames.join(", ") : "None"}</dd>
      </dl>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex min-h-11 flex-row items-center gap-2 self-start rounded-sm text-neutral-blue type-label hover:underline"
      >
        {open ? "Hide full summary" : "View full summary"}
        {open ? (
          <ChevronUp aria-hidden size={16} strokeWidth={2} />
        ) : (
          <ChevronDown aria-hidden size={16} strokeWidth={2} />
        )}
      </button>
      {open && (
        <div className="border-t border-border pt-4">
          <Markdown content={spec.markdown} baseHeadingLevel={4} />
        </div>
      )}
    </Card>
  );
}
