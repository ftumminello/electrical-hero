import { cn } from "@electrical-hero/design-system/cn";
import { Check, LoaderCircle, X } from "../../icons";
import { Text } from "../text";
import { BADGE, BADGE_STATUS } from "./status-badge.styles";
import type { StatusBadgeProps } from "./status-badge.types";

const ICON = { success: Check, error: X, pending: LoaderCircle };

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const styles = BADGE_STATUS[status];
  const Icon = ICON[status];

  return (
    <span role="status" className={cn(BADGE, "inline-flex", styles.container, className)}>
      <Icon aria-hidden size={14} strokeWidth={2} className={cn(styles.text, status === "pending" && "animate-spin")} />
      <Text as="span" variant="label" className={styles.text}>
        {label}
      </Text>
    </span>
  );
};
