import type { Config } from "tailwindcss";
import { createPreset } from "@electrical-hero/design-system/tailwind-preset";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/core/src/**/*.{ts,tsx}", "!../../packages/core/src/**/*.native.tsx"],
  presets: [createPreset("web")],
} satisfies Config;
