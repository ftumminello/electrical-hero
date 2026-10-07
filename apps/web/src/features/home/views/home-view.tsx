import type { Company, JobSite, ProblemAttempt, User } from "@electrical-hero/shared";
import { MapPin } from "@electrical-hero/core/icons";
import { HazardStripes } from "@electrical-hero/core/shared/hazard-stripes";
import { Text } from "@electrical-hero/core/shared/text";
import { formatPoints, ordinal } from "@/lib/format";
import { AttemptList } from "@/features/history/components/attempt-list";
import { SectionHeading } from "@/features/shell/components/section-heading";
import { TextLink } from "@/features/shell/components/text-link";
import { JobSitePicker } from "../components/job-site-picker";
import { NextProblemCard } from "../components/next-problem-card";

type HomeViewProps = {
  user: User;
  rank: number;
  company: Company;
  currentJobSite: JobSite;
  progress: { total: number; solved: number };
  recentAttempts: ProblemAttempt[];
};

export function HomeView({ user, rank, company, currentJobSite, progress, recentAttempts }: HomeViewProps) {
  const firstName = user.name.split(" ")[0];

  return (
    <>
      <section className="bg-surface-inverse">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-12 md:px-6">
          <Text variant="eyebrow" className="text-voltage">
            {company.name}
          </Text>
          <Text variant="display-xl" className="text-ink-inverse">
            Welcome back, {firstName}
          </Text>
          <p className="flex flex-row items-center gap-2 text-ink-inverse type-body-l">
            <MapPin aria-hidden size={18} strokeWidth={2} className="shrink-0" />
            {currentJobSite.name} · {currentJobSite.city}, {currentJobSite.state}
          </p>
          <Text variant="spec" className="text-ink-inverse">
            {formatPoints(user.score)} · {ordinal(rank)} in the company
          </Text>
        </div>
      </section>
      <HazardStripes />

      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <NextProblemCard jobSite={currentJobSite} progress={progress} />
          <section aria-labelledby="job-site-heading" className="flex flex-col gap-4">
            <SectionHeading id="job-site-heading" eyebrow="Where you're working" title="Job site" />
            <JobSitePicker jobSites={company.jobSites} currentJobSiteId={company.currentJobSiteId} />
          </section>
        </div>

        <section aria-labelledby="history-heading" className="flex flex-col gap-4">
          <SectionHeading
            id="history-heading"
            eyebrow="Your track record"
            title="Problems you've overcome"
            action={<TextLink href="/history">See all</TextLink>}
          />
          <AttemptList attempts={recentAttempts} emptyText="Start your first problem to build your history." />
        </section>
      </main>
    </>
  );
}
