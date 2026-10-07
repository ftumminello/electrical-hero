import { useEffect, useState } from "react";
import { APP_NAME, type HealthResponse } from "@electrical-hero/shared";

export function App() {
  const [health, setHealth] = useState<string>("checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json() as Promise<HealthResponse>)
      .then((h) => setHealth(h.status))
      .catch(() => setHealth("server unreachable"));
  }, []);

  return (
    <main>
      <h1>{APP_NAME}</h1>
      <p>Server: {health}</p>
    </main>
  );
}
