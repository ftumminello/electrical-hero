import { cn } from "@electrical-hero/design-system/cn";
import { Info, OctagonAlert, TriangleAlert } from "../../icons";
import { Text } from "../text";
import { CALLOUT_BODY, CALLOUT_CONTAINER, CALLOUT_HEADER, CALLOUT_TONE } from "./callout.styles";
import type { CalloutProps } from "./callout.types";

const ICON = { danger: OctagonAlert, warning: TriangleAlert, notice: Info };

export const Callout = ({ tone, label, className, children }: CalloutProps) => {
  const styles = CALLOUT_TONE[tone];
  const Icon = ICON[tone];

  return (
    <aside role="note" className={cn(CALLOUT_CONTAINER, className)}>
      <div className={cn(CALLOUT_HEADER, styles.header)}>
        <Icon aria-hidden size={16} strokeWidth={2} className={styles.text} />
        <Text as="span" variant="eyebrow" className={styles.text}>
          {label ?? styles.label}
        </Text>
      </div>
      <div className={cn(CALLOUT_BODY, "flex flex-col")}>
        {typeof children === "string" ? <Text>{children}</Text> : children}
      </div>
    </aside>
  );
};
