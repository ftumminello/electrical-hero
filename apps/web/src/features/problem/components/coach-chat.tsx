"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage, SessionMode } from "@electrical-hero/shared";
import { Lightbulb } from "@electrical-hero/core/icons";
import { Button } from "@electrical-hero/core/shared/button";
import { ChatBubble } from "@electrical-hero/core/shared/chat-bubble";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { TextArea } from "@electrical-hero/core/shared/text-area";
import { PASS_MESSAGE, messageSpeaker } from "@electrical-hero/core/lib/training";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { VoiceInputButton } from "./voice-input-button";

const SHOW_ME_HOW_URL = "https://stonebyte.bid";

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
  const conversationRef = useRef<HTMLDivElement>(null);
  const followReplyRef = useRef(true);
  const isStreaming = streamingReply !== null;
  const isBusy = isStreaming || isGrading;

  const speech = useSpeechToText((transcript) =>
    setDraft((current) => (current.trim() ? `${current.trimEnd()} ${transcript}` : transcript)),
  );

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation && followReplyRef.current) {
      // Scroll only the transcript; keep the composer and the page in place.
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, [messages.length, streamingReply]);

  const send = async (content: string, fromDraft: boolean) => {
    if (!content.trim()) {
      setHint("Write or say what you do, or pass this question.");
      return;
    }
    speech.stop();
    followReplyRef.current = true;
    setHint(null);
    if (fromDraft) setDraft("");
    const ok = await onSend(content);
    // Put the words back so nothing typed is lost.
    if (!ok && fromDraft) setDraft(content);
  };

  const error = hint ?? sendError ?? speech.error ?? gradeError;

  return (
    <section
      aria-labelledby="chat-heading"
      className="flex h-[min(44rem,85dvh)] min-h-[32rem] min-w-0 flex-col overflow-hidden rounded border border-border bg-surface-200"
    >
      <div className="flex shrink-0 flex-col gap-1 border-b border-border p-4">
        <Text variant="eyebrow" className="text-ink-muted">
          {mode === "scenario" ? "Work the call" : "Ask the account lead"}
        </Text>
        <h2 id="chat-heading" className="text-ink type-heading">
          {mode === "scenario" ? "On the job" : "Site briefing"}
        </h2>
      </div>

      <div
        ref={conversationRef}
        role="region"
        aria-label="Conversation"
        tabIndex={0}
        onScroll={(event) => {
          const conversation = event.currentTarget;
          followReplyRef.current = conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight < 48;
        }}
        className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain p-4 [scrollbar-gutter:stable] focus-visible:-outline-offset-2"
      >
        {messages.length === 0 && !isStreaming && (
          <Text className="text-ink-muted">
            Start with what you want to know, like “Where do I isolate the main panel?” or “What hazards are on this
            site?”
          </Text>
        )}

        <ol aria-live="polite" className="flex min-w-0 flex-col gap-3">
          {messages.map((message) => {
            const { label, text } = messageSpeaker(message, mode);
            return (
              <ChatBubble key={message.id} from={message.role === "user" ? "learner" : "tutor"} label={label}>
                {message.role === "user" ? (
                  <Text className="whitespace-pre-wrap">{text}</Text>
                ) : (
                  <Markdown content={text} />
                )}
                {label === "Dispatch" && (
                  <div className="mt-2 flex justify-end">
                    <a
                      href={SHOW_ME_HOW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-sm text-neutral-blue type-small hover:underline"
                    >
                      <Lightbulb aria-hidden size={14} strokeWidth={2} />
                      Show me how
                    </a>
                  </div>
                )}
              </ChatBubble>
            );
          })}
          {isStreaming && (
            <ChatBubble from="tutor" label={mode === "scenario" ? "Dispatch" : "Account lead"}>
              {streamingReply ? (
                <Markdown
                  content={
                    messageSpeaker({ id: "", role: "assistant", content: streamingReply, createdAt: "" }, mode).text
                  }
                />
              ) : (
                <StatusBadge status="pending" label="Thinking" />
              )}
            </ChatBubble>
          )}
        </ol>
      </div>

      {!isCompleted && (
        <form
          className="flex max-h-[70%] shrink-0 flex-col gap-3 overflow-y-auto overscroll-contain border-t border-border p-4"
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft, true);
          }}
        >
          <TextArea
            label={mode === "scenario" ? "What do you do?" : "Your question"}
            value={draft}
            onChangeText={setDraft}
            onSubmit={() => void send(draft, true)}
            disabled={isBusy}
            placeholder={
              speech.isListening
                ? "Listening…"
                : mode === "scenario"
                  ? "Say exactly what you do, step by step, like you'd tell your foreman."
                  : "Ask about hazards, isolation points, access…"
            }
            hint={
              speech.isSupported
                ? "Type or answer by voice. Ctrl+Enter (⌘+Enter on Mac) sends."
                : "Ctrl+Enter (⌘+Enter on Mac) sends."
            }
            accessory={
              speech.isSupported && (
                <VoiceInputButton
                  isListening={speech.isListening}
                  disabled={isBusy}
                  onStart={speech.start}
                  onStop={speech.stop}
                />
              )
            }
          />
          {error && (
            <Text variant="small" className="max-h-20 overflow-y-auto text-line-red [overflow-wrap:anywhere]">
              <span role="alert">{error}</span>
            </Text>
          )}
          <div className="flex flex-row flex-wrap gap-3">
            <Button type="submit" label="Send" isPending={isStreaming} disabled={isBusy} />
            {mode === "scenario" && (
              <Button
                variant="secondary"
                label="Pass this question"
                disabled={isBusy}
                onPress={() => void send(PASS_MESSAGE, false)}
              />
            )}
            <Button
              variant="secondary"
              label={isGrading ? "Grading… up to 30 s" : "Finish and get graded"}
              isPending={isGrading}
              disabled={!canFinish || isGrading}
              onPress={onFinish}
              className="sm:ml-auto"
            />
          </div>
        </form>
      )}
    </section>
  );
}
