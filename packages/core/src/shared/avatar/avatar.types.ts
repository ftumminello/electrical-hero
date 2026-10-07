export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = {
  /** Used for the initials fallback and the accessible label. */
  name: string;
  /** Profile picture URL; initials are shown when it's missing. */
  src?: string;
  /** `sm` 32px, `md` 48px, `lg` 96px. Defaults to `md`. */
  size?: AvatarSize;
  className?: string;
};
