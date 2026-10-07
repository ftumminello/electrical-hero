"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage, SessionMode } from "@electrical-hero/shared";
import { Button } from "@electrical-hero/core/shared/button";
import { ChatBubble } from "@electrical-hero/core/shared/chat-bubble";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { TextArea } from "@electrical-hero/core/shared/text-area";
import { PASS_MESSAGE, messageSpeaker } from "@electrical-hero/core/lib/training";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { VoiceInputButton } from "./voice-input-button";

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
  const endRef = useRef<HTMLDivElement>(null);
  const isStreaming = streamingReply !== null;
  const isBusy = isStreaming || isGrading;

  const speech = useSpeechToText((transcript) =>
    setDraft((current) => (current.trim() ? `${current.trimEnd()} ${transcript}` : transcript)),
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages.length, streamingReply]);

  const send = async (content: string, fromDraft: boolean) => {
    if (!content.trim()) {
      setHint("Write or say what you do, or pass this question.");
      return;
    }
    speech.stop();
    setHint(null);
    if (fromDraft) setDraft("");
    const ok = await onSend(content);
    // Put the words back so nothing typed is lost.
    if (!ok && fromDraft) setDraft(content);
  };

  const error = hint ?? sendError ?? speech.error ?? gradeError;

  return (
    <section aria-labelledby="chat-heading" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Text variant="eyebrow" className="text-ink-muted">
          {mode === "scenario" ? "Work the call" : "Ask the account lead"}
        </Text>
        <h2 id="chat-heading" className="text-ink type-heading">
          {mode === "scenario" ? "On the job" : "Site briefing"}
        </h2>
      </div>

      {messages.length === 0 && !isStreaming && (
        <Text className="text-ink-muted">
          Start with what you want to know, like “Where do I isolate the main panel?” or “What hazards are on this
          site?”
        </Text>
      )}

      <ol aria-live="polite" className="flex flex-col gap-3">
        {messages.map((message) => {
          const { label, text } = messageSpeaker(message, mode);
          return (
            <ChatBubble key={message.id} from={message.role === "user" ? "learner" : "tutor"} label={label}>
              {message.role === "user" ? <Text>{text}</Text> : <Markdown content={text} />}
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

      {!isCompleted && (
        <form
          className="flex flex-col gap-3"
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
            <Text variant="small" className="text-line-red">
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
      <div ref={endRef} />
    </section>
  );
}
