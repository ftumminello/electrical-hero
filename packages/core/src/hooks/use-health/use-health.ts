import { useEffect, useState } from "react";
import type { HealthResponse } from "@electrical-hero/shared";

export type HealthStatus = "checking" | "ok" | "unreachable";

/** Checks the API's health endpoint on mount and whenever `recheck` is called. */
export function useHealth(healthUrl: string) {
  const [status, setStatus] = useState<HealthStatus>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("checking");
    fetch(healthUrl, { signal: controller.signal })
      .then((r) => r.json() as Promise<HealthResponse>)
      .then((h) => setStatus(h.status === "ok" ? "ok" : "unreachable"))
      .catch(() => {
        if (!controller.signal.aborted) setStatus("unreachable");
      });
    return () => controller.abort();
  }, [healthUrl, attempt]);

  return { status, recheck: () => setAttempt((n) => n + 1) };
}
