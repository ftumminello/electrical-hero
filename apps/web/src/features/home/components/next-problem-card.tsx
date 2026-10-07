import type { JobSite } from "@electrical-hero/shared";
import { Button } from "@electrical-hero/core/shared/button";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { startNextProblem } from "@/lib/api/actions";

type NextProblemCardProps = {
  jobSite: JobSite;
  progress: { total: number; solved: number };
};

export function NextProblemCard({ jobSite, progress }: NextProblemCardProps) {
  const percent = progress.total ? Math.round((progress.solved / progress.total) * 100) : 0;

  return (
    <Card as="section" className="gap-4">
      <Text variant="eyebrow" className="text-ink-muted">
        Next problem
      </Text>
      <Text variant="display-l" as="h2">
        Ready for the next call?
      </Text>
      <Text variant="body-l">
        You'll get a random problem from the {jobSite.name} job, based on the{" "}
        <Text variant="spec">{jobSite.codeEdition}</Text> as adopted in {jobSite.state}. You won't know what it is
        until you start.
      </Text>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between gap-4">
          <Text as="span" variant="small" className="text-ink-muted">
            Solved at this job site
          </Text>
          <Text variant="spec">
            {progress.solved} / {progress.total}
          </Text>
        </div>
        <div
          role="progressbar"
          aria-label="Problems solved at this job site"
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-valuenow={progress.solved}
          className="h-2 overflow-hidden rounded-sm bg-surface-300"
        >
          <div className="h-full bg-voltage" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <form action={startNextProblem}>
        <Button type="submit" label="Start next problem" className="w-full sm:w-auto" />
      </form>
    </Card>
  );
}
