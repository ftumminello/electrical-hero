import { z } from "zod";

/** Returns the first balanced top-level JSON object in model output (models wrap JSON in prose/fences). */
export function extractJsonObject(text: string): unknown {
  const start = text.indexOf("{");
  if (start === -1) throw new Error("no JSON object in model output");
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return JSON.parse(text.slice(start, i + 1));
  }
  throw new Error("unterminated JSON object in model output");
}

export function parseModelJson<T>(
  text: string,
  schema: z.ZodType<T>,
): { ok: true; value: T } | { ok: false; error: string } {
  let raw: unknown;
  try {
    raw = extractJsonObject(text);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  const result = schema.safeParse(raw);
  return result.success ? { ok: true, value: result.data } : { ok: false, error: z.prettifyError(result.error) };
}

/** Text of a non-streaming Workers AI result, in either output shape. */
export function completionText(result: unknown): string {
  const r = result as { response?: unknown; choices?: { message?: { content?: unknown } }[] } | null | undefined;
  if (typeof r?.response === "string") return r.response;
  const content = r?.choices?.[0]?.message?.content;
  return typeof content === "string" ? content : "";
}
