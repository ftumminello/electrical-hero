"use client";

import type { AccountSummary } from "@electrical-hero/shared";
import { cn } from "@electrical-hero/design-system/cn";
import { Building2, CircleCheck } from "@electrical-hero/core/icons";
import { Text } from "@electrical-hero/core/shared/text";
import { formatCityState } from "@electrical-hero/core/lib/training";

type SitePickerProps = {
  accounts: AccountSummary[];
  selectedId: string;
  disabled?: boolean;
  onSelect: (accountId: string) => void;
};

/** The company's customer sites; the chosen one decides which problems come up. */
export function SitePicker({ accounts, selectedId, disabled, onSelect }: SitePickerProps) {
  return (
    <fieldset disabled={disabled} className="flex flex-col gap-2">
      <legend className="sr-only">Job site</legend>
      {accounts.map((account) => {
        const selected = account.id === selectedId;
        return (
          <label
            key={account.id}
            className={cn(
              "flex cursor-pointer flex-row items-start gap-3 rounded border p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus-ring",
              selected ? "border-ink bg-surface-200" : "border-border bg-surface-200 hover:bg-surface-300",
            )}
          >
            <input
              type="radio"
              name="job-site"
              value={account.id}
              checked={selected}
              onChange={() => onSelect(account.id)}
              className="sr-only"
            />
            {selected ? (
              <CircleCheck aria-hidden size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-ground" />
            ) : (
              <Building2 aria-hidden size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-steel" />
            )}
            <span className="flex min-w-0 flex-col gap-1">
              <Text as="span" className="font-semibold">
                {account.name}
              </Text>
              <Text as="span" variant="small" className="text-ink-muted">
                {formatCityState(account.address)} · {account.buildingType}
              </Text>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
