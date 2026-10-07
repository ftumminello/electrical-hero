import { useEffect, useState } from "react";
import { errorMessage } from "../../api";

type RequestState<T> = { key: string | null; data?: T; error?: string; isLoading: boolean };

/**
 * Loads data for `key` and reloads whenever the key changes. Pass `null` to wait
 * (e.g. until an id is known). `load` is read when the key changes, not on every render.
 */
export function useRequest<T>(key: string | null, load: () => Promise<T>) {
  const [state, setState] = useState<RequestState<T>>({ key: null, isLoading: key !== null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (key === null) return;
    let cancelled = false;
    // Keep showing the previous data for the same key while reloading.
    setState((current) => ({ key, data: current.key === key ? current.data : undefined, isLoading: true }));
    load().then(
      (data) => !cancelled && setState({ key, data, isLoading: false }),
      (error: unknown) => !cancelled && setState({ key, error: errorMessage(error), isLoading: false }),
    );
    return () => {
      cancelled = true;
    };
    // `load` is deliberately left out: requests are keyed by `key`.
  }, [key, attempt]);

  const isCurrent = state.key === key;
  return {
    data: isCurrent ? state.data : undefined,
    error: isCurrent ? state.error : undefined,
    isLoading: key !== null && (!isCurrent || state.isLoading),
    reload: () => setAttempt((n) => n + 1),
  };
}
