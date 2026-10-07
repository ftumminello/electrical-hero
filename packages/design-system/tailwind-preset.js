// Shared Tailwind preset for web (Tailwind CSS) and native (NativeWind).
// Both platforms get the same class names; only how fonts and theme variables
// are wired differs per platform.
const plugin = require("tailwindcss/plugin");
const tokens = require("./src/tokens/tokens.json");

const colorVar = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

const colorNames = Object.keys(tokens.colors.light);

const themeVariables = (scheme) =>
  Object.fromEntries(colorNames.map((name) => [`--color-${name}`, tokens.colorChannels[scheme][name]]));

const webShadowVariables = (scheme) =>
  Object.fromEntries(Object.entries(tokens.shadow[scheme]).map(([name, value]) => [`--shadow-${name}`, value]));

// `type-*` utilities bundle a design-system text style (family, weight, size,
// line height, tracking) so web and native render the same named styles.
const typeUtilities = (platform) =>
  Object.fromEntries(
    Object.entries(tokens.typography).map(([name, style]) => [
      `.type-${name}`,
      {
        // Native registers one family per weight; web uses next/font variables.
        fontFamily:
          platform === "native"
            ? style.nativeFontFamily
            : `var(--font-${style.family}, ${tokens.fontFamilies[style.family]})`,
        ...(platform === "web" && { fontWeight: String(style.fontWeight) }),
        fontSize: `${style.fontSize}px`,
        lineHeight: `${style.lineHeight}px`,
        letterSpacing: `${style.letterSpacing}px`,
        ...(style.uppercase && { textTransform: "uppercase" }),
      },
    ]),
  );

/**
 * @param {"web" | "native"} platform
 * @returns {import("tailwindcss").Config}
 */
function createPreset(platform) {
  return {
    content: [],
    darkMode: platform === "web" ? ["selector", '[data-theme="dark"]'] : "class",
    theme: {
      // Corners are short: nothing rounder than radius-lg. `full` stays for dots.
      borderRadius: {
        none: "0px",
        sm: `${tokens.radius.sm}px`,
        DEFAULT: `${tokens.radius.md}px`,
        md: `${tokens.radius.md}px`,
        lg: `${tokens.radius.lg}px`,
        full: "9999px",
      },
      // Only design-system sizes; prefer the `type-*` utilities.
      fontSize: Object.fromEntries(
        Object.entries(tokens.typography).map(([name, style]) => [
          name,
          [`${style.fontSize}px`, { lineHeight: `${style.lineHeight}px` }],
        ]),
      ),
      extend: {
        // Tailwind's default spacing scale already matches space-1…space-12 (4px base).
        colors: Object.fromEntries(colorNames.map((name) => [name, colorVar(name)])),
        borderColor: { DEFAULT: colorVar("border") },
        outlineColor: { DEFAULT: colorVar("focus-ring") },
        ringColor: { DEFAULT: colorVar("focus-ring") },
        // NativeWind can't resolve variables inside box-shadow, so native uses the light values.
        boxShadow:
          platform === "web"
            ? { card: "var(--shadow-card)", pop: "var(--shadow-pop)" }
            : { card: tokens.shadow.light.card, pop: tokens.shadow.light.pop },
      },
    },
    plugins: [
      plugin(({ addBase, addUtilities }) => {
        addUtilities(typeUtilities(platform));

        if (platform === "native") {
          // Fallback for anything rendered outside ThemeProvider, which applies vars() per scheme.
          addBase({ ":root": themeVariables("light") });
          return;
        }

        const dark = { ...themeVariables("dark"), ...webShadowVariables("dark"), colorScheme: "dark" };
        addBase({
          ":root": { ...themeVariables("light"), ...webShadowVariables("light"), colorScheme: "light" },
          ':root[data-theme="dark"]': dark,
          // No-JS fallback; ThemeScript sets data-theme before first paint.
          "@media (prefers-color-scheme: dark)": { ":root:not([data-theme])": dark },
        });
      }),
    ],
  };
}

module.exports = { createPreset };
