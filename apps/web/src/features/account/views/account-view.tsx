import type { Badge, Company, JobSite, ProblemAttempt, User } from "@electrical-hero/shared";
import { Building2, MapPin } from "@electrical-hero/core/icons";
import { Avatar } from "@electrical-hero/core/shared/avatar";
import { BadgeChip } from "@electrical-hero/core/shared/badge-chip";
import { Card } from "@electrical-hero/core/shared/card";
import { Text } from "@electrical-hero/core/shared/text";
import { ThemeToggle } from "@electrical-hero/core/shared/theme-toggle";
import { formatPoints, ordinal } from "@/lib/format";
import { AttemptList } from "@/features/history/components/attempt-list";
import { HistorySummary } from "@/features/history/components/history-summary";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { TextLink } from "@/features/shell/components/text-link";

type AccountViewProps = {
  user: User;
  rank: number;
  companySize: number;
  company: Company;
  currentJobSite: JobSite;
  badges: Badge[];
  attempts: ProblemAttempt[];
};

export function AccountView({ user, rank, companySize, company, currentJobSite, badges, attempts }: AccountViewProps) {
  const earned = badges.filter((badge) => user.badgeIds.includes(badge.id));

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card as="section" className="gap-6 sm:flex-row sm:items-center">
          <Avatar name={user.name} src={user.avatarUrl} size="lg" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Text variant="display-l">{user.name}</Text>
              <Text className="text-ink-muted">
                {user.role} · {user.department}
              </Text>
            </div>
            <dl className="flex flex-row flex-wrap gap-x-8 gap-y-3">
              <div className="flex flex-col gap-1">
                <dt className="text-ink-muted type-eyebrow">Score</dt>
                <dd className="text-ink type-heading">{formatPoints(user.score)}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-ink-muted type-eyebrow">Company rank</dt>
                <dd className="text-ink type-heading">
                  {ordinal(rank)} <span className="text-ink-muted type-small">of {companySize}</span>
                </dd>
              </div>
            </dl>
            <TextLink href="/leaderboard">Company leaderboard</TextLink>
          </div>
        </Card>

        <Card as="section" className="gap-4">
          <Text as="h2" variant="eyebrow" className="text-ink-muted">
            Company
          </Text>
          <div className="flex flex-row items-center gap-3">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt="" className="h-12 w-12 rounded object-contain" />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-surface-inverse">
                <Building2 aria-hidden size={24} strokeWidth={2} className="text-voltage" />
              </span>
            )}
            <Text variant="heading" as="p">
              {company.name}
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text as="h3" variant="label" className="text-ink-muted">
              Current job site
            </Text>
            <p className="flex flex-row items-center gap-2 text-ink type-body">
              <MapPin aria-hidden size={16} strokeWidth={2} className="shrink-0 text-steel" />
              {currentJobSite.name} · {currentJobSite.city}, {currentJobSite.state}
            </p>
            <Text variant="small" className="text-ink-muted">
              Problems follow the <Text variant="spec">{currentJobSite.codeEdition}</Text>
            </Text>
          </div>
        </Card>
      </div>

      <section aria-labelledby="badges-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="badges-heading"
          eyebrow={`${earned.length} of ${badges.length} earned`}
          title="Badges"
        />
        {earned.length === 0 ? (
          <Text className="text-ink-muted">Solve your first problem to earn a badge.</Text>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {earned.map((badge) => (
              <li key={badge.id} className="flex flex-col gap-2 rounded border border-border bg-surface-200 p-4">
                <BadgeChip label={badge.name} icon={badge.icon} />
                <Text variant="small" className="text-ink-muted">
                  {badge.description}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="account-history-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="account-history-heading"
          eyebrow="Your track record"
          title="Problems you've overcome"
          action={<TextLink href="/history">See all</TextLink>}
        />
        <HistorySummary attempts={attempts} />
        <AttemptList attempts={attempts.slice(0, 3)} emptyText="Start your first problem to build your history." />
      </section>

      <section aria-labelledby="appearance-heading" className="flex flex-col gap-3">
        <SectionHeading id="appearance-heading" title="Appearance" />
        <ThemeToggle />
      </section>
    </main>
  );
}
