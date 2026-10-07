import { cn } from "@electrical-hero/design-system/cn";
import { DEFAULT_HEIGHT, STRIPE_PITCH, STRIPE_WIDTH } from "./hazard-stripes.styles";
import type { HazardStripesProps } from "./hazard-stripes.types";

// Gradient stops run perpendicular to the bands, so horizontal widths shrink by √2.
const stripe = STRIPE_WIDTH / Math.SQRT2;
const pitch = STRIPE_PITCH / Math.SQRT2;
const backgroundImage = `repeating-linear-gradient(135deg, rgb(var(--color-surface-inverse)) 0 ${stripe}px, rgb(var(--color-voltage)) ${stripe}px ${pitch}px)`;

/** Accent edge only (hero band, safety divider). Never put text on it. */
export const HazardStripes = ({ height = DEFAULT_HEIGHT, className }: HazardStripesProps) => (
  <div aria-hidden className={cn("w-full shrink-0", className)} style={{ height, backgroundImage }} />
);
