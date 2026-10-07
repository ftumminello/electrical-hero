import type { ReactNode } from "react";

export type TextAreaProps = {
  /** Visible label above the field. */
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  /** Helper text under the field. */
  hint?: string;
  disabled?: boolean;
  /** Visible lines. Defaults to 3. */
  rows?: number;
  /** Web only: id linking the label to the field. */
  id?: string;
  /** Rendered inside the field's bottom-right corner, e.g. a voice-input button. */
  accessory?: ReactNode;
  /** Web only: called on Cmd/Ctrl+Enter. */
  onSubmit?: () => void;
  className?: string;
};
