"use client";

import { useId } from "react";
import { cn } from "@electrical-hero/design-system/cn";
import { FIELD, FIELD_ACCESSORY, FIELD_BOX, FIELD_HINT, FIELD_INPUT, FIELD_LABEL } from "./text-area.styles";
import type { TextAreaProps } from "./text-area.types";

export const TextArea = ({
  label,
  value,
  onChangeText,
  placeholder,
  hint,
  disabled,
  rows = 3,
  id,
  accessory,
  onSubmit,
  className,
}: TextAreaProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  return (
    <div className={cn(FIELD, "flex min-w-0 flex-col", className)}>
      <label htmlFor={fieldId} className={cn("type-label", FIELD_LABEL)}>
        {label}
      </label>
      <div
        className={cn(
          FIELD_BOX,
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus-ring",
        )}
      >
        <textarea
          id={fieldId}
          value={value}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          aria-describedby={hintId}
          onChange={(event) => onChangeText(event.target.value)}
          onKeyDown={(event) => {
            if (onSubmit && event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              onSubmit();
            }
          }}
          className={cn(
            FIELD_INPUT,
            "block min-w-0 resize-none overflow-y-auto bg-transparent [overflow-wrap:anywhere] placeholder:text-ink-muted focus-visible:outline-none disabled:opacity-50",
          )}
        />
        {accessory && <div className={cn(FIELD_ACCESSORY, "flex")}>{accessory}</div>}
      </div>
      {hint && (
        <p id={hintId} className={cn("type-small", FIELD_HINT)}>
          {hint}
        </p>
      )}
    </div>
  );
};
