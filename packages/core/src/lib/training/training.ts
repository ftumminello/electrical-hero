import type { Address, ChatMessage, SessionMode } from "@electrical-hero/shared";

/** Sent when the trainee taps "Pass this question". The AI stays in character, so it nudges rather than answers. */
export const PASS_MESSAGE = "I'm not sure what to do next. Can you give me a hint about where to start?";

const SPEAKER_PREFIX = /^(Dispatch|Site contact):\s*/i;

/**
 * Who said an assistant message. Scenario replies start with "Dispatch:" or
 * "Site contact:"; briefing replies come from the account lead.
 */
export function messageSpeaker(message: ChatMessage, mode: SessionMode): { label: string; text: string } {
  if (message.role === "user") return { label: "You", text: message.content };
  const match = SPEAKER_PREFIX.exec(message.content);
  if (match) {
    const label = match[1]!.toLowerCase() === "dispatch" ? "Dispatch" : "Site contact";
    return { label, text: message.content.slice(match[0].length) };
  }
  return { label: mode === "briefing" ? "Account lead" : "Dispatch", text: message.content };
}

/** "Kestrel Electric Co." from the rulebook's first heading ("# Kestrel Electric Co. — Field Work Standards …"). */
export function companyNameFromRules(markdown: string): string | null {
  const heading = /^#\s+(.+)$/m.exec(markdown)?.[1];
  return heading ? heading.split(/\s+[—-]\s+/)[0]!.trim() : null;
}

export const formatAddress = (address: Address) => `${address.line1}, ${address.city}, ${address.state}`;

export const formatCityState = (address: Address) => `${address.city}, ${address.state}`;

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

/** The line between "Passed" and "Needs work" everywhere in the app. */
export const PASSING_SCORE = 70;
export const isPassing = (score: number) => score >= PASSING_SCORE;
