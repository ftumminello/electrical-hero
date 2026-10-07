"use client";

import { useState } from "react";
import { Button } from "@electrical-hero/core/shared/button";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";

type TraineeNameFormProps = {
  /** Shown on the button. Defaults to "Save name". */
  submitLabel?: string;
};

/** The name sent with each session (the API has no accounts). Saved on this device. */
export function TraineeNameForm({ submitLabel = "Save name" }: TraineeNameFormProps) {
  const { traineeName, setTraineeName } = useTrainee();
  const [value, setValue] = useState(traineeName ?? "");
  const trimmed = value.trim();

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (trimmed) setTraineeName(trimmed);
      }}
    >
      <label htmlFor="trainee-name" className="text-ink type-label">
        Your name
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="trainee-name"
          value={value}
          maxLength={100}
          autoComplete="name"
          placeholder="First and last name"
          onChange={(event) => setValue(event.target.value)}
          className="min-h-11 w-full rounded-sm border border-border-strong bg-surface-200 px-3 text-ink type-body placeholder:text-ink-muted sm:max-w-sm"
        />
        <Button
          type="submit"
          variant={traineeName ? "secondary" : "primary"}
          label={submitLabel}
          disabled={!trimmed || trimmed === traineeName}
        />
      </div>
      <p className="text-ink-muted type-small">Your trainer sees this name on each session you start.</p>
    </form>
  );
}
