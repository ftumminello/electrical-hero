import type { Debrief } from "@electrical-hero/shared";
import { Check, X } from "@electrical-hero/core/icons";
import { Card } from "@electrical-hero/core/shared/card";
import { StatusBadge } from "@electrical-hero/core/shared/status-badge";
import { Text } from "@electrical-hero/core/shared/text";
import { isPassing } from "@electrical-hero/core/lib/training";

function PointList({
  title,
  items,
  icon: Icon,
  iconClass,
}: {
  title: string;
  items: string[];
  icon: typeof Check;
  iconClass: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="flex flex-col gap-2">
      <Text as="h3" variant="eyebrow" className="text-ink-muted">
        {title}
      </Text>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex flex-row items-start gap-2">
            <Icon aria-hidden size={16} strokeWidth={2} className={`mt-1 shrink-0 ${iconClass}`} />
            <Text as="span">{item}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DebriefCard({ debrief }: { debrief: Debrief }) {
  const passed = isPassing(debrief.score);

  return (
    <Card as="section" className="gap-6">
      <div className="flex flex-col gap-3">
        <StatusBadge status={passed ? "success" : "error"} label={passed ? "Passed" : "Needs work"} />
        <div className="flex flex-row items-baseline gap-2">
          <span className="text-ink type-display-xl">{Math.round(debrief.score)}</span>
          <Text as="span" variant="spec" className="text-ink-muted">
            / 100
          </Text>
        </div>
        <Text variant="body-l">{debrief.verdict}</Text>
      </div>

      <PointList title="What you did well" items={debrief.strengths} icon={Check} iconClass="text-ground" />
      <PointList title="What to work on" items={debrief.gaps} icon={X} iconClass="text-line-red" />

      {debrief.ruleViolations.length > 0 && (
        <section className="flex flex-col gap-2">
          <Text as="h3" variant="eyebrow" className="text-ink-muted">
            Company rules broken
          </Text>
          <ul className="flex flex-col gap-3">
            {debrief.ruleViolations.map((violation, i) => (
              <li key={i} className="flex flex-col gap-1">
                <Text variant="spec" className="text-line-red">
                  {violation.ruleId}
                </Text>
                <Text className="text-ink-muted">“{violation.evidence}”</Text>
              </li>
            ))}
          </ul>
        </section>
      )}

      {debrief.rubric.length > 0 && (
        <section className="flex flex-col gap-2">
          <Text as="h3" variant="eyebrow" className="text-ink-muted">
            Rubric · {debrief.rubric.filter((r) => r.met).length} of {debrief.rubric.length} met
          </Text>
          <ul className="flex flex-col divide-y divide-border rounded border border-border">
            {debrief.rubric.map((item, i) => (
              <li key={i} className="flex flex-col gap-1 p-3">
                <div className="flex flex-row flex-wrap items-center gap-2">
                  <StatusBadge status={item.met ? "success" : "error"} label={item.met ? "Met" : "Missed"} />
                  <Text as="span" className="font-semibold">
                    {item.criterion}
                  </Text>
                </div>
                <Text variant="small" className="text-ink-muted">
                  {item.evidence}
                </Text>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Card>
  );
}
