"use client";

import { cn } from "@electrical-hero/design-system/cn";
import { Mic, Square } from "@electrical-hero/core/icons";

type VoiceInputButtonProps = {
  isListening: boolean;
  disabled?: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function VoiceInputButton({ isListening, disabled, onStart, onStop }: VoiceInputButtonProps) {
  const Icon = isListening ? Square : Mic;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={isListening}
      onClick={isListening ? onStop : onStart}
      className={cn(
        "flex min-h-11 cursor-pointer flex-row items-center gap-2 rounded-sm border px-3 type-label",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isListening
          ? "border-line-red bg-line-red/10 text-line-red"
          : "border-border-strong bg-surface-200 text-ink hover:bg-surface-300",
      )}
    >
      <Icon aria-hidden size={16} strokeWidth={2} className={cn(isListening && "animate-pulse")} />
      {isListening ? "Stop recording" : "Answer by voice"}
    </button>
  );
}
