import { cn } from "@electrical-hero/design-system/cn";
import { LoaderCircle } from "../../icons";
import { Text } from "../text";
import { BUTTON_BASE, BUTTON_VARIANT } from "./button.styles";
import type { ButtonProps } from "./button.types";

export const Button = ({
  label,
  variant = "primary",
  disabled,
  isPending,
  onPress,
  type = "button",
  className,
}: ButtonProps) => {
  const isDisabled = disabled || isPending;
  const styles = BUTTON_VARIANT[variant];

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isPending}
      onClick={onPress}
      className={cn(
        BUTTON_BASE,
        styles.container,
        "inline-flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {isPending && <LoaderCircle aria-hidden size={16} className={cn("animate-spin", styles.label)} />}
      <Text as="span" variant="label" className={styles.label}>
        {label}
      </Text>
    </button>
  );
};
