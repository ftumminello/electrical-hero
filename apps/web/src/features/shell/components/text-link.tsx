import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@electrical-hero/design-system/cn";
import { ChevronRight } from "@electrical-hero/core/icons";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Inline navigation link in neutral-blue, the design system's link color. */
export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex flex-row items-center gap-1 rounded-sm text-neutral-blue type-label hover:underline",
        className,
      )}
    >
      {children}
      <ChevronRight aria-hidden size={16} strokeWidth={2} />
    </Link>
  );
}
