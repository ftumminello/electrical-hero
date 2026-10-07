import { HttpError } from "../http";
import { formatAddress, type AccountRow } from "../domain/mappers";
import type { SiteContext } from "../domain/prompts";
import { joinRules } from "../domain/rules";
import { parseTemplate, type ScenarioTemplate } from "../domain/templates";

async function readText(bucket: R2Bucket, key: string): Promise<string | null> {
  const object = await bucket.get(key);
  return object ? object.text() : null;
}

/** Missing seed content is a deployment problem, not a client error. */
const missing = (what: string) => new HttpError(500, `${what} is missing; run the seed upload`);

export async function getClientConfig(env: Env, key: string): Promise<string> {
  const markdown = await readText(env.CLIENT_CONFIGS, key);
  if (markdown === null) throw missing(`site file ${key}`);
  return markdown;
}

export async function getCompanyRules(env: Env, companyId: string): Promise<string> {
  const listed = await env.COMPANY_RULES.list({ prefix: `${companyId}/` });
  if (listed.objects.length === 0) throw missing(`company rules for ${companyId}`);
  const docs = await Promise.all(
    listed.objects.map(async (o) => ({ key: o.key, text: (await readText(env.COMPANY_RULES, o.key)) ?? "" })),
  );
  return joinRules(docs);
}

export async function listTemplates(env: Env): Promise<ScenarioTemplate[]> {
  const listed = await env.SCENARIO_TEMPLATES.list();
  const docs = await Promise.all(listed.objects.map((o) => readText(env.SCENARIO_TEMPLATES, o.key)));
  return docs
    .filter((d): d is string => Boolean(d))
    .map(parseTemplate)
    .sort((a, b) => (a.id < b.id ? -1 : 1));
}

export async function loadSite(env: Env, account: AccountRow): Promise<SiteContext> {
  const [configMarkdown, rulesMarkdown] = await Promise.all([
    getClientConfig(env, account.config_key),
    getCompanyRules(env, account.company_id),
  ]);
  return { accountName: account.name, address: formatAddress(account), configMarkdown, rulesMarkdown };
}
