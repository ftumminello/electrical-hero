import type { Difficulty, SessionMode } from "@electrical-hero/shared";

/** The grade a debrief gave, kept so history and stats work without refetching every session. */
export type TrainingGrade = {
  score: number;
  verdict: string;
  ruleViolations: number;
  rubricMet: number;
  rubricTotal: number;
  gradedAt: string;
};

/** One training session this device started. The API has no per-trainee history yet, so it lives here. */
export type TrainingRecord = {
  sessionId: string;
  mode: SessionMode;
  accountId: string;
  accountName: string;
  scenarioId: string | null;
  /** Scenario title, or "Site briefing". */
  title: string;
  difficulty: Difficulty | null;
  startedAt: string;
  grade: TrainingGrade | null;
};

export type TraineeState = {
  /** Sent as `traineeName` when starting sessions. */
  traineeName: string | null;
  /** The job site (account) the trainee picked. */
  currentAccountId: string | null;
  /** Newest first. */
  history: TrainingRecord[];
};

export type TraineeContextValue = TraineeState & {
  /** False until the saved state has been read from storage. */
  isLoaded: boolean;
  setTraineeName: (name: string) => void;
  setCurrentAccountId: (accountId: string) => void;
  addRecord: (record: TrainingRecord) => void;
  setGrade: (sessionId: string, grade: TrainingGrade) => void;
};
