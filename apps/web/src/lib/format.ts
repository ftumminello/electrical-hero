import type { JobSite } from "@electrical-hero/shared";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const numberFormat = new Intl.NumberFormat("en-US");

export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

export const formatPoints = (points: number) => `${numberFormat.format(points)} pts`;

export const formatJobSite = (site: JobSite) => `${site.name} · ${site.city}, ${site.state}`;

/** 1 → "1st", 12 → "12th", 23 → "23rd". */
export const ordinal = (n: number) => {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
  const suffix = { 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th";
  return `${n}${suffix}`;
};
