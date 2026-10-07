import { describe, expect, it } from "vitest";
import { z } from "zod";
import { generateJson, streamChat } from "../src/ai";

function fakeEnv(reply: unknown) {
  const calls: Record<string, unknown>[] = [];
  const env = {
    AI_MODEL: "@cf/openai/gpt-oss-120b",
    AI: { run: async (_model: string, inputs: Record<string, unknown>) => (calls.push(inputs), reply) },
  } as unknown as Env;
  return { env, calls };
}

describe("ai reasoning effort", () => {
  it("chat streams at low effort", async () => {
    const { env, calls } = fakeEnv(new ReadableStream());
    await streamChat(env, [{ role: "user", content: "hi" }]);
    expect(calls[0].reasoning_effort).toBe("low");
  });

  it("JSON jobs (scenario generation, debrief) run at medium effort", async () => {
    const { env, calls } = fakeEnv({ choices: [{ message: { content: '{"a":1}' } }] });
    await generateJson(env, [{ role: "user", content: "x" }], z.object({ a: z.number() }));
    expect(calls[0].reasoning_effort).toBe("medium");
  });
});
