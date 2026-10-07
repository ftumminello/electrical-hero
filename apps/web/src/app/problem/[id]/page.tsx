import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompany, startProblemSession } from "@/lib/api/queries";
import { ProblemView } from "@/features/problem/views/problem-view";

export const metadata: Metadata = { title: "Problem" };

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [session, { company }] = await Promise.all([startProblemSession(id), getCompany()]);
  if (!session) notFound();

  const jobSite = company.jobSites.find((site) => site.id === session.problem.jobSiteId);
  return <ProblemView session={session} jobSite={jobSite} />;
}
