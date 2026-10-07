import type { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "@electrical-hero/core/shared/text";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
};

export function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <View className="flex-row flex-wrap items-end justify-between gap-2">
      <View className="gap-1">
        {eyebrow && (
          <Text variant="eyebrow" className="text-ink-muted">
            {eyebrow}
          </Text>
        )}
        <Text variant="heading">{title}</Text>
      </View>
      {action}
    </View>
  );
}
