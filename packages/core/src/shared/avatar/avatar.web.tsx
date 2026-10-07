import { cn } from "@electrical-hero/design-system/cn";
import { Text } from "../text";
import { AVATAR_BASE, AVATAR_INITIALS, AVATAR_SIZE, initials } from "./avatar.styles";
import type { AvatarProps } from "./avatar.types";

export const Avatar = ({ name, src, size = "md", className }: AvatarProps) => {
  const styles = AVATAR_SIZE[size];

  return (
    <span className={cn(AVATAR_BASE, "inline-flex", styles.container, className)}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <Text as="span" variant={styles.text} className={AVATAR_INITIALS}>
          <span aria-hidden>{initials(name)}</span>
          <span className="sr-only">{name}</span>
        </Text>
      )}
    </span>
  );
};
