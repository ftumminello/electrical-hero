import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@electrical-hero/design-system/cn";
import { Check, LoaderCircle, X } from "../../icons";
import { Text } from "../text";
import { BADGE, BADGE_STATUS } from "./status-badge.styles";
import type { StatusBadgeProps } from "./status-badge.types";

const ICON = { success: Check, error: X, pending: LoaderCircle };

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const styles = BADGE_STATUS[status];
  const Icon = ICON[status];
  // Measure the content and transition an explicit width, so label changes ease instead of jumping.
  const contentRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setWidth(el.offsetWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      role="status"
      style={{ width }}
      className={cn(
        BADGE,
        "box-content inline-flex max-w-full overflow-hidden transition-[width] duration-300 ease-out motion-reduce:transition-none",
        styles.container,
        className,
      )}
    >
      <span ref={contentRef} className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
        <Icon
          aria-hidden
          size={14}
          strokeWidth={2}
          className={cn(styles.text, status === "pending" && "animate-spin")}
        />
        <Text as="span" variant="label" className={styles.text}>
          {label}
        </Text>
      </span>
    </span>
  );
};
