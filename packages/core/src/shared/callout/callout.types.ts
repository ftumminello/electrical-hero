import type { ReactNode } from "react";

/** ANSI Z535 signal words: danger (line-red), warning (arc-flash), notice / NEC reference (neutral-blue). */
export type CalloutTone = "danger" | "warning" | "notice";

export type CalloutProps = {
  tone: CalloutTone;
  /** Overrides the header label, e.g. "NEC 210.8(A)". Defaults to the signal word. */
  label?: string;
  className?: string;
  children: ReactNode;
};
