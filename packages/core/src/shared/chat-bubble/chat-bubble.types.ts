import type { ReactNode } from "react";

/** `tutor` is the LLM coach (left), `learner` is the user (right). */
export type ChatBubbleFrom = "tutor" | "learner";

/** Web renders an `<li>`: place bubbles inside an `<ol>`. */
export type ChatBubbleProps = {
  from: ChatBubbleFrom;
  /** Small caps label above the message, e.g. "Question" or "Follow-up". */
  label: string;
  /** Extra content beside the label, e.g. a StatusBadge with the verdict. */
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
};
