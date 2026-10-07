CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL REFERENCES companies(id),
  name TEXT NOT NULL,
  building_type TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  site_contact_name TEXT,
  site_contact_phone TEXT,
  service_summary TEXT NOT NULL,
  critical_info TEXT NOT NULL,
  features TEXT NOT NULL,
  config_key TEXT NOT NULL
);

CREATE TABLE scenarios (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  template_id TEXT NOT NULL,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  briefing TEXT NOT NULL,
  hidden_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX scenarios_by_account ON scenarios(account_id, created_at);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  scenario_id TEXT REFERENCES scenarios(id),
  mode TEXT NOT NULL CHECK (mode IN ('briefing', 'scenario')),
  trainee_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed')),
  debrief_json TEXT,
  created_at TEXT NOT NULL,
  ended_at TEXT
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX messages_by_session ON messages(session_id, created_at);
