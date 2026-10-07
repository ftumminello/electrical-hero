import type { ChatBubbleFrom } from "./chat-bubble.types";

export const BUBBLE_ROW: Record<ChatBubbleFrom, string> = {
  tutor: "flex flex-row justify-start",
  learner: "flex flex-row justify-end",
};

export const BUBBLE: Record<ChatBubbleFrom, string> = {
  tutor: "max-w-[90%] gap-2 rounded border border-border bg-surface-200 p-4",
  learner: "max-w-[90%] gap-2 rounded bg-surface-300 p-4",
};

export const BUBBLE_HEADER = "flex flex-row flex-wrap items-center gap-2";
export const BUBBLE_LABEL = "text-ink-muted";
