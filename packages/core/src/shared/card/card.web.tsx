import { cn } from "@electrical-hero/design-system/cn";
import { CARD } from "./card.styles";
import type { CardProps } from "./card.types";

export const Card = ({ as: Element = "div", className, children }: CardProps) => (
  <Element className={cn(CARD, "flex flex-col", className)}>{children}</Element>
);
