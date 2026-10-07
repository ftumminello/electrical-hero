import type { CodeSpec, SafetyProtocol } from "@electrical-hero/shared";
import { HttpError } from "../http";
import { isSafeId, jurisdictionFor, parseCodeSpec } from "../domain/codespecs";
import { formatAddress, type AccountRow } from "../domain/mappers";
import type { SiteContext } from "../domain/prompts";
import { joinProtocols, parseProtocol } from "../domain/protocols";
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

export async function listProtocols(env: Env): Promise<SafetyProtocol[]> {
  const listed = await env.SAFETY_PROTOCOLS.list();
  const docs = await Promise.all(listed.objects.map((o) => readText(env.SAFETY_PROTOCOLS, o.key)));
  return docs
    .filter((d): d is string => Boolean(d))
    .map(parseProtocol)
    .sort((a, b) => (a.id < b.id ? -1 : 1));
}

/** null for an unknown id; ids that aren't simple slugs are never used as R2 keys. */
export async function getProtocol(env: Env, id: string): Promise<SafetyProtocol | null> {
  if (!isSafeId(id)) return null;
  const markdown = await readText(env.SAFETY_PROTOCOLS, `${id}.md`);
  return markdown === null ? null : parseProtocol(markdown);
}

export async function getCodeSpec(env: Env, id: string): Promise<CodeSpec | null> {
  if (!isSafeId(id)) return null;
  const markdown = await readText(env.CODE_SPECS, `${id}.md`);
  return markdown === null ? null : parseCodeSpec(markdown);
}

/**
 * Safety protocols and local code for scenario generation and debriefs. A protocol a template
 * names but R2 lacks is a seed problem (500); a jurisdiction without a code spec just goes without.
 */
export async function loadReference(
  env: Env,
  account: AccountRow,
  protocolIds: string[],
): Promise<Pick<SiteContext, "protocolsMarkdown" | "codeSpecMarkdown">> {
  const [protocols, codeSpec] = await Promise.all([
    Promise.all(protocolIds.map((id) => getProtocol(env, id))),
    getCodeSpec(env, jurisdictionFor(account.state)),
  ]);
  const missingId = protocolIds.find((_, i) => !protocols[i]);
  if (missingId) throw missing(`safety protocol ${missingId}`);
  return {
    protocolsMarkdown: protocols.length ? joinProtocols(protocols as SafetyProtocol[]) : undefined,
    codeSpecMarkdown: codeSpec?.markdown,
  };
}
