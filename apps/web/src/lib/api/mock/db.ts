import type { Badge, Company, ProblemAttempt, User } from "@electrical-hero/shared";

// In-memory stand-in for the API server's database. Lives on globalThis so it
// survives module reloads in `next dev`; resets when the server restarts.

export interface TutorSessionState {
  sessionId: string;
  userId: string;
  problemId: string;
  topicIndex: number;
  onFollowUp: boolean;
  /** Topics answered right, on the first try or the follow-up. */
  topicsCorrect: number;
  questionsAnswered: number;
  correctAnswers: number;
  pointsEarned: number;
  finished: boolean;
}

export interface MockDb {
  currentUserId: string;
  company: Company;
  users: User[];
  badges: Badge[];
  attempts: (ProblemAttempt & { userId: string })[];
  sessions: Map<string, TutorSessionState>;
}

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();

const seed = (): MockDb => ({
  currentUserId: "u-jordan",
  company: {
    id: "c-lonestar",
    name: "Lone Star Electric Co.",
    currentJobSiteId: "js-austin",
    jobSites: [
      { id: "js-austin", name: "Mueller Lofts", city: "Austin", state: "TX", codeEdition: "2023 NEC" },
      { id: "js-denver", name: "RiNo Commons", city: "Denver", state: "CO", codeEdition: "2023 NEC" },
      { id: "js-tampa", name: "Harbour Isles", city: "Tampa", state: "FL", codeEdition: "2020 NEC" },
    ],
  },
  badges: [
    { id: "b-first-circuit", name: "First Circuit", description: "Solved your first problem.", icon: "zap" },
    { id: "b-safety-first", name: "Safety First", description: "Named the right PPE five times.", icon: "hard-hat" },
    { id: "b-code-reader", name: "Code Reader", description: "Cited 10 NEC articles correctly.", icon: "book" },
    { id: "b-streak", name: "Hot Streak", description: "Five correct answers in a row.", icon: "flame" },
    { id: "b-grounded", name: "Grounded", description: "Mastered grounding and bonding.", icon: "shield" },
    { id: "b-journeyman", name: "Journeyman Ready", description: "Solved 10 journeyman problems.", icon: "award" },
  ],
  users: [
    { id: "u-jordan", name: "Jordan Reyes", role: "2nd-year apprentice", department: "Residential", companyId: "c-lonestar", jobSiteId: "js-austin", score: 1240, badgeIds: ["b-first-circuit", "b-safety-first", "b-streak"] },
    { id: "u-maria", name: "María Delgado", role: "Journeyman", department: "Commercial", companyId: "c-lonestar", jobSiteId: "js-denver", score: 2310, badgeIds: ["b-first-circuit", "b-code-reader", "b-journeyman", "b-grounded"] },
    { id: "u-dwayne", name: "Dwayne Carter", role: "Foreman", department: "Commercial", companyId: "c-lonestar", jobSiteId: "js-austin", score: 1985, badgeIds: ["b-first-circuit", "b-safety-first", "b-code-reader"] },
    { id: "u-priya", name: "Priya Shah", role: "4th-year apprentice", department: "Industrial", companyId: "c-lonestar", jobSiteId: "js-denver", score: 1720, badgeIds: ["b-first-circuit", "b-streak", "b-grounded"] },
    { id: "u-tom", name: "Tom Becker", role: "Journeyman", department: "Residential", companyId: "c-lonestar", jobSiteId: "js-tampa", score: 1515, badgeIds: ["b-first-circuit", "b-safety-first"] },
    { id: "u-aisha", name: "Aisha Johnson", role: "3rd-year apprentice", department: "Residential", companyId: "c-lonestar", jobSiteId: "js-austin", score: 1105, badgeIds: ["b-first-circuit", "b-code-reader"] },
    { id: "u-luis", name: "Luis Romero", role: "1st-year apprentice", department: "Commercial", companyId: "c-lonestar", jobSiteId: "js-tampa", score: 860, badgeIds: ["b-first-circuit"] },
    { id: "u-kevin", name: "Kevin Nguyen", role: "2nd-year apprentice", department: "Industrial", companyId: "c-lonestar", jobSiteId: "js-denver", score: 745, badgeIds: ["b-safety-first"] },
    { id: "u-sam", name: "Sam O'Brien", role: "1st-year apprentice", department: "Residential", companyId: "c-lonestar", jobSiteId: "js-tampa", score: 410, badgeIds: [] },
  ],
  attempts: [
    { id: "a-1", userId: "u-jordan", problemId: "p-tampa-patio-receptacle", problemTitle: "Outdoor receptacle on a condo patio", difficulty: "apprentice", jobSiteId: "js-tampa", outcome: "solved", pointsEarned: 100, questionsAnswered: 2, correctAnswers: 2, completedAt: daysAgo(2) },
    { id: "a-2", userId: "u-jordan", problemId: "p-denver-continuous-load", problemTitle: "Sizing a continuous lighting circuit", difficulty: "journeyman", jobSiteId: "js-denver", outcome: "incomplete", pointsEarned: 75, questionsAnswered: 4, correctAnswers: 2, completedAt: daysAgo(6) },
    { id: "a-3", userId: "u-jordan", problemId: "p-legacy-service-ground", problemTitle: "Grounding electrode for a new service", difficulty: "journeyman", jobSiteId: "js-austin", outcome: "solved", pointsEarned: 150, questionsAnswered: 3, correctAnswers: 2, completedAt: daysAgo(11) },
    { id: "a-4", userId: "u-jordan", problemId: "p-legacy-afci", problemTitle: "AFCI protection for bedroom circuits", difficulty: "apprentice", jobSiteId: "js-austin", outcome: "solved", pointsEarned: 100, questionsAnswered: 2, correctAnswers: 2, completedAt: daysAgo(19) },
  ],
  sessions: new Map(),
});

const globalForDb = globalThis as typeof globalThis & { __electricalHeroDb?: MockDb };

export const db: MockDb = (globalForDb.__electricalHeroDb ??= seed());
