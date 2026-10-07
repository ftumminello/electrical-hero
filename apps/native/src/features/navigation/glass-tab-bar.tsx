import { createContext, useContext, useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import type { Tabs } from "expo-router";
import type { ComponentProps } from "react";

type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>["tabBar"]>>[0];
import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";

const BAR_HEIGHT = 64;
const BAR_PADDING = 6;
const ICON_SIZE = 22;
const BUBBLE_SPRING = { damping: 18, stiffness: 220, mass: 0.9 };

const liquidGlass = isLiquidGlassAvailable();

/** True inside the tab navigator, where the floating bar overlaps screen content. */
export const GlassTabBarContext = createContext(false);

/** Bottom space a scroll view needs so its last content clears the floating bar (0 outside tabs). */
export function useGlassTabBarInset() {
  const inTabs = useContext(GlassTabBarContext);
  const insets = useSafeAreaInsets();
  return inTabs ? BAR_HEIGHT + barOffset(insets.bottom) + 16 : 0;
}

const barOffset = (safeBottom: number) => Math.max(safeBottom, 12);

/** Glass surface: native Liquid Glass on iOS 26+, blur everywhere else. */
function GlassSurface({ style, interactive, tint }: { style: object; interactive?: boolean; tint?: string }) {
  const { scheme, colors } = useTheme();
  if (liquidGlass) {
    return <GlassView style={style} glassEffectStyle="regular" isInteractive={interactive} tintColor={tint} />;
  }
  return (
    <View style={[style, { overflow: "hidden" }]}>
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={Platform.OS === "android" ? 40 : 60}
        tint={scheme === "dark" ? "dark" : "light"}
        experimentalBlurMethod="dimezisBlurView"
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: tint ?? colors["surface-200"], opacity: tint ? 1 : 0.55 },
        ]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, borderColor: "rgba(255,255,255,0.35)" },
        ]}
      />
    </View>
  );
}

export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);

  const count = state.routes.length;
  const tabWidth = width > 0 ? (width - BAR_PADDING * 2) / count : 0;

  const x = useSharedValue(0);
  const stretch = useSharedValue(1);

  useEffect(() => {
    if (!tabWidth) return;
    x.value = withSpring(state.index * tabWidth, BUBBLE_SPRING);
    // Liquid "blob" feel: bubble stretches while travelling, then settles.
    stretch.value = withSequence(withTiming(1.18, { duration: 120 }), withSpring(1, { damping: 10, stiffness: 180 }));
  }, [state.index, tabWidth, x, stretch]);

  const bubbleStyle = useAnimatedStyle(() => ({
    width: tabWidth,
    transform: [{ translateX: x.value }, { scaleX: stretch.value }, { scaleY: 2 - stretch.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: barOffset(insets.bottom) }]}>
      <View onLayout={onLayout} style={styles.bar}>
        <GlassSurface style={[StyleSheet.absoluteFill, styles.pill]} />
        {tabWidth > 0 && (
          <Animated.View pointerEvents="none" style={[styles.bubble, bubbleStyle]}>
            <GlassSurface style={[StyleSheet.absoluteFill, styles.pill]} interactive tint={colors["surface-300"]} />
          </Animated.View>
        )}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const color = focused ? colors.ink : colors.steel;
          const label = typeof options.title === "string" ? options.title : route.name;

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) {
              Haptics.selectionAsync();
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              onLongPress={() => navigation.emit({ type: "tabLongPress", target: route.key })}
              style={styles.tab}
            >
              {options.tabBarIcon?.({ focused, color, size: ICON_SIZE })}
              <Text numberOfLines={1} style={[styles.label, { color }]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "absolute", left: 16, right: 16, alignItems: "center" },
  bar: {
    width: "100%",
    maxWidth: 420,
    height: BAR_HEIGHT,
    padding: BAR_PADDING,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  pill: { borderRadius: 999 },
  bubble: { position: "absolute", top: BAR_PADDING, bottom: BAR_PADDING, left: BAR_PADDING },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
});
