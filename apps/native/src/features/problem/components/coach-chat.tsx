import { useState } from "react";
import { View } from "react-native";
import type { ChatMessage, SessionMode } from "@electrical-hero/shared";
import { PASS_MESSAGE, messageSpeaker } from "@electrical-hero/core/lib/training";
import { Button } from "@electrical-hero/core/shared/button";
import { ChatBubble } from "@electrical-hero/core/shared/chat-bubble";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { TextArea } from "@electrical-hero/core/shared/text-area";

type CoachChatProps = {
  mode: SessionMode;
  messages: ChatMessage[];
  streamingReply: string | null;
  isCompleted: boolean;
  sendError: string | null;
  onSend: (content: string) => Promise<boolean>;
  canFinish: boolean;
  isGrading: boolean;
  gradeError: string | null;
  onFinish: () => void;
};

export function CoachChat({
  mode,
  messages,
  streamingReply,
  isCompleted,
  sendError,
  onSend,
  canFinish,
  isGrading,
  gradeError,
  onFinish,
}: CoachChatProps) {
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const isStreaming = streamingReply !== null;
  const isBusy = isStreaming || isGrading;
  const streaming =
    streamingReply && messageSpeaker({ id: "", role: "assistant", content: streamingReply, createdAt: "" }, mode);

  const send = async (content: string, fromDraft: boolean) => {
    if (!content.trim()) {
      setHint("Write what you do, or pass this question.");
      return;
    }
    setHint(null);
    if (fromDraft) setDraft("");
    const ok = await onSend(content);
    // Put the words back so nothing typed is lost.
    if (!ok && fromDraft) setDraft(content);
  };

  const error = hint ?? sendError ?? gradeError;

  return (
    <View className="gap-4">
      <View className="gap-1">
        <Text variant="eyebrow" className="text-ink-muted">
          {mode === "scenario" ? "Work the call" : "Ask the account lead"}
        </Text>
        <Text variant="heading">{mode === "scenario" ? "On the job" : "Site briefing"}</Text>
      </View>

      {messages.length === 0 && !isStreaming && (
        <Text className="text-ink-muted">
          Start with what you want to know, like “Where do I isolate the main panel?” or “What hazards are on this
          site?”
        </Text>
      )}

      <View accessibilityLiveRegion="polite" className="gap-3">
        {messages.map((message) => {
          const { label, text } = messageSpeaker(message, mode);
          return (
            <ChatBubble key={message.id} from={message.role === "user" ? "learner" : "tutor"} label={label}>
              {message.role === "user" ? <Text>{text}</Text> : <Markdown content={text} />}
            </ChatBubble>
          );
        })}
        {isStreaming && (
          <ChatBubble
            from="tutor"
            label={streaming ? streaming.label : mode === "scenario" ? "Dispatch" : "Account lead"}
          >
            {streaming ? <Markdown content={streaming.text} /> : <StatusBadge status="pending" label="Thinking" />}
          </ChatBubble>
        )}
      </View>

      {!isCompleted && (
        <View className="gap-3">
          <TextArea
            label={mode === "scenario" ? "What do you do?" : "Your question"}
            value={draft}
            onChangeText={setDraft}
            disabled={isBusy}
            placeholder={
              mode === "scenario"
                ? "Say exactly what you do, step by step."
                : "Ask about hazards, isolation points, access…"
            }
            hint="Tip: use your keyboard's mic to dictate."
          />
          {error && (
            <View accessibilityRole="alert">
              <Text variant="small" className="text-line-red">
                {" "}
                {error}
              </Text>
            </View>
          )}
          <Button label="Send" isPending={isStreaming} disabled={isBusy} onPress={() => send(draft, true)} />
          {mode === "scenario" && (
            <Button
              variant="secondary"
              label="Pass this question"
              disabled={isBusy}
              onPress={() => send(PASS_MESSAGE, false)}
            />
          )}
          <Button
            variant="secondary"
            label={isGrading ? "Grading… up to 30 s" : "Finish and get graded"}
            isPending={isGrading}
            disabled={!canFinish || isGrading}
            onPress={onFinish}
          />
        </View>
      )}
    </View>
  );
}
