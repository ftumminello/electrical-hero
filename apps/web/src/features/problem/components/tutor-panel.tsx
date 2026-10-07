"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import type { AnswerVerdict, ProblemAttempt, TutorQuestion, TutorStep } from "@electrical-hero/shared";
import { Button } from "@electrical-hero/core/shared/button";
import { ChatBubble } from "@electrical-hero/core/shared/chat-bubble";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { TextArea } from "@electrical-hero/core/shared/text-area";
import { answerQuestion, passQuestion } from "@/lib/api/actions";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { ProblemResult } from "./problem-result";
import { VoiceInputButton } from "./voice-input-button";

type Turn = {
  id: string;
  from: "tutor" | "learner";
  label: string;
  text: string;
  verdict?: AnswerVerdict;
};

const PASSED_TEXT = "I'll pass on this one.";

const VERDICT_BADGE: Partial<Record<AnswerVerdict, { status: "success" | "error"; label: string }>> = {
  correct: { status: "success", label: "Correct" },
  incorrect: { status: "error", label: "Not quite" },
};

const questionTurn = (question: TutorQuestion): Turn => ({
  id: question.id,
  from: "tutor",
  label: question.isFollowUp ? `Follow-up · ${question.topic}` : question.topic,
  text: question.text,
});

type TutorPanelProps = {
  sessionId: string;
  firstQuestion: TutorQuestion;
};

export function TutorPanel({ sessionId, firstQuestion }: TutorPanelProps) {
  const [turns, setTurns] = useState<Turn[]>(() => [questionTurn(firstQuestion)]);
  const [answer, setAnswer] = useState("");
  const [attempt, setAttempt] = useState<ProblemAttempt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  const speech = useSpeechToText((transcript) =>
    setAnswer((current) => (current.trim() ? `${current.trimEnd()} ${transcript}` : transcript)),
  );

  useEffect(() => {
    if (turns.length > 1) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns.length, attempt]);

  const send = (learnerText: string, request: () => Promise<TutorStep>) => {
    speech.stop();
    setError(null);
    setTurns((current) => [
      ...current,
      { id: `learner-${current.length}`, from: "learner", label: "You", text: learnerText },
    ]);
    setAnswer("");

    startTransition(async () => {
      try {
        const step = await request();
        setTurns((current) => {
          const explanation: Turn = {
            id: `explanation-${current.length}`,
            from: "tutor",
            label: step.verdict === "passed" ? "Answer" : "Explanation",
            text: step.explanation,
            verdict: step.verdict,
          };
          return step.nextQuestion
            ? [...current, explanation, questionTurn(step.nextQuestion)]
            : [...current, explanation];
        });
        if (step.attempt) setAttempt(step.attempt);
      } catch {
        // Put the answer back so nothing typed is lost.
        setTurns((current) => current.slice(0, -1));
        setAnswer(learnerText === PASSED_TEXT ? "" : learnerText);
        setError("Couldn't reach the coach. Check your connection and try again.");
      }
    });
  };

  const submit = () => {
    const text = answer.trim();
    if (!text) {
      setError("Write or say an answer first, or pass this question.");
      return;
    }
    send(text, () => answerQuestion(sessionId, text));
  };

  const pass = () => send(PASSED_TEXT, () => passQuestion(sessionId));

  return (
    <section aria-labelledby="coach-heading" className="flex flex-col gap-4">
      <SectionHeading id="coach-heading" eyebrow="Work it through" title="Job-site coach" />

      <ol aria-live="polite" className="flex flex-col gap-3">
        {turns.map((turn) => {
          const badge = turn.verdict && VERDICT_BADGE[turn.verdict];
          return (
            <ChatBubble
              key={turn.id}
              from={turn.from}
              label={turn.label}
              meta={badge && <StatusBadge status={badge.status} label={badge.label} />}
            >
              {turn.text}
            </ChatBubble>
          );
        })}
        {isPending && (
          <ChatBubble from="tutor" label="Coach">
            <StatusBadge status="pending" label="Checking your answer" />
          </ChatBubble>
        )}
      </ol>

      {attempt ? (
        <ProblemResult attempt={attempt} />
      ) : (
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <TextArea
            label="Your answer"
            value={answer}
            onChangeText={setAnswer}
            onSubmit={submit}
            disabled={isPending}
            placeholder={speech.isListening ? "Listening…" : "Explain it like you would to your foreman."}
            hint={
              speech.isSupported
                ? "Type or answer by voice. Press Ctrl+Enter (⌘+Enter on Mac) to send."
                : "Press Ctrl+Enter (⌘+Enter on Mac) to send."
            }
            accessory={
              speech.isSupported && (
                <VoiceInputButton
                  isListening={speech.isListening}
                  disabled={isPending}
                  onStart={speech.start}
                  onStop={speech.stop}
                />
              )
            }
          />
          {(error ?? speech.error) && (
            <Text variant="small" className="text-line-red">
              <span role="alert">{error ?? speech.error}</span>
            </Text>
          )}
          <div className="flex flex-row flex-wrap gap-3">
            <Button type="submit" label="Submit answer" isPending={isPending} />
            <Button variant="secondary" label="Pass this question" disabled={isPending} onPress={pass} />
          </div>
        </form>
      )}
      <div ref={endRef} />
    </section>
  );
}
