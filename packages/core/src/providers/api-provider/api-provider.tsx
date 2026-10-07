"use client";

import { createContext, use, useMemo, type ReactNode } from "react";
import { createApiClient, type ApiClient } from "../../api";

const ApiContext = createContext<ApiClient | null>(null);

export function ApiProvider({ baseUrl, children }: { baseUrl: string; children: ReactNode }) {
  const client = useMemo(() => createApiClient(baseUrl), [baseUrl]);
  return <ApiContext value={client}>{children}</ApiContext>;
}

/** The API client for the app's base URL. */
export function useApi(): ApiClient {
  const client = use(ApiContext);
  if (!client) throw new Error("useApi must be used inside <ApiProvider>.");
  return client;
}
