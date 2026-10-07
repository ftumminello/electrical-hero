import type { Regulation } from "@electrical-hero/shared";
import { HttpError, notFound } from "../http";
import { ecfrReaderUrl, ecfrSectionUrl, ecfrXmlToText } from "../domain/ecfr";

const API = "https://www.ecfr.gov/api/versioner/v1";
const DAY_S = 24 * 60 * 60;

// Per-isolate cache: eCFR changes at most daily. Failures are never stored, so the next request retries.
const memo = new Map<string, { at: number; value: unknown }>();
async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < DAY_S * 1000) return hit.value as T;
  const value = await load();
  memo.set(key, { at: Date.now(), value });
  return value;
}

async function upstream(url: string): Promise<Response> {
  try {
    // eCFR refuses uncompressed responses (406); cf.cacheTtl adds Cloudflare edge caching on top.
    return await fetch(url, { headers: { "accept-encoding": "gzip" }, cf: { cacheTtl: DAY_S, cacheEverything: true } });
  } catch (e) {
    throw new HttpError(502, `eCFR unreachable: ${(e as Error).message}`);
  }
}

/** The versioner only serves dates eCFR has issued, so ask it which date title 29 is current to. */
function latestTitle29Date(): Promise<string> {
  return cached("title-29-date", async () => {
    const res = await upstream(`${API}/titles.json`);
    if (!res.ok) throw new HttpError(502, `eCFR titles lookup failed (${res.status})`);
    const body = (await res.json()) as { titles?: { number: number; up_to_date_as_of?: string }[] };
    const date = body.titles?.find((t) => t.number === 29)?.up_to_date_as_of;
    if (!date) throw new HttpError(502, "eCFR did not report a date for title 29");
    return date;
  });
}

export function getRegulation(section: string): Promise<Regulation> {
  return cached(`cfr-29-${section}`, async () => {
    const asOf = await latestTitle29Date();
    const res = await upstream(ecfrSectionUrl(asOf, section));
    if (res.status === 404) throw notFound(`29 CFR ${section} was not found in eCFR`);
    if (!res.ok) throw new HttpError(502, `eCFR returned ${res.status} for 29 CFR ${section}`);
    const { heading, text } = ecfrXmlToText(await res.text());
    return { section, heading, text, sourceUrl: ecfrReaderUrl(section), asOf };
  });
}
