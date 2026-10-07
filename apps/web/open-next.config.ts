import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Defaults: no incremental cache. The app renders client-side against the API Worker, so it needs none.
export default defineCloudflareConfig();
