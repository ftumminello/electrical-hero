import { Image, View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { Text } from "../text";
import { AVATAR_BASE, AVATAR_INITIALS, AVATAR_SIZE, initials } from "./avatar.styles";
import type { AvatarProps } from "./avatar.types";

export const Avatar = ({ name, src, size = "md", className }: AvatarProps) => {
  const styles = AVATAR_SIZE[size];

  return (
    <View accessibilityRole="image" accessibilityLabel={name} className={cn(AVATAR_BASE, styles.container, className)}>
      {src ? (
        <Image source={{ uri: src }} className="h-full w-full" />
      ) : (
        <Text variant={styles.text} className={AVATAR_INITIALS}>
          {initials(name)}
        </Text>
      )}
    </View>
  );
};
