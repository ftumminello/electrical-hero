"use client";

import { useState, useTransition } from "react";
import type { JobSite } from "@electrical-hero/shared";
import { ChevronDown } from "@electrical-hero/core/icons";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { changeJobSite } from "@/lib/api/actions";

type JobSitePickerProps = {
  jobSites: JobSite[];
  currentJobSiteId: string;
};

export function JobSitePicker({ jobSites, currentJobSiteId }: JobSitePickerProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="job-site" className="text-ink type-label">
        Company job site
      </label>
      <div className="flex flex-row flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-auto">
          <select
            id="job-site"
            value={currentJobSiteId}
            disabled={isPending}
            aria-describedby="job-site-hint"
            onChange={(event) => {
              const jobSiteId = event.target.value;
              setError(null);
              startTransition(async () => {
                try {
                  await changeJobSite(jobSiteId);
                } catch {
                  setError("Couldn't change the job site. Try again.");
                }
              });
            }}
            className="min-h-11 w-full cursor-pointer appearance-none rounded-sm border border-border-strong bg-surface-200 py-2 pl-3 pr-10 text-ink type-body disabled:opacity-50 sm:w-80"
          >
            {jobSites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name} · {site.city}, {site.state} ({site.codeEdition})
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel"
          />
        </div>
        {isPending && <StatusBadge status="pending" label="Switching" />}
      </div>
      <p id="job-site-hint" className="text-ink-muted type-small">
        Problems follow the code edition adopted where the job site is.
      </p>
      {error && (
        <Text variant="small" className="text-line-red">
          <span role="alert">{error}</span>
        </Text>
      )}
    </div>
  );
}
