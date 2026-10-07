import { DEFAULT_API_URL } from "@electrical-hero/core/api";

// The deployed API by default. Set EXPO_PUBLIC_API_URL to point at another server
// (local `wrangler dev` starts with empty storage; on a device, use your machine's LAN IP).
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL;
