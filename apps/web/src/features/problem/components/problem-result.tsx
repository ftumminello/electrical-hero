import type { ProblemAttempt } from "@electrical-hero/shared";
import { Button } from "@electrical-hero/core/shared/button";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { startNextProblem } from "@/lib/api/actions";
import { formatPoints } from "@/lib/format";
import { TextLink } from "@/features/shell/components/text-link";

export function ProblemResult({ attempt }: { attempt: ProblemAttempt }) {
  const solved = attempt.outcome === "solved";

  return (
    <Card as="section" className="gap-4">
      {solved ? (
        <StatusBadge status="success" label="Problem solved" />
      ) : (
        <StatusBadge status="error" label="Not solved yet" />
      )}
      <Text variant="heading">
        {solved ? "Nice work. You're ready for this one on the job." : "Review the explanations above and try another."}
      </Text>
      <dl className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <dt className="text-ink-muted type-eyebrow">Points earned</dt>
          <dd className="text-ink type-heading">{formatPoints(attempt.pointsEarned)}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-ink-muted type-eyebrow">Correct answers</dt>
          <dd className="text-ink type-heading">
            {attempt.correctAnswers} of {attempt.questionsAnswered}
          </dd>
        </div>
      </dl>
      <div className="flex flex-row flex-wrap items-center gap-4">
        <form action={startNextProblem}>
          <Button type="submit" label="Start next problem" />
        </form>
        <TextLink href="/history">See your problem history</TextLink>
      </div>
    </Card>
  );
}
