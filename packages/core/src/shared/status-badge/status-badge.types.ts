export type StatusBadgeStatus = "success" | "error" | "pending";

export type StatusBadgeProps = {
  status: StatusBadgeStatus;
  /** Always pass words ("Passed", "Try again"); status is never color-only. */
  label: string;
  className?: string;
};
