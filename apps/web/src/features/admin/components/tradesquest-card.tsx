"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "@electrical-hero/core/icons";
import { Button } from "@electrical-hero/core/shared/button";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import type { AdminSettings } from "../hooks/use-admin-settings";
import { TRADESQUEST_BASE_URL, maskKey } from "../lib/integrations";

type TradesQuestCardProps = {
  tradesQuest: AdminSettings["tradesQuest"];
  onSave: (apiKey: string) => void;
  onRemove: () => void;
  onTest: () => void;
};

export function TradesQuestCard({ tradesQuest, onSave, onRemove, onTest }: TradesQuestCardProps) {
  const [value, setValue] = useState("");
  const [reveal, setReveal] = useState(false);
  const trimmed = value.trim();
  const { apiKey, lastTest } = tradesQuest;

  return (
    <Card as="section" className="gap-5">
      <div className="flex flex-row items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-surface-inverse">
          <KeyRound aria-hidden size={22} strokeWidth={2} className="text-voltage" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Text as="h3" variant="heading">
            TradesQuest API
          </Text>
          <Text variant="small" className="text-ink-muted">
            Certification and training records
          </Text>
        </div>
        {apiKey ? <StatusBadge status="pending" label="Awaiting launch" /> : null}
      </div>

      <dl className="flex flex-col gap-1">
        <dt className="text-ink-muted type-eyebrow">Base URL</dt>
        <dd className="text-ink type-spec">{TRADESQUEST_BASE_URL}</dd>
      </dl>

      <Callout tone="notice" label="Not live yet">
        TradesQuest will serve its API from {TRADESQUEST_BASE_URL}. Until it launches, your key stays in this browser and
        is never sent anywhere.
      </Callout>

      {apiKey ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Text as="h4" variant="label" className="text-ink-muted">
              Saved key
            </Text>
            <p className="text-ink type-spec">{maskKey(apiKey)}</p>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Button variant="secondary" label="Test connection" onPress={onTest} />
            <Button variant="secondary" label="Remove key" onPress={onRemove} />
          </div>
          {lastTest && <StatusBadge status={lastTest.ok ? "pending" : "error"} label={lastTest.message} />}
        </div>
      ) : (
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (trimmed) {
              onSave(trimmed);
              setValue("");
              setReveal(false);
            }
          }}
        >
          <label htmlFor="tradesquest-key" className="text-ink type-label">
            API key
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative w-full sm:max-w-md">
              <input
                id="tradesquest-key"
                type={reveal ? "text" : "password"}
                value={value}
                autoComplete="off"
                spellCheck={false}
                placeholder="Paste your TradesQuest API key"
                onChange={(event) => setValue(event.target.value)}
                className="min-h-11 w-full rounded-sm border border-border-strong bg-surface-200 py-0 pl-3 pr-11 text-ink type-body placeholder:text-ink-muted"
              />
              <button
                type="button"
                onClick={() => setReveal((r) => !r)}
                aria-label={reveal ? "Hide key" : "Show key"}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-sm text-ink-muted hover:text-ink"
              >
                {reveal ? <EyeOff aria-hidden size={18} strokeWidth={2} /> : <Eye aria-hidden size={18} strokeWidth={2} />}
              </button>
            </div>
            <Button type="submit" label="Save key" disabled={!trimmed} />
          </div>
          <p className="text-ink-muted type-small">Stored in this browser only (demo).</p>
        </form>
      )}
    </Card>
  );
}
