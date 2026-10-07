import { connection } from "next/server";
import type { LeaderboardEntry, ProblemAttempt } from "@electrical-hero/shared";
import { db } from "./mock/db";
import { findProblem, problemsForJobSite, startSession } from "./mock/tutor";

// Server-side reads for the screens. They read the in-memory mock today; each
// one maps to an Express endpoint later (noted per function) without changing
// the screens. `connection()` keeps every page rendered per request.

const withoutUserId = ({ userId: _userId, ...attempt }: ProblemAttempt & { userId: string }) => attempt;

/** GET /me */
export async function getCurrentUser() {
  await connection();
  const user = db.users.find((u) => u.id === db.currentUserId)!;
  return user;
}

/** GET /company */
export async function getCompany() {
  await connection();
  const { company } = db;
  const currentJobSite = company.jobSites.find((site) => site.id === company.currentJobSiteId)!;
  return { company, currentJobSite };
}

/** GET /badges */
export async function getBadges() {
  await connection();
  return db.badges;
}

/** GET /company/leaderboard */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  await connection();
  return [...db.users]
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      department: user.department,
      jobSiteId: user.jobSiteId,
      score: user.score,
      badgeIds: user.badgeIds,
    }));
}

/** GET /me/attempts */
export async function getHistory(limit?: number): Promise<ProblemAttempt[]> {
  await connection();
  const attempts = db.attempts
    .filter((attempt) => attempt.userId === db.currentUserId)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .map(withoutUserId);
  return limit ? attempts.slice(0, limit) : attempts;
}

/** POST /problems/:id/sessions */
export async function startProblemSession(problemId: string) {
  await connection();
  if (!findProblem(problemId)) return null;
  return startSession(db.currentUserId, problemId);
}

/** GET /job-sites/:id/problems/stats */
export async function getJobSiteProgress(jobSiteId: string) {
  await connection();
  const problems = problemsForJobSite(jobSiteId);
  const solved = new Set(
    db.attempts
      .filter((a) => a.userId === db.currentUserId && a.outcome === "solved" && a.jobSiteId === jobSiteId)
      .map((a) => a.problemId),
  );
  return { total: problems.length, solved: problems.filter((p) => solved.has(p.id)).length };
}
