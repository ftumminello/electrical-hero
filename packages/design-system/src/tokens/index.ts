import tokens from "./tokens.json";

export type ColorScheme = "light" | "dark";
export type ColorToken = keyof typeof tokens.colors.light;
export type TypographyVariant = keyof typeof tokens.typography;

export const colors: Record<ColorScheme, Record<ColorToken, string>> = tokens.colors;

/** Space-separated RGB channels per scheme, keyed by CSS variable name (`--color-ink`). */
export const themeVariables = Object.fromEntries(
  (["light", "dark"] as const).map((scheme) => [
    scheme,
    Object.fromEntries(
      Object.entries(tokens.colorChannels[scheme]).map(([name, channels]) => [`--color-${name}`, channels]),
    ),
  ]),
) as Record<ColorScheme, Record<`--color-${ColorToken}`, string>>;

export const typography = tokens.typography;
export const spacing = tokens.spacing;
export const radius = tokens.radius;
