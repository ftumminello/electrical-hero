import type { JobSite, Problem } from "@electrical-hero/shared";
import { Check, HardHat, MapPin, Wrench } from "@electrical-hero/core/icons";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Card } from "@electrical-hero/core/shared/card";
import { DifficultyBadge } from "@electrical-hero/core/shared/difficulty-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { formatJobSite, formatPoints } from "@/lib/format";

type ProblemBriefProps = {
  problem: Problem;
  jobSite: JobSite | undefined;
};

function GearList({ title, icon: Icon, items }: { title: string; icon: typeof HardHat; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Icon aria-hidden size={16} strokeWidth={2} className="text-steel" />
        <Text as="h3" variant="label">
          {title}
        </Text>
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="flex flex-row items-start gap-2">
            <Check aria-hidden size={16} strokeWidth={2} className="mt-1 shrink-0 text-ground" />
            <Text as="span">{item}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProblemBrief({ problem, jobSite }: ProblemBriefProps) {
  return (
    <section aria-labelledby="problem-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="flex flex-row items-center gap-2 text-ink-muted type-eyebrow">
          <MapPin aria-hidden size={16} strokeWidth={2} className="shrink-0" />
          {problem.location}
        </p>
        <h1 id="problem-title" className="text-ink type-display-l">
          {problem.title}
        </h1>
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
          <DifficultyBadge difficulty={problem.difficulty} />
          <Text variant="spec" className="text-ink-muted">
            Up to {formatPoints(problem.points)}
          </Text>
          {jobSite && (
            <Text variant="small" className="text-ink-muted">
              {formatJobSite(jobSite)} · <Text variant="spec">{jobSite.codeEdition}</Text>
            </Text>
          )}
        </div>
      </div>

      {problem.hazard && <Callout tone={problem.hazard.tone}>{problem.hazard.text}</Callout>}

      <Text variant="body-l">{problem.description}</Text>

      <Card as="section">
        <Text as="h2" variant="eyebrow" className="text-ink-muted">
          Bring to the job
        </Text>
        <div className="grid gap-4 sm:grid-cols-2">
          <GearList title="PPE" icon={HardHat} items={problem.ppe} />
          <GearList title="Tools" icon={Wrench} items={problem.tools} />
        </div>
      </Card>

      <section aria-labelledby="problem-references" className="flex flex-col gap-2">
        <h2 id="problem-references" className="text-ink-muted type-eyebrow">
          Code references
        </h2>
        <ul className="flex flex-col gap-2">
          {problem.references.map((ref) => (
            <li key={ref.article} className="flex flex-row flex-wrap items-baseline gap-x-2">
              <Text variant="spec">{ref.article}</Text>
              <Text as="span" variant="small" className="text-ink-muted">
                {ref.title}
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
