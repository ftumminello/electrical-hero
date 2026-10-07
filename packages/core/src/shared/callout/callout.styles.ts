import type { ColorToken } from "@electrical-hero/design-system/tokens";
import type { CalloutTone } from "./callout.types";

export const CALLOUT_CONTAINER = "overflow-hidden rounded border border-border bg-surface-200";
export const CALLOUT_HEADER = "flex flex-row items-center gap-2 px-4 py-2";
export const CALLOUT_BODY = "gap-2 p-4";

// surface-100 flips light/dark, so header text stays ≥4.5:1 on red and blue in both themes.
export const CALLOUT_TONE: Record<CalloutTone, { label: string; header: string; text: string; icon: ColorToken }> = {
  danger: { label: "Danger", header: "bg-line-red", text: "text-surface-100", icon: "surface-100" },
  warning: { label: "Warning", header: "bg-arc-flash", text: "text-ink-on-voltage", icon: "ink-on-voltage" },
  notice: { label: "Notice", header: "bg-neutral-blue", text: "text-surface-100", icon: "surface-100" },
};
