import { useEffect, useState } from "react";
import type { ChatMessage, Debrief } from "@electrical-hero/shared";
import { errorMessage } from "../../api";
import { useApi } from "../../providers/api-provider";
import { useTrainee, type TrainingGrade } from "../../providers/trainee-provider";
import { useRequest } from "../use-request";

export const gradeFromDebrief = (debrief: Debrief): TrainingGrade => ({
  score: debrief.score,
  verdict: debrief.verdict,
  ruleViolations: debrief.ruleViolations.length,
  rubricMet: debrief.rubric.filter((item) => item.met).length,
  rubricTotal: debrief.rubric.length,
  gradedAt: new Date().toISOString(),
});

/**
 * Everything the problem screen needs for one session: the transcript, the
 * scenario and site it belongs to, streamed replies, and the debrief.
 */
export function useTrainingSession(sessionId: string) {
  const api = useApi();
  const trainee = useTrainee();

  const session = useRequest(`session:${sessionId}`, () => api.getSession(sessionId));
  const scenarioId = session.data?.scenarioId ?? null;
  const accountId = session.data?.accountId ?? null;
  const scenario = useRequest(scenarioId && `scenario:${scenarioId}`, () => api.getScenario(scenarioId!));
  const account = useRequest(accountId && `account:${accountId}`, () => api.getAccount(accountId!));
  const templates = useRequest(scenarioId && "templates", () => api.listTemplates());
  const template = templates.data?.find((t) => t.id === scenario.data?.templateId) ?? null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [debrief, setDebrief] = useState<Debrief | null>(null);
  /** The assistant reply as it streams in; null when nothing is streaming. */
  const [streamingReply, setStreamingReply] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeError, setGradeError] = useState<string | null>(null);

  // The server's copy wins whenever it (re)loads.
  useEffect(() => {
    if (!session.data) return;
    setMessages(session.data.messages);
    setDebrief(session.data.debrief);
  }, [session.data]);

  const isStreaming = streamingReply !== null;
  const isCompleted = debrief !== null || session.data?.status === "completed";
  const hasTraineeMessage = messages.some((m) => m.role === "user");

  /** Sends what the electrician says or does. Resolves false if it failed (put the text back in the box). */
  const send = async (content: string): Promise<boolean> => {
    const text = content.trim();
    if (!text || isStreaming || isCompleted) return false;

    setSendError(null);
    const now = new Date().toISOString();
    const localId = `local-${now}`;
    setMessages((current) => [...current, { id: localId, role: "user", content: text, createdAt: now }]);
    setStreamingReply("");

    let reply = "";
    try {
      const messageId = await api.sendMessage(sessionId, text, (piece) => {
        reply += piece;
        setStreamingReply(reply);
      });
      setMessages((current) => [
        ...current,
        { id: messageId, role: "assistant", content: reply, createdAt: new Date().toISOString() },
      ]);
      return true;
    } catch (error) {
      setSendError(errorMessage(error));
      setMessages((current) => current.filter((m) => m.id !== localId));
      // Re-sync with what the server actually saved.
      session.reload();
      return false;
    } finally {
      setStreamingReply(null);
    }
  };

  /** Grades and closes the session. */
  const finish = async () => {
    if (isGrading || !hasTraineeMessage) return;
    setIsGrading(true);
    setGradeError(null);
    try {
      const result = await api.debrief(sessionId);
      setDebrief(result);
      trainee.setGrade(sessionId, gradeFromDebrief(result));
    } catch (error) {
      setGradeError(errorMessage(error));
    } finally {
      setIsGrading(false);
    }
  };

  // Sessions graded elsewhere (another tab or device) still update local history.
  // Runs only when the debrief or the record's grade changes.
  const record = trainee.history.find((r) => r.sessionId === sessionId);
  useEffect(() => {
    if (debrief && record && !record.grade) trainee.setGrade(sessionId, gradeFromDebrief(debrief));
  }, [debrief, record?.grade]);

  return {
    session: session.data,
    scenario: scenario.data ?? null,
    account: account.data ?? null,
    template,
    isLoading: session.isLoading && !session.data,
    loadError: session.error,
    reload: session.reload,
    messages,
    streamingReply,
    isStreaming,
    sendError,
    send,
    debrief,
    isCompleted,
    canFinish: hasTraineeMessage && !isCompleted && !isStreaming,
    isGrading,
    gradeError,
    finish,
  };
}
