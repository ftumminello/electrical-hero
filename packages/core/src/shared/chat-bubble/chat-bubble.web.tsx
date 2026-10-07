import { cn } from "@electrical-hero/design-system/cn";
import { HardHat, User } from "../../icons";
import { Text } from "../text";
import { BUBBLE, BUBBLE_HEADER, BUBBLE_LABEL, BUBBLE_ROW } from "./chat-bubble.styles";
import type { ChatBubbleProps } from "./chat-bubble.types";

const ICON = { tutor: HardHat, learner: User };

export const ChatBubble = ({ from, label, meta, className, children }: ChatBubbleProps) => {
  const Icon = ICON[from];

  return (
    <li className={cn(BUBBLE_ROW[from], "min-w-0", className)}>
      <div className={cn(BUBBLE[from], "flex min-w-0 flex-col [overflow-wrap:anywhere]")}>
        <div className={cn(BUBBLE_HEADER, "flex")}>
          <Icon aria-hidden size={14} strokeWidth={2} className="text-steel" />
          <Text as="span" variant="eyebrow" className={BUBBLE_LABEL}>
            {label}
          </Text>
          {meta}
        </div>
        {typeof children === "string" ? <Text>{children}</Text> : children}
      </div>
    </li>
  );
};
