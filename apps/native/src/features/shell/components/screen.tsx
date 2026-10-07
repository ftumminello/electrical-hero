import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@electrical-hero/design-system/cn";
import { useGlassTabBarInset } from "@features/navigation/glass-tab-bar";

type ScreenProps = {
  /** Rendered edge to edge above the padded content, e.g. a hero band. */
  header?: ReactNode;
  /** Pads the top for the status bar. Off when a header handles it. Defaults to true. */
  padTop?: boolean;
  className?: string;
  children: ReactNode;
};

/** A scrolling page with the design system's gutters; lifts above the keyboard. */
export function Screen({ header, padTop = true, className, children }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const tabBarInset = useGlassTabBarInset();

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        className="flex-1 bg-surface-100"
        contentContainerClassName="pb-12"
        contentContainerStyle={tabBarInset ? { paddingBottom: tabBarInset } : undefined}
        scrollIndicatorInsets={{ bottom: tabBarInset }}
        keyboardShouldPersistTaps="handled"
      >
        {header}
        <View
          className={cn("gap-8 px-4 pt-6", className)}
          style={padTop && !header ? { paddingTop: insets.top + 16 } : undefined}
        >
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
