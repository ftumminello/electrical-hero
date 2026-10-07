import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import tokens from "../tokens/tokens.json";

const typographyNames = Object.keys(tokens.typography);

// Teach tailwind-merge the preset's custom classes so `text-body` and `text-ink` don't collide.
const twMerge = extendTailwindMerge<"typography">({
  extend: {
    classGroups: {
      typography: [{ type: typographyNames }],
      "font-size": [{ text: typographyNames }],
      shadow: [{ shadow: ["card", "pop"] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
