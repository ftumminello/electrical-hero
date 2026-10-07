import type { AnswerVerdict, ProblemAttempt, ProblemSession, TutorQuestion, TutorStep } from "@electrical-hero/shared";
import { db, type TutorSessionState } from "./db";
import { PROBLEMS, type ScriptedProblem, type ScriptedQuestion } from "./problems";

// Stand-in for the LLM tutor. Same flow the real one will follow:
// ask → learner answers → explain → wrong: dig deeper on the same topic, right: move to the next topic.
// One follow-up per topic, then it moves on so a learner never gets stuck.

const toPublicProblem = ({ topics: _topics, ...problem }: ScriptedProblem) => problem;

const questionFor = (problem: ScriptedProblem, state: TutorSessionState): TutorQuestion => {
  const topic = problem.topics[state.topicIndex]!;
  const scripted = state.onFollowUp ? topic.followUp : topic;
  return {
    id: `${problem.id}:${state.topicIndex}:${state.onFollowUp ? "follow-up" : "main"}`,
    topic: topic.topic,
    text: scripted.text,
    isFollowUp: state.onFollowUp,
  };
};

const isCorrect = (question: ScriptedQuestion, answer: string) => question.accept.some((pattern) => pattern.test(answer));

const finish = (problem: ScriptedProblem, state: TutorSessionState): ProblemAttempt => {
  state.finished = true;
  const attempt = {
    id: `a-${state.sessionId}`,
    userId: state.userId,
    problemId: problem.id,
    problemTitle: problem.title,
    difficulty: problem.difficulty,
    jobSiteId: problem.jobSiteId,
    outcome: state.topicsCorrect === problem.topics.length ? "solved" : "incomplete",
    pointsEarned: state.pointsEarned,
    questionsAnswered: state.questionsAnswered,
    correctAnswers: state.correctAnswers,
    completedAt: new Date().toISOString(),
  } satisfies ProblemAttempt & { userId: string };

  db.attempts.unshift(attempt);
  const user = db.users.find((u) => u.id === state.userId);
  if (user) user.score += state.pointsEarned;

  const { userId: _userId, ...publicAttempt } = attempt;
  return publicAttempt;
};

export function findProblem(problemId: string) {
  const problem = PROBLEMS.find((p) => p.id === problemId);
  return problem ? toPublicProblem(problem) : null;
}

export function problemsForJobSite(jobSiteId: string) {
  return PROBLEMS.filter((p) => p.jobSiteId === jobSiteId).map(toPublicProblem);
}

export function startSession(userId: string, problemId: string): ProblemSession | null {
  const problem = PROBLEMS.find((p) => p.id === problemId);
  if (!problem) return null;

  const state: TutorSessionState = {
    sessionId: crypto.randomUUID(),
    userId,
    problemId,
    topicIndex: 0,
    onFollowUp: false,
    topicsCorrect: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    pointsEarned: 0,
    finished: false,
  };
  db.sessions.set(state.sessionId, state);

  return { sessionId: state.sessionId, problem: toPublicProblem(problem), firstQuestion: questionFor(problem, state) };
}

/** `answer: null` means the learner passed the question. */
export function advanceSession(userId: string, sessionId: string, answer: string | null): TutorStep {
  const state = db.sessions.get(sessionId);
  if (!state || state.userId !== userId || state.finished) throw new Error("This problem session has ended.");
  const problem = PROBLEMS.find((p) => p.id === state.problemId)!;

  const topic = problem.topics[state.topicIndex]!;
  const scripted = state.onFollowUp ? topic.followUp : topic;
  const pointsPerTopic = Math.round(problem.points / problem.topics.length);

  let verdict: AnswerVerdict;
  if (answer === null) {
    verdict = "passed";
  } else {
    state.questionsAnswered += 1;
    verdict = isCorrect(scripted, answer) ? "correct" : "incorrect";
  }

  if (verdict === "correct") {
    state.correctAnswers += 1;
    state.topicsCorrect += 1;
    // Full points on the first try, half after a follow-up.
    state.pointsEarned += state.onFollowUp ? Math.round(pointsPerTopic / 2) : pointsPerTopic;
  }

  // Wrong on the main question → dig deeper with the follow-up. Otherwise → next topic.
  if (verdict === "incorrect" && !state.onFollowUp) {
    state.onFollowUp = true;
  } else {
    state.topicIndex += 1;
    state.onFollowUp = false;
  }

  const done = state.topicIndex >= problem.topics.length;
  return {
    verdict,
    explanation: scripted.explanation,
    nextQuestion: done ? null : questionFor(problem, state),
    attempt: done ? finish(problem, state) : null,
  };
}
