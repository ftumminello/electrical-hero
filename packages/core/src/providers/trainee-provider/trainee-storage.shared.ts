import type { TraineeState } from "./trainee-provider.types";

export const TRAINEE_STORAGE_KEY = "electrical-hero:trainee";

export const EMPTY_TRAINEE_STATE: TraineeState = { traineeName: null, currentAccountId: null, history: [] };

/** Parses stored JSON, falling back to an empty state for anything unexpected. */
export const parseTraineeState = (raw: string | null): TraineeState => {
  if (!raw) return EMPTY_TRAINEE_STATE;
  try {
    const value = JSON.parse(raw) as Partial<TraineeState>;
    return {
      traineeName: typeof value.traineeName === "string" ? value.traineeName : null,
      currentAccountId: typeof value.currentAccountId === "string" ? value.currentAccountId : null,
      history: Array.isArray(value.history) ? value.history : [],
    };
  } catch {
    return EMPTY_TRAINEE_STATE;
  }
};
