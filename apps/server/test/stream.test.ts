import { describe, expect, it } from "vitest";
import { extractDeltaText, textDeltas } from "../src/domain/stream";

function streamOf(...chunks: string[]): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream({
    start(ctrl) {
      for (const c of chunks) ctrl.enqueue(enc.encode(c));
      ctrl.close();
    },
  });
}

async function collect(stream: ReadableStream<Uint8Array>): Promise<string[]> {
  const out: string[] = [];
  for await (const t of textDeltas(stream)) out.push(t);
  return out;
}

describe("extractDeltaText", () => {
  it("reads Workers AI and OpenAI-style payloads, ignoring reasoning", () => {
    expect(extractDeltaText({ response: "hi" })).toBe("hi");
    expect(extractDeltaText({ choices: [{ delta: { content: "yo" } }] })).toBe("yo");
    expect(extractDeltaText({ choices: [{ delta: { reasoning_content: "think" } }] })).toBe("");
    expect(extractDeltaText(null)).toBe("");
  });
});

describe("textDeltas", () => {
  it("reassembles events split across chunks and stops at [DONE]", async () => {
    const s = streamOf(
      'data: {"choices":[{"delta":{"con',
      'tent":"Hel"}}]}\n\ndata: {"choices":[{"delta":{"content":"lo"}}]}\n\n',
      "data: [DONE]\n\n",
    );
    expect(await collect(s)).toEqual(["Hel", "lo"]);
  });

  it("drops reasoning-only deltas and tolerates CRLF", async () => {
    const s = streamOf('data: {"choices":[{"delta":{"reasoning_content":"hmm"}}]}\r\n\r\ndata: {"response":"ok"}\r\n\r\n');
    expect(await collect(s)).toEqual(["ok"]);
  });

  it("yields nothing for a reasoning-only stream", async () => {
    expect(await collect(streamOf('data: {"choices":[{"delta":{"reasoning_content":"x"}}]}\n\ndata: [DONE]\n\n'))).toEqual([]);
  });

  it("handles a final event with no trailing blank line", async () => {
    expect(await collect(streamOf('data: {"response":"end"}'))).toEqual(["end"]);
  });

  it("skips malformed JSON payloads", async () => {
    expect(await collect(streamOf('data: {oops\n\ndata: {"response":"fine"}\n\n'))).toEqual(["fine"]);
  });
});
