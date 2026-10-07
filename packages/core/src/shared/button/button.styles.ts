import type { ButtonVariant } from "./button.types";

export const BUTTON_BASE = "min-h-11 flex flex-row items-center justify-center gap-2 rounded px-4 py-3";

// Voltage is a fill only: always paired with ink-on-voltage text.
export const BUTTON_VARIANT: Record<ButtonVariant, { container: string; label: string }> = {
  primary: {
    container: "bg-voltage hover:bg-voltage-strong active:bg-voltage-strong",
    label: "text-ink-on-voltage",
  },
  secondary: {
    container: "border border-border-strong bg-surface-200 hover:bg-surface-300 active:bg-surface-300",
    label: "text-ink",
  },
};
