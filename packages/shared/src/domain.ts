// Domain types shared by the web app, native app and API server.

export type Difficulty = "apprentice" | "journeyman" | "master";

export interface JobSite {
  id: string;
  name: string;
  city: string;
  /** Two-letter US state code; decides which code book the problems come from. */
  state: string;
  /** The code edition the state enforces, e.g. "2023 NEC". */
  codeEdition: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  jobSites: JobSite[];
  currentJobSiteId: string;
}

export type BadgeIcon = "shield" | "zap" | "award" | "flame" | "book" | "hard-hat";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: BadgeIcon;
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  department: string;
  companyId: string;
  /** The job site the user is assigned to. */
  jobSiteId: string;
  score: number;
  badgeIds: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  department: string;
  jobSiteId: string;
  score: number;
  badgeIds: string[];
}

export interface CodeReference {
  /** Article or section, e.g. "NEC 210.8(A)". */
  article: string;
  title: string;
}

export interface Problem {
  id: string;
  title: string;
  jobSiteId: string;
  /** Where on the job site the problem happens. */
  location: string;
  description: string;
  difficulty: Difficulty;
  /** Personal protective equipment to bring. */
  ppe: string[];
  tools: string[];
  references: CodeReference[];
  /** Shown as a DANGER/WARNING callout before the problem when energized equipment is involved. */
  hazard?: { tone: "danger" | "warning"; text: string };
  /** Points for answering every question right the first time. */
  points: number;
}

/** `solved`: every topic answered correctly. `incomplete`: at least one topic passed or missed. */
export type AttemptOutcome = "solved" | "incomplete";

export interface ProblemAttempt {
  id: string;
  problemId: string;
  problemTitle: string;
  difficulty: Difficulty;
  jobSiteId: string;
  outcome: AttemptOutcome;
  pointsEarned: number;
  questionsAnswered: number;
  correctAnswers: number;
  /** ISO-8601 timestamp. */
  completedAt: string;
}

// The tutor (LLM) conversation inside a problem.

export interface TutorQuestion {
  id: string;
  topic: string;
  text: string;
  /** True when the tutor is digging deeper after a wrong answer. */
  isFollowUp: boolean;
}

export type AnswerVerdict = "correct" | "incorrect" | "passed";

export interface TutorStep {
  verdict: AnswerVerdict;
  explanation: string;
  /** The next question, or null when the problem is finished. */
  nextQuestion: TutorQuestion | null;
  /** Set once the problem is finished. */
  attempt: ProblemAttempt | null;
}

export interface ProblemSession {
  sessionId: string;
  problem: Problem;
  firstQuestion: TutorQuestion;
}
