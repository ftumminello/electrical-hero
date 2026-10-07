"use client";

import { useTrainingSession } from "@electrical-hero/core/hooks/use-training-session";
import { ErrorState, LoadingState } from "@/features/shell/components/request-state";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { TextLink } from "@/features/shell/components/text-link";
import { DebriefCard } from "@/features/training/components/debrief-card";
import { CoachChat } from "../components/coach-chat";
import { ProblemBrief } from "../components/problem-brief";

export function ProblemView({ sessionId }: { sessionId: string }) {
  const training = useTrainingSession(sessionId);
  const { session } = training;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:px-6 md:py-12">
      <TextLink href="/">Back to job sites</TextLink>

      {training.isLoading && <LoadingState label="Loading the job" />}
      {training.loadError && !session && <ErrorState message={training.loadError} onRetry={training.reload} />}

      {session && (
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div
            role="region"
            aria-labelledby="problem-title"
            tabIndex={0}
            className="max-h-[36rem] min-w-0 overflow-y-auto overscroll-contain pr-2 [scrollbar-gutter:stable] lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)]"
          >
            <ProblemBrief
              mode={session.mode}
              account={training.account}
              scenario={training.scenario}
              template={training.template}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            {training.debrief && (
              <section aria-labelledby="debrief-heading" className="flex min-w-0 flex-col gap-4">
                <SectionHeading id="debrief-heading" eyebrow="Debrief" title="How you did" />
                <TextLink href="/">Start the next problem</TextLink>
                <div
                  role="region"
                  aria-labelledby="debrief-heading"
                  tabIndex={0}
                  className="max-h-[36rem] overflow-y-auto overscroll-contain [scrollbar-gutter:stable]"
                >
                  <DebriefCard debrief={training.debrief} />
                </div>
              </section>
            )}
            <CoachChat
              mode={session.mode}
              messages={training.messages}
              streamingReply={training.streamingReply}
              isCompleted={training.isCompleted}
              sendError={training.sendError}
              onSend={training.send}
              canFinish={training.canFinish}
              isGrading={training.isGrading}
              gradeError={training.gradeError}
              onFinish={training.finish}
            />
          </div>
        </div>
      )}
    </main>
  );
}
