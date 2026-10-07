import type { BadgeIcon } from "../../shared/badge-chip";
import type { TrainingRecord } from "../../providers/trainee-provider";

export type BadgeDefinition = {
  id: string;
  name: string;
  description: string;
  icon: BadgeIcon;
  isEarned: (graded: TrainingRecord[]) => boolean;
};

// Earned from debrief grades in this device's history; there's no server-side badge store yet.
export const BADGES: BadgeDefinition[] = [
  {
    id: "first-call",
    name: "First Call",
    description: "Finished and got graded on your first session.",
    icon: "zap",
    isEarned: (graded) => graded.length > 0,
  },
  {
    id: "well-briefed",
    name: "Well Briefed",
    description: "Prepared for a site with a graded briefing.",
    icon: "book",
    isEarned: (graded) => graded.some((r) => r.mode === "briefing"),
  },
  {
    id: "safety-first",
    name: "Safety First",
    description: "Scored 80 or more on a scenario.",
    icon: "hard-hat",
    isEarned: (graded) => graded.some((r) => r.mode === "scenario" && r.grade!.score >= 80),
  },
  {
    id: "by-the-book",
    name: "By the Book",
    description: "Finished a scenario with no company rule violations.",
    icon: "shield",
    isEarned: (graded) => graded.some((r) => r.mode === "scenario" && r.grade!.ruleViolations === 0),
  },
  {
    id: "hot-streak",
    name: "Hot Streak",
    description: "Scored 70 or more three sessions in a row.",
    icon: "flame",
    isEarned: (graded) => {
      let run = 0;
      for (const r of graded) {
        run = r.grade!.score >= 70 ? run + 1 : 0;
        if (run >= 3) return true;
      }
      return false;
    },
  },
  {
    id: "site-hopper",
    name: "Site Hopper",
    description: "Trained at three different customer sites.",
    icon: "award",
    isEarned: (graded) => new Set(graded.map((r) => r.accountId)).size >= 3,
  },
];

/** Score, averages and badges from the trainee's local history. */
export function getTrainingStats(history: TrainingRecord[]) {
  // Oldest first so streaks read in order.
  const graded = history.filter((r) => r.grade).reverse();
  const scores = graded.map((r) => r.grade!.score);
  return {
    sessions: history.length,
    graded: graded.length,
    /** Ranking points: the sum of every debrief score. */
    points: Math.round(scores.reduce((sum, s) => sum + s, 0)),
    averageScore: scores.length ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : null,
    bestScore: scores.length ? Math.round(Math.max(...scores)) : null,
    badges: BADGES.map(({ isEarned, ...badge }) => ({ ...badge, earned: isEarned(graded) })),
  };
}

export type TrainingStats = ReturnType<typeof getTrainingStats>;
