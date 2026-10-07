import { ActivityIndicator, Pressable } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import { BUTTON_BASE, BUTTON_VARIANT } from "./button.styles";
import type { ButtonProps } from "./button.types";

export const Button = ({ label, variant = "primary", disabled, isPending, onPress, className }: ButtonProps) => {
  const { colors } = useTheme();
  const isDisabled = disabled || isPending;
  const styles = BUTTON_VARIANT[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isPending }}
      disabled={isDisabled}
      onPress={onPress}
      className={cn(BUTTON_BASE, styles.container, isDisabled && "opacity-50", className)}
    >
      {isPending && (
        <ActivityIndicator size="small" color={variant === "primary" ? colors["ink-on-voltage"] : colors.ink} />
      )}
      <Text variant="label" className={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};
