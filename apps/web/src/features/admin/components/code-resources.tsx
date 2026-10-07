"use client";

import { useState } from "react";
import { ExternalLink, Trash2 } from "@electrical-hero/core/icons";
import { Button } from "@electrical-hero/core/shared/button";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { RESOURCE_TYPES, parseResourceUrl, type CodeResource, type ResourceType } from "../lib/code-resources";

const INPUT =
  "min-h-11 w-full rounded-sm border border-border-strong bg-surface-200 px-3 text-ink type-body placeholder:text-ink-muted";

type AddResourceFormProps = { onAdd: (resource: Omit<CodeResource, "id" | "addedAt">) => void };

export function AddResourceForm({ onAdd }: AddResourceFormProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<ResourceType>("Code text");
  const [jurisdiction, setJurisdiction] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Card as="section" className="gap-4">
      <Text as="h3" variant="heading">
        Add a resource
      </Text>
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const parsed = parseResourceUrl(url);
          if (!name.trim()) return setError("Give the resource a name.");
          if (!parsed) return setError("Enter a full web address starting with https://");
          onAdd({
            name: name.trim(),
            url: parsed.toString(),
            type,
            jurisdiction: jurisdiction.trim() || "—",
            notes: notes.trim() || undefined,
          });
          setName("");
          setUrl("");
          setJurisdiction("");
          setNotes("");
          setError(null);
        }}
      >
        <label className="flex flex-col gap-1 text-ink type-label">
          Name
          <input
            className={INPUT}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Seattle Electrical Code"
          />
        </label>
        <label className="flex flex-col gap-1 text-ink type-label">
          Link
          <input
            className={INPUT}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://"
            inputMode="url"
            spellCheck={false}
          />
        </label>
        <label className="flex flex-col gap-1 text-ink type-label">
          Type
          <select className={INPUT} value={type} onChange={(e) => setType(e.target.value as ResourceType)}>
            {RESOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-ink type-label">
          Jurisdiction
          <input
            className={INPUT}
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            placeholder="e.g. WA, Seattle, National"
          />
        </label>
        <label className="flex flex-col gap-1 text-ink type-label md:col-span-2">
          Notes (optional)
          <input
            className={INPUT}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What electricians should use it for"
          />
        </label>
        <div className="flex flex-row flex-wrap items-center gap-3 md:col-span-2">
          <Button type="submit" label="Add resource" />
          {error && (
            <p role="alert" className="text-line-red type-small">
              {error}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
}

type ResourceListProps = { resources: CodeResource[]; onRemove: (id: string) => void };

export function ResourceList({ resources, onRemove }: ResourceListProps) {
  if (resources.length === 0) {
    return <Text className="text-ink-muted">No resources yet. Add one below.</Text>;
  }
  return (
    <ul className="flex flex-col gap-3">
      {resources.map((r) => (
        <li key={r.id}>
          <Card as="article" className="gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-col gap-1">
              <Text variant="eyebrow" className="text-ink-muted">
                {r.type} · {r.jurisdiction}
              </Text>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-row items-center gap-1 self-start rounded-sm text-neutral-blue type-label hover:underline"
              >
                {r.name}
                <ExternalLink aria-hidden size={14} strokeWidth={2} />
              </a>
              <Text variant="spec" className="break-all text-ink-muted">
                {new URL(r.url).host}
              </Text>
              {r.notes && (
                <Text variant="small" className="text-ink">
                  {r.notes}
                </Text>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemove(r.id)}
              aria-label={`Remove ${r.name}`}
              className="flex min-h-11 shrink-0 flex-row items-center gap-2 self-start rounded px-3 text-ink-muted type-label hover:bg-surface-200 hover:text-ink"
            >
              <Trash2 aria-hidden size={16} strokeWidth={2} />
              Remove
            </button>
          </Card>
        </li>
      ))}
    </ul>
  );
}
