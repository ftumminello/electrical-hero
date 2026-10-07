"use client";

import { createContext, use, useEffect, useState, type ReactNode } from "react";
import type { TraineeContextValue, TraineeState } from "./trainee-provider.types";
import { loadTraineeState, saveTraineeState } from "./trainee-storage";
import { EMPTY_TRAINEE_STATE } from "./trainee-storage.shared";

const TraineeContext = createContext<TraineeContextValue | null>(null);

const MAX_HISTORY = 100;

/** The trainee's name, chosen job site and training history, saved on this device. */
export function TraineeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TraineeState>(EMPTY_TRAINEE_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTraineeState().then((saved) => {
      setState(saved);
      setIsLoaded(true);
    });
  }, []);

  const update = (change: (current: TraineeState) => TraineeState) =>
    setState((current) => {
      const next = change(current);
      saveTraineeState(next);
      return next;
    });

  const value: TraineeContextValue = {
    ...state,
    isLoaded,
    setTraineeName: (name) => update((s) => ({ ...s, traineeName: name.trim() || null })),
    setCurrentAccountId: (accountId) => update((s) => ({ ...s, currentAccountId: accountId })),
    addRecord: (record) =>
      update((s) => ({
        ...s,
        history: [record, ...s.history.filter((r) => r.sessionId !== record.sessionId)].slice(0, MAX_HISTORY),
      })),
    setGrade: (sessionId, grade) =>
      update((s) => ({ ...s, history: s.history.map((r) => (r.sessionId === sessionId ? { ...r, grade } : r)) })),
  };

  return <TraineeContext value={value}>{children}</TraineeContext>;
}

export function useTrainee(): TraineeContextValue {
  const value = use(TraineeContext);
  if (!value) throw new Error("useTrainee must be used inside <TraineeProvider>.");
  return value;
}
