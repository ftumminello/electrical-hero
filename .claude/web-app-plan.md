# Web App Plan — Frontend

The web app lives in `apps/web` (Next.js, App Router, `src/app`). Shared types go in `packages/shared`.

All screens follow the Volt Academy design system in `.claude/design-system/` (`README.md` for brand rules, `tokens.json` for colors, type, spacing, radii and shadows).

## How the screens map to the API

Both apps (web `apps/web`, native `apps/native`) share their data logic through `packages/core`: the API client (`api/`), `ApiProvider` and `TraineeProvider`, and the hooks `use-start-training` and `use-training-session`. See `docs/api/README.md` for the endpoints.

| Plan | Route (web / native) | API |
| --- | --- | --- |
| Home / Problem Selection | `/` · `(tabs)/index` | `GET /accounts` (job sites), `GET /accounts/:id` (critical info), `POST /scenarios` (random problem), `POST /sessions` |
| Problem Screen | `/session/[id]` · `session/[id]` | `GET /sessions/:id`, `GET /scenarios/:id`, `GET /scenario-templates` (rules and skills), streamed `POST /sessions/:id/messages`, `POST /sessions/:id/debrief` |
| Account / Profile | `/account` · `(tabs)/account` | `GET /rules` (company name); name, history and badges are stored on the device |
| History | `/history` · `history` | Stored on the device; each entry opens its session |
| Company Leaderboard | `/leaderboard` · `(tabs)/leaderboard` | No endpoint yet; shows only the current trainee |

### Not supported by the server yet

- **Leaderboard, user score and badges across devices:** there are no users or a list of sessions, so scores and badges come from this device's history only.
- **Profile picture and company logo:** initials and an icon stand in.
- **PPE / tools list:** scenarios don't return one; the screen shows the site's critical info, the template's company rules (e.g. `R-PPE-01`) and the site file.
- **"Pass this question":** there's no pass endpoint, so it sends a "give me a hint" message; the AI stays in character as dispatch.
- **Voice on native:** web uses the browser's speech recognition. Native would need `expo-speech-recognition`, which doesn't run in Expo Go, so it relies on the keyboard's dictation for now.

## Screens

### 1. Account / Profile Screen

**Purpose:** Personal dashboard of the user inside the company.

- Profile picture
- Company information (name, logo, job site / current location of the company)
- User score / ranking points
- Badges earned
- Quick link to the company Leaderboard
- Summary of problems overcome in the past (history of solved problems)

### 2. Company Leaderboard Screen

**Purpose:** Show ranking inside the company.

- Ranked list of users (name + score + badges)
- Filter by job site / department (optional)
- Highlight the current user's position
- Link back to Account screen

### 3. Home / Problem Selection Screen

**Purpose:** Starting point where the user gets a problem.

- Random problem (user does not choose the problem)
- Problems are related to the book / regulations / standards of the state where the company is working
- Option to see "Overcome previous problems" (history)
- Possibility of job-site change of the company (affects the problems that appear)
- Clear call-to-action: "Start next problem"

### 4. Problem Screen (Main interaction)

**Purpose:** The core experience — present a problem and guide the user through it.

#### First Problem View

- Location (specific to the user's current job site)
- Detailed description of the problem (very specific to the user / company context)
- Level of difficulty shown
- Tools / PPE that the user needs to bring (Personal Protective Equipment list)
- Input fields for the answer
- Voice-to-text option to fill the answer fields
- Button: "Pass this question" (if the user is clueless)

#### LLM Interaction Flow (inside the same screen)

1. LLM asks one question.
2. User answers (text or voice).
3. LLM explains the answer.
4. If the user was wrong → LLM asks a follow-up question to dig deeper into the same topic.
5. If the user was right → LLM moves to a new topic / next question related to the problem.
6. Continues until the problem is solved or the user decides to pass.
