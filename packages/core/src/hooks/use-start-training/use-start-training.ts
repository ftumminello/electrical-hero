import { useState } from "react";
import type { AccountSummary, ScenarioPublic } from "@electrical-hero/shared";
import { errorMessage } from "../../api";
import { useApi } from "../../providers/api-provider";
import { useTrainee } from "../../providers/trainee-provider";

/** `generating`: the AI is writing the scenario (10–40 s). `starting`: opening the session. */
export type StartPhase = "idle" | "generating" | "starting";

/**
 * Starts training at a site. `scenario` asks the API for a random scenario the
 * site qualifies for; `briefing` opens a Q&A chat with the account lead.
 * Resolves with the new session id, or null on failure (see `error`).
 */
export function useStartTraining() {
  const api = useApi();
  const trainee = useTrainee();
  const [phase, setPhase] = useState<StartPhase>("idle");
  const [error, setError] = useState<string | null>(null);

  const start = async (account: AccountSummary, mode: "scenario" | "briefing"): Promise<string | null> => {
    if (phase !== "idle") return null;
    const traineeName = trainee.traineeName?.trim();
    if (!traineeName) {
      setError("Add your name before you start.");
      return null;
    }

    setError(null);
    try {
      let scenario: ScenarioPublic | null = null;
      if (mode === "scenario") {
        setPhase("generating");
        scenario = await api.createScenario({ accountId: account.id });
      }
      setPhase("starting");
      const session = await api.createSession({ accountId: account.id, scenarioId: scenario?.id, traineeName });
      trainee.addRecord({
        sessionId: session.id,
        mode: session.mode,
        accountId: account.id,
        accountName: account.name,
        scenarioId: scenario?.id ?? null,
        title: scenario?.title ?? "Site briefing",
        difficulty: scenario?.difficulty ?? null,
        startedAt: session.createdAt,
        grade: null,
      });
      return session.id;
    } catch (e) {
      setError(errorMessage(e));
      return null;
    } finally {
      setPhase("idle");
    }
  };

  return { start, phase, isStarting: phase !== "idle", error };
}
