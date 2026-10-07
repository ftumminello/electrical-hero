const { createPreset } = require("@electrical-hero/design-system/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/core/src/**/*.{ts,tsx}", "!../../packages/core/src/**/*.web.tsx"],
  presets: [require("nativewind/preset"), createPreset("native")],
};
