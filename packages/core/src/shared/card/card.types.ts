import type { ReactNode } from "react";

export type CardProps = {
  /** Web only: the element to render. Defaults to `div`. */
  as?: "div" | "section" | "article";
  className?: string;
  children: ReactNode;
};
