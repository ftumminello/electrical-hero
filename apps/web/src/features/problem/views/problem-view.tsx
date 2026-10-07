import type { JobSite, ProblemSession } from "@electrical-hero/shared";
import { TextLink } from "@/features/shell/components/text-link";
import { ProblemBrief } from "../components/problem-brief";
import { TutorPanel } from "../components/tutor-panel";

type ProblemViewProps = {
  session: ProblemSession;
  jobSite: JobSite | undefined;
};

export function ProblemView({ session, jobSite }: ProblemViewProps) {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:px-6 md:py-12">
      <TextLink href="/history">Problems you've overcome</TextLink>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
        <div className="lg:sticky lg:top-6">
          <ProblemBrief problem={session.problem} jobSite={jobSite} />
        </div>
        <TutorPanel sessionId={session.sessionId} firstQuestion={session.firstQuestion} />
      </div>
    </main>
  );
}
