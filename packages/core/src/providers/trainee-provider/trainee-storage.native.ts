import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TraineeState } from "./trainee-provider.types";
import { TRAINEE_STORAGE_KEY, parseTraineeState } from "./trainee-storage.shared";

export const loadTraineeState = async (): Promise<TraineeState> =>
  parseTraineeState(await AsyncStorage.getItem(TRAINEE_STORAGE_KEY).catch(() => null));

export const saveTraineeState = (state: TraineeState) => {
  AsyncStorage.setItem(TRAINEE_STORAGE_KEY, JSON.stringify(state)).catch(() => {});
};
