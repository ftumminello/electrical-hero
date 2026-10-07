import type { TypographyVariant } from "@electrical-hero/design-system/tokens";
import type { AvatarSize } from "./avatar.types";

export const AVATAR_BASE = "shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-inverse";

export const AVATAR_SIZE: Record<AvatarSize, { container: string; text: TypographyVariant }> = {
  sm: { container: "h-8 w-8", text: "label" },
  md: { container: "h-12 w-12", text: "heading" },
  lg: { container: "h-24 w-24", text: "display-l" },
};

export const AVATAR_INITIALS = "text-ink-inverse";

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
