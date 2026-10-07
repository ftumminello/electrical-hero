/** Visible answer text from one upstream SSE payload. Reasoning deltas are deliberately ignored. */
export function extractDeltaText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const p = payload as { response?: unknown; choices?: { delta?: { content?: unknown } }[] };
  if (typeof p.response === "string") return p.response;
  const content = p.choices?.[0]?.delta?.content;
  return typeof content === "string" ? content : "";
}

function deltaFromEvent(block: string): string {
  const data = block
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n");
  if (!data || data === "[DONE]") return "";
  try {
    return extractDeltaText(JSON.parse(data));
  } catch {
    return "";
  }
}

/** Turns a Workers AI SSE byte stream into answer-text chunks, whatever the model's chunk format. */
export async function* textDeltas(stream: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    let sep: number;
    while ((sep = buffer.search(/\r?\n\r?\n/)) !== -1) {
      const text = deltaFromEvent(buffer.slice(0, sep));
      buffer = buffer.slice(sep).replace(/^\r?\n\r?\n/, "");
      if (text) yield text;
    }
  }
  const tail = deltaFromEvent(buffer);
  if (tail) yield tail;
}
