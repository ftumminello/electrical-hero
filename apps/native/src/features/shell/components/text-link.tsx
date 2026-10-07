import type { ReactNode } from "react";
import { Pressable } from "react-native";
import { Link, type Href } from "expo-router";
import { ChevronLeft, ChevronRight } from "@electrical-hero/core/icons";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { Text } from "@electrical-hero/core/shared/text";

/** Inline navigation link in neutral-blue, the design system's link color. */
export function TextLink({
  href,
  children,
  back,
}: {
  href: Href;
  children: ReactNode;
  /** Renders a left-pointing chevron before the label, for back navigation. */
  back?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" className="min-h-11 flex-row items-center gap-1 self-start">
        {back && <ChevronLeft size={16} strokeWidth={2} color={colors["neutral-blue"]} />}
        <Text variant="label" className="text-neutral-blue">
          {children}
        </Text>
        {!back && <ChevronRight size={16} strokeWidth={2} color={colors["neutral-blue"]} />}
      </Pressable>
    </Link>
  );
}
