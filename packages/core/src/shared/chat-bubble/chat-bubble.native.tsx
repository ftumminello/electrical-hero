import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { HardHat, User } from "../../icons";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import { BUBBLE, BUBBLE_HEADER, BUBBLE_LABEL, BUBBLE_ROW } from "./chat-bubble.styles";
import type { ChatBubbleProps } from "./chat-bubble.types";

const ICON = { tutor: HardHat, learner: User };

export const ChatBubble = ({ from, label, meta, className, children }: ChatBubbleProps) => {
  const { colors } = useTheme();
  const Icon = ICON[from];

  return (
    <View className={cn(BUBBLE_ROW[from], className)}>
      <View className={BUBBLE[from]}>
        <View className={BUBBLE_HEADER}>
          <Icon size={14} strokeWidth={2} color={colors.steel} />
          <Text variant="eyebrow" className={BUBBLE_LABEL}>
            {label}
          </Text>
          {meta}
        </View>
        {typeof children === "string" ? <Text>{children}</Text> : children}
      </View>
    </View>
  );
};
