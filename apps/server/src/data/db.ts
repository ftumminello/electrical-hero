import type { AccountRow, MessageRow, ScenarioRow, SessionRow } from "../domain/mappers";

export const now = (): string => new Date().toISOString();

export function newMessage(sessionId: string, role: MessageRow["role"], content: string): MessageRow {
  return { id: crypto.randomUUID(), session_id: sessionId, role, content, created_at: now() };
}

export async function listAccounts(db: D1Database, companyId: string): Promise<AccountRow[]> {
  const { results } = await db
    .prepare("SELECT * FROM accounts WHERE company_id = ? ORDER BY name")
    .bind(companyId)
    .all<AccountRow>();
  return results;
}

export function getAccount(db: D1Database, id: string): Promise<AccountRow | null> {
  return db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first<AccountRow>();
}

export async function insertScenario(db: D1Database, s: ScenarioRow): Promise<void> {
  await db
    .prepare(
      "INSERT INTO scenarios (id, account_id, template_id, title, difficulty, briefing, hidden_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(s.id, s.account_id, s.template_id, s.title, s.difficulty, s.briefing, s.hidden_json, s.created_at)
    .run();
}

export function getScenario(db: D1Database, id: string): Promise<ScenarioRow | null> {
  return db.prepare("SELECT * FROM scenarios WHERE id = ?").bind(id).first<ScenarioRow>();
}

export async function listScenariosForAccount(db: D1Database, accountId: string): Promise<ScenarioRow[]> {
  const { results } = await db
    .prepare("SELECT * FROM scenarios WHERE account_id = ? ORDER BY created_at DESC")
    .bind(accountId)
    .all<ScenarioRow>();
  return results;
}

function insertMessageStatement(db: D1Database, m: MessageRow): D1PreparedStatement {
  return db
    .prepare("INSERT INTO messages (id, session_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(m.id, m.session_id, m.role, m.content, m.created_at);
}

/** Inserts the session and, for scenarios, the opening dispatch message in one batch. */
export async function createSession(db: D1Database, s: SessionRow, opening: MessageRow | null): Promise<void> {
  const insert = db
    .prepare(
      "INSERT INTO sessions (id, account_id, scenario_id, mode, trainee_name, status, debrief_json, created_at, ended_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(s.id, s.account_id, s.scenario_id, s.mode, s.trainee_name, s.status, s.debrief_json, s.created_at, s.ended_at);
  await db.batch(opening ? [insert, insertMessageStatement(db, opening)] : [insert]);
}

export function getSession(db: D1Database, id: string): Promise<SessionRow | null> {
  return db.prepare("SELECT * FROM sessions WHERE id = ?").bind(id).first<SessionRow>();
}

export async function insertMessage(db: D1Database, m: MessageRow): Promise<void> {
  await insertMessageStatement(db, m).run();
}

export async function listMessages(db: D1Database, sessionId: string): Promise<MessageRow[]> {
  const { results } = await db
    .prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at, rowid")
    .bind(sessionId)
    .all<MessageRow>();
  return results;
}

export async function completeSession(db: D1Database, id: string, debriefJson: string, endedAt: string): Promise<void> {
  await db
    .prepare("UPDATE sessions SET status = 'completed', debrief_json = ?, ended_at = ? WHERE id = ?")
    .bind(debriefJson, endedAt, id)
    .run();
}
