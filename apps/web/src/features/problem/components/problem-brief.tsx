import type { AccountDetail, ScenarioPublic, ScenarioTemplateSummary, SessionMode } from "@electrical-hero/shared";
import { BookOpen, MapPin, Phone, Wrench } from "@electrical-hero/core/icons";
import { Callout } from "@electrical-hero/core/shared/callout";
import { Card } from "@electrical-hero/core/shared/card";
import { DifficultyBadge } from "@electrical-hero/core/shared/difficulty-badge";
import { Markdown } from "@electrical-hero/core/shared/markdown";
import { Text } from "@electrical-hero/core/shared/text";
import { formatAddress } from "@electrical-hero/core/lib/training";

type ProblemBriefProps = {
  mode: SessionMode;
  account: AccountDetail | null;
  scenario: ScenarioPublic | null;
  template: ScenarioTemplateSummary | null;
};

const humanize = (slug: string) => slug.replace(/-/g, " ");

export function ProblemBrief({ mode, account, scenario, template }: ProblemBriefProps) {
  const title = scenario?.title ?? (account ? `Site briefing: ${account.name}` : "Site briefing");

  return (
    <section aria-labelledby="problem-title" className="flex min-w-0 flex-col gap-6 [overflow-wrap:anywhere]">
      <div className="flex flex-col gap-3">
        {account && (
          <p className="flex flex-row items-center gap-2 text-ink-muted type-eyebrow">
            <MapPin aria-hidden size={16} strokeWidth={2} className="shrink-0" />
            {account.name}
          </p>
        )}
        <h1 id="problem-title" className="text-ink type-display-l">
          {title}
        </h1>
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
          {scenario && <DifficultyBadge difficulty={scenario.difficulty} />}
          {account && (
            <Text variant="small" className="text-ink-muted">
              {formatAddress(account.address)}
            </Text>
          )}
        </div>
      </div>

      {account && (
        <Callout tone="danger" label="Know before you go">
          <Text>{account.criticalInfo}</Text>
        </Callout>
      )}

      {mode === "scenario" && scenario ? (
        <Card as="section" className="gap-2">
          <Text as="h2" variant="eyebrow" className="text-ink-muted">
            The call
          </Text>
          <Text variant="body-l">{scenario.briefing}</Text>
        </Card>
      ) : (
        <Text variant="body-l">
          Ask the account lead anything before you head out: hazards, where to isolate, access, and which company rules
          apply here.
        </Text>
      )}

      {template && (
        <Card as="section" className="gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <BookOpen aria-hidden size={16} strokeWidth={2} className="text-steel" />
              <Text as="h2" variant="label">
                Company rules in play
              </Text>
            </div>
            <ul className="flex flex-row flex-wrap gap-2">
              {template.rules.map((rule) => (
                <li key={rule}>
                  <Text variant="spec">{rule}</Text>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Wrench aria-hidden size={16} strokeWidth={2} className="text-steel" />
              <Text as="h2" variant="label">
                Skills tested
              </Text>
            </div>
            <Text className="capitalize">{template.skills.map(humanize).join(" · ")}</Text>
          </div>
        </Card>
      )}

      {account && (
        <details className="group rounded border border-border bg-surface-200">
          <summary className="flex min-h-11 cursor-pointer list-none flex-row items-center justify-between gap-2 rounded px-4 py-3 text-ink type-label">
            Site file: equipment, panels and safety notes
            <span aria-hidden className="text-steel group-open:rotate-90">
              ›
            </span>
          </summary>
          <div className="flex flex-col gap-4 border-t border-border p-4">
            {account.siteContact.name && (
              <p className="flex min-w-0 flex-row flex-wrap items-center gap-2 text-ink type-small">
                <Phone aria-hidden size={14} strokeWidth={2} className="shrink-0 text-steel" />
                {account.siteContact.name}
                {account.siteContact.phone && <Text variant="spec">{account.siteContact.phone}</Text>}
              </p>
            )}
            <Markdown content={account.configMarkdown} />
          </div>
        </details>
      )}
    </section>
  );
}
