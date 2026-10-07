import { Pressable, View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { Monitor, Moon, Sun } from "../../icons";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import {
  THEME_OPTIONS,
  TOGGLE_GROUP,
  TOGGLE_LABEL,
  TOGGLE_LABEL_SELECTED,
  TOGGLE_OPTION,
  TOGGLE_OPTION_SELECTED,
} from "./theme-toggle.styles";
import type { ThemeToggleProps } from "./theme-toggle.types";

const ICON = { system: Monitor, light: Sun, dark: Moon };

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { preference, setPreference, colors } = useTheme();

  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="Color theme" className={cn(TOGGLE_GROUP, className)}>
      {THEME_OPTIONS.map(({ value, label }) => {
        const selected = preference === value;
        const Icon = ICON[value];
        return (
          <Pressable
            key={value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => setPreference(value)}
            className={cn(TOGGLE_OPTION, selected ? TOGGLE_OPTION_SELECTED : "active:bg-surface-300")}
          >
            <Icon size={16} strokeWidth={2} color={selected ? colors["ink-on-voltage"] : colors.steel} />
            <Text variant="label" className={selected ? TOGGLE_LABEL_SELECTED : TOGGLE_LABEL}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
