import type { StreamFetch } from "./stream-fetch.types";

// Browsers stream fetch response bodies natively.
export const streamFetch: StreamFetch = (url, init) => fetch(url, init);
