import { useEffect, useState } from "react";

/** Status lines shown while dispatch writes a service call, in the spirit of a spinner verb. */
export const DISPATCH_VERBS = [
  "Dispatch is writing your call",
  "Pulling the site file",
  "Checking the panel schedule",
  "Tracing the circuit",
  "Reading the work rules",
  "Tripping a breaker somewhere",
  "Loosening a neutral",
  "Hiding the fault",
  "Torquing the lugs",
  "Testing for dead",
  "Labeling the panel (finally)",
  "Calling the customer back",
  "Grabbing the meter from the truck",
  "Bending some conduit",
];

/** Returns the current item from `items`, advancing every `intervalMs` while `active`. Restarts at the first item. */
export function useCyclingText(items: readonly string[], active: boolean, intervalMs = 2500) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [active, items, intervalMs]);

  return items[index] ?? "";
}
