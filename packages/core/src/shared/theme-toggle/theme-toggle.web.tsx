"use client";

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
  const { preference, setPreference } = useTheme();

  return (
    <div role="radiogroup" aria-label="Color theme" className={cn(TOGGLE_GROUP, "inline-flex", className)}>
      {THEME_OPTIONS.map(({ value, label }) => {
        const selected = preference === value;
        const Icon = ICON[value];
        const labelClass = selected ? TOGGLE_LABEL_SELECTED : TOGGLE_LABEL;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setPreference(value)}
            className={cn(TOGGLE_OPTION, "cursor-pointer", selected ? TOGGLE_OPTION_SELECTED : "hover:bg-surface-300")}
          >
            <Icon aria-hidden size={16} strokeWidth={2} className={selected ? labelClass : "text-steel"} />
            <Text as="span" variant="label" className={labelClass}>
              {label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};
