export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = {
  label: string;
  /** `primary` is the voltage-yellow CTA; use one per view. Defaults to `primary`. */
  variant?: ButtonVariant;
  disabled?: boolean;
  /** Shows a spinner and blocks presses. */
  isPending?: boolean;
  onPress?: () => void;
  /** Web only. Defaults to `button`. */
  type?: "button" | "submit";
  className?: string;
};
