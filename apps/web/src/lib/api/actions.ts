"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { TutorStep } from "@electrical-hero/shared";
import { db } from "./mock/db";
import { advanceSession, problemsForJobSite } from "./mock/tutor";

// Mutations, called from forms and client components. Like the queries, each
// maps to an Express endpoint later. Auth checks go here once there is auth.
// Pages render per request (see queries.ts), so only changeJobSite needs to
// refresh the page it's called from.

const MAX_ANSWER_LENGTH = 2_000;

/** PATCH /company { currentJobSiteId } */
export async function changeJobSite(jobSiteId: string) {
  if (!db.company.jobSites.some((site) => site.id === jobSiteId)) throw new Error("Unknown job site.");
  db.company.currentJobSiteId = jobSiteId;
  revalidatePath("/", "layout");
}

/** GET /problems/next — a random problem from the current job site; the learner doesn't choose. */
export async function startNextProblem() {
  const problems = problemsForJobSite(db.company.currentJobSiteId);
  const solved = new Set(
    db.attempts.filter((a) => a.userId === db.currentUserId && a.outcome === "solved").map((a) => a.problemId),
  );
  // Prefer problems not solved yet; once all are solved, any of them can come back.
  const unsolved = problems.filter((p) => !solved.has(p.id));
  const pool = unsolved.length > 0 ? unsolved : problems;
  const problem = pool[Math.floor(Math.random() * pool.length)];
  if (!problem) throw new Error("No problems for this job site yet.");
  redirect(`/problem/${problem.id}`);
}

/** POST /sessions/:id/answers */
export async function answerQuestion(sessionId: string, answer: string): Promise<TutorStep> {
  const text = answer.trim().slice(0, MAX_ANSWER_LENGTH);
  if (!text) throw new Error("Write or say an answer first.");
  return advanceSession(db.currentUserId, sessionId, text);
}

/** POST /sessions/:id/pass */
export async function passQuestion(sessionId: string): Promise<TutorStep> {
  return advanceSession(db.currentUserId, sessionId, null);
}
