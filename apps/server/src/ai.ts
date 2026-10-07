import type { z } from "zod";
import { completionText, parseModelJson } from "./domain/json";
import type { ModelMessage } from "./domain/prompts";
import { HttpError } from "./http";

// gpt-oss counts reasoning against max_tokens, and its default is only 256.
const CHAT_MAX_TOKENS = 1500;
const JSON_MAX_TOKENS = 4000;

// The generated binding types are per-model unions; we pick the model from vars at runtime.
type AiRunner = { run(model: string, inputs: Record<string, unknown>): Promise<unknown> };

// Chat stays cheap and fast; the once-per-scenario JSON jobs buy more reasoning for accuracy.
type Effort = "low" | "medium";

async function run(env: Env, effort: Effort, inputs: Record<string, unknown>): Promise<unknown> {
  const model: string = env.AI_MODEL;
  const tuning = model.startsWith("@cf/openai/gpt-oss") ? { reasoning_effort: effort } : {};
  try {
    return await (env.AI as unknown as AiRunner).run(model, { ...tuning, ...inputs });
  } catch (e) {
    throw new HttpError(502, `Workers AI error: ${(e as Error).message}`);
  }
}

export async function streamChat(env: Env, messages: ModelMessage[]): Promise<ReadableStream<Uint8Array>> {
  return (await run(env, "low", { messages, stream: true, max_tokens: CHAT_MAX_TOKENS })) as ReadableStream<Uint8Array>;
}

/** Asks for JSON, validates it, and retries once with the validation error before giving up with a 502. */
export async function generateJson<T>(env: Env, messages: ModelMessage[], schema: z.ZodType<T>): Promise<T> {
  let attempt = messages;
  let lastError = "";
  for (let i = 0; i < 2; i++) {
    const text = completionText(await run(env, "medium", { messages: attempt, max_tokens: JSON_MAX_TOKENS }));
    const parsed = parseModelJson(text, schema);
    if (parsed.ok) return parsed.value;
    lastError = parsed.error;
    attempt = [
      ...messages,
      { role: "assistant", content: text },
      { role: "user", content: `That response was not valid: ${parsed.error}\nReply with ONLY the corrected JSON object.` },
    ];
  }
  throw new HttpError(502, `AI returned invalid JSON twice: ${lastError}`);
}
