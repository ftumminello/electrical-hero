"use client";

import { useCallback, useEffect, useState } from "react";
import { isPlausibleKey, type IntegrationId } from "../lib/integrations";

export type IntegrationState = {
  status: "connecting" | "connected";
  connectedAt?: string;
  lastSyncAt?: string;
  matchedSites?: number;
};

export type KeyTestResult = { ok: boolean; message: string; at: string };

export type AdminSettings = {
  integrations: Partial<Record<IntegrationId, IntegrationState>>;
  tradesQuest: { apiKey: string | null; savedAt?: string; lastTest?: KeyTestResult };
};

const STORAGE_KEY = "electrical-hero.admin.v1";
const EMPTY: AdminSettings = { integrations: {}, tradesQuest: { apiKey: null } };
/** How long the fake vendor handshake takes, so the demo shows a "Connecting…" state. */
const HANDSHAKE_MS = 1200;

function load(): AdminSettings {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as AdminSettings | null;
    if (!parsed?.integrations || !parsed.tradesQuest) return EMPTY;
    // A reload mid-handshake should not leave a card stuck on "Connecting…".
    const integrations = Object.fromEntries(
      Object.entries(parsed.integrations).filter(([, state]) => state?.status === "connected"),
    );
    return { ...parsed, integrations };
  } catch {
    return EMPTY;
  }
}

function save(settings: AdminSettings) {
  // localStorage can throw (blocked storage, some private modes); the page still works for the visit.
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

/** Mock admin settings, kept in this browser only. Nothing is sent to any vendor or to the API. */
export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>(EMPTY);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(load());
    setIsLoaded(true);
  }, []);

  const update = useCallback((change: (current: AdminSettings) => AdminSettings) => {
    setSettings((current) => {
      const next = change(current);
      save(next);
      return next;
    });
  }, []);

  const setIntegration = useCallback(
    (id: IntegrationId, state: IntegrationState | undefined) =>
      update((current) => ({ ...current, integrations: { ...current.integrations, [id]: state } })),
    [update],
  );

  const connect = useCallback(
    (id: IntegrationId, matchedSites: number) => {
      setIntegration(id, { status: "connecting" });
      setTimeout(() => {
        const now = new Date().toISOString();
        // Only finish if nobody disconnected during the handshake.
        update((current) =>
          current.integrations[id]?.status === "connecting"
            ? {
                ...current,
                integrations: {
                  ...current.integrations,
                  [id]: { status: "connected", connectedAt: now, lastSyncAt: now, matchedSites },
                },
              }
            : current,
        );
      }, HANDSHAKE_MS);
    },
    [setIntegration, update],
  );

  const sync = useCallback(
    (id: IntegrationId, matchedSites: number) =>
      update((current) => {
        const state = current.integrations[id];
        if (state?.status !== "connected") return current;
        return {
          ...current,
          integrations: {
            ...current.integrations,
            [id]: { ...state, lastSyncAt: new Date().toISOString(), matchedSites },
          },
        };
      }),
    [update],
  );

  const disconnect = useCallback((id: IntegrationId) => setIntegration(id, undefined), [setIntegration]);

  const saveKey = useCallback(
    (apiKey: string) =>
      update((current) => ({ ...current, tradesQuest: { apiKey: apiKey.trim(), savedAt: new Date().toISOString() } })),
    [update],
  );

  const removeKey = useCallback(() => update((current) => ({ ...current, tradesQuest: { apiKey: null } })), [update]);

  /** Simulated: checks the key's shape only. The key is never sent anywhere while TradesQuest isn't live. */
  const testKey = useCallback(
    () =>
      update((current) => {
        const key = current.tradesQuest.apiKey;
        const lastTest: KeyTestResult = !key
          ? { ok: false, message: "Save an API key first.", at: new Date().toISOString() }
          : isPlausibleKey(key)
            ? {
                ok: true,
                message:
                  "Key format looks right. TradesQuest isn't live yet, so it will connect automatically at launch.",
                at: new Date().toISOString(),
              }
            : {
                ok: false,
                message: "That doesn't look like an API key: expected at least 16 characters with no spaces.",
                at: new Date().toISOString(),
              };
        return { ...current, tradesQuest: { ...current.tradesQuest, lastTest } };
      }),
    [update],
  );

  return { settings, isLoaded, connect, sync, disconnect, saveKey, removeKey, testKey };
}
