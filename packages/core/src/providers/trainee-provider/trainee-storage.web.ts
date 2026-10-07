import type { TraineeState } from "./trainee-provider.types";
import { TRAINEE_STORAGE_KEY, parseTraineeState } from "./trainee-storage.shared";

// localStorage can throw (blocked storage, some private modes); the app still works for the visit.
export const loadTraineeState = async (): Promise<TraineeState> => {
  try {
    return parseTraineeState(localStorage.getItem(TRAINEE_STORAGE_KEY));
  } catch {
    return parseTraineeState(null);
  }
};

export const saveTraineeState = (state: TraineeState) => {
  try {
    localStorage.setItem(TRAINEE_STORAGE_KEY, JSON.stringify(state));
  } catch {}
};
