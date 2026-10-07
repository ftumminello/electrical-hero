import type { ColorToken } from "@electrical-hero/design-system/tokens";
import type { StatusBadgeStatus } from "./status-badge.types";

export const BADGE = "flex flex-row items-center gap-1 self-start rounded-sm border px-2 py-1";

export const BADGE_STATUS: Record<StatusBadgeStatus, { container: string; text: string; icon: ColorToken }> = {
  success: { container: "border-ground bg-ground/10", text: "text-ground", icon: "ground" },
  error: { container: "border-line-red bg-line-red/10", text: "text-line-red", icon: "line-red" },
  pending: { container: "border-border-strong bg-surface-300", text: "text-ink-muted", icon: "steel" },
};
