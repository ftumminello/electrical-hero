import type { ReactNode } from "react";
import { Text } from "@electrical-hero/core/shared/text";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Right-aligned, e.g. a TextLink. */
  action?: ReactNode;
  id?: string;
};

export function SectionHeading({ eyebrow, title, action, id }: SectionHeadingProps) {
  return (
    <div className="flex flex-row flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div className="flex flex-col gap-1">
        {eyebrow && (
          <Text variant="eyebrow" className="text-ink-muted">
            {eyebrow}
          </Text>
        )}
        <h2 id={id} className="text-ink type-heading">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
