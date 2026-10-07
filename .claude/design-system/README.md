# Volt Academy

**Train like a pro. Work safe. Get licensed.**

Volt Academy is a training academy for electricians in the United States — from first-day apprentices to journeymen preparing for their license exam. The visual language comes straight from the jobsite: High-Voltage warning tape, the NEC conductor color code, bare copper, galvanized conduit and the black of a load-center panel. It should feel like a trade, not a tech startup: practical, confident and safety-first.

> **Note:** "Volt Academy" is a working name and there is no logo yet. Until a mark exists, set the name in `display` type (Barlow Condensed Bold, uppercase allowed) — never draw a substitute lightning-bolt logo.

## Voice & content

- **Plain, direct, practical.** Write the way a good foreman explains a task: short sentences, active voice, one step at a time. "Turn off the breaker. Verify with your tester. Then open the box."
- **Safety comes first, always.** Any procedure that involves energized equipment opens with a DANGER or WARNING callout before the steps.
- **Respect the craft.** Learners are adults building a career. No hype, no emoji, no "super easy!" Encourage with outcomes: "You're ready for the Journeyman exam."
- **Use real trade vocabulary**, and explain it the first time: *branch circuit*, *GFCI*, *ampacity*, *conduit fill*.
- **Cite the code.** Reference the National Electrical Code with its article, in `spec` mono type: `NEC 210.8(A)`. Say which edition you mean ("2026 NEC").
- **US units and conventions:** AWG for wire, feet/inches, °F, `120/240 V`.

| Do | Don't |
| --- | --- |
| "Size the conductor for 125% of the continuous load." | "Just pick a bigger wire to be safe!" |
| "Lesson 4 · 18 min · Includes quiz" | "Awesome lesson ⚡⚡" |
| DANGER — "Never work a live panel without PPE rated for the arc-flash boundary." | Burying safety notes at the end of a lesson |

## Color

The palette borrows meaning the trade already knows. Use it consistently so a learner never has to relearn what a color means.

- **`voltage`** (#FFC20E) is the brand. Primary buttons, the current lesson in a progress bar, highlights. It is a **fill only**: always pair it with `ink-on-voltage` text. Yellow text on white is never allowed (fails contrast).
- **`surface-inverse`** (Panel Black) carries hero bands, the footer and the strongest moments. Voltage on Panel Black is the signature pairing.
- **`copper`** is the secondary brand: certification badges, achievement seals, chart accents. For copper-colored words use `copper-text`.
- **`steel`** is for quiet UI: icons, inactive tabs, chart baselines.
- **Status colors follow conductor colors** — `ground` green = passed/success, `line-red` = error/DANGER, `neutral-blue` = info and links, `arc-flash` orange = WARNING (use `warning-text` for orange words on light surfaces).
- Backgrounds are `surface-100` (warm blueprint white) — never pure white as the page. Cards use `surface-200`.
- Don't introduce gradients. Don't use red and green as the only difference between two states — always add an icon or label.

## Typography

- **Display — Barlow Condensed** (Google Fonts, 600/700). Condensed and industrial, like equipment labels and jobsite signage. Headlines, module titles, the `eyebrow` label in caps.
- **Text — Inter** (Google Fonts, 400/600). All reading text. Lessons are long; keep `body` at 16px minimum.
- **Technical — JetBrains Mono** (Google Fonts, 500). Only for values a learner might copy or compare: `12 AWG`, `20 A`, `V = I × R`, `NEC 250.50`.

Load them with:

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

## Space, shape & elevation

- Spacing runs on a 4px base: `space-1` … `space-12`. Cards pad `space-4` on mobile, `space-6` on desktop.
- Corners are short — `radius-sm` (4), `radius-md` (6, default), `radius-lg` (8). Nothing pill-shaped or bubbly; this is hardware.
- Prefer a `border` hairline over shadows. `shadow-card` for resting cards only when they sit on a busy background; `shadow-pop` for menus and modals.

## Motifs

- **Hazard stripes** — 45° diagonal bands of `voltage` and `surface-inverse` at a `space-6` pitch. Use sparingly as an accent edge (a hero band, a "Safety" section divider), never as a full background behind text.
- **Callouts** follow ANSI Z535 safety-sign logic: DANGER (`line-red` header), WARNING (`arc-flash`), NOTICE / NEC reference (`neutral-blue`). Header bar in the color, label in `eyebrow` caps, body text in `ink` on `surface-200`.

## Iconography

Use a single outline icon set with a 2px stroke and square caps (e.g. Lucide or Tabler), colored `steel` at rest and `ink` when active. Trade-specific icons (outlet, breaker, multimeter, conduit) should be drawn in the same stroke style. No filled emoji-style icons.

## Accessibility

- All text meets WCAG AA (4.5:1) in both light and dark themes; control borders (`border-strong`) and `focus-ring` meet 3:1.
- Every interactive element shows a 2px `focus-ring` outline.
- Status is never color-only: pair `ground` / `line-red` with ✓ / ✕ icons and words ("Passed", "Try again").
