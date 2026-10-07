"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_RESOURCES, parseResourceUrl, type CodeResource } from "../lib/code-resources";

const STORAGE_KEY = "electrical-hero.admin.code-resources.v1";

function load(): CodeResource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return DEFAULT_RESOURCES;
    const parsed = JSON.parse(raw) as CodeResource[];
    // Re-check links on load too, in case storage was edited by hand.
    return Array.isArray(parsed) ? parsed.filter((r) => r?.name && parseResourceUrl(r.url)) : DEFAULT_RESOURCES;
  } catch {
    return DEFAULT_RESOURCES;
  }
}

function save(resources: CodeResource[]) {
  // localStorage can throw (blocked storage, some private modes); the page still works for the visit.
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch {}
}

/** The company's external code resources, kept in this browser only (demo). */
export function useCodeResources() {
  const [resources, setResources] = useState<CodeResource[]>(DEFAULT_RESOURCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setResources(load());
    setIsLoaded(true);
  }, []);

  const update = useCallback((change: (current: CodeResource[]) => CodeResource[]) => {
    setResources((current) => {
      const next = change(current);
      save(next);
      return next;
    });
  }, []);

  const add = useCallback(
    (resource: Omit<CodeResource, "id" | "addedAt">) =>
      update((current) => [{ ...resource, id: crypto.randomUUID(), addedAt: new Date().toISOString() }, ...current]),
    [update],
  );

  const remove = useCallback((id: string) => update((current) => current.filter((r) => r.id !== id)), [update]);

  const reset = useCallback(() => update(() => DEFAULT_RESOURCES), [update]);

  return { resources, isLoaded, add, remove, reset };
}
