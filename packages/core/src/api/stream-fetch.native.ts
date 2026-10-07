import { fetch as expoFetch } from "expo/fetch";
import type { StreamFetch } from "./stream-fetch.types";

// React Native's built-in fetch doesn't stream response bodies; expo/fetch does.
export const streamFetch: StreamFetch = (url, init) => expoFetch(url, init) as unknown as ReturnType<StreamFetch>;
