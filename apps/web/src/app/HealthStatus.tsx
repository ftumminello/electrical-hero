"use client";

import { useEffect, useState } from "react";
import type { HealthResponse } from "@electrical-hero/shared";

export function HealthStatus() {
  const [health, setHealth] = useState<string>("checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json() as Promise<HealthResponse>)
      .then((h) => setHealth(h.status))
      .catch(() => setHealth("server unreachable"));
  }, []);

  return <p>Server: {health}</p>;
}
