import type { ChatStreamEvent } from "@electrical-hero/shared";
import type { ByteStream } from "./stream-fetch.types";

// Browsers and Expo both provide TextDecoder; React Native's types just don't declare it.
type Decoder = { decode(input?: Uint8Array, options?: { stream?: boolean }): string };
const createDecoder = () => new (globalThis as unknown as { TextDecoder: new () => Decoder }).TextDecoder();

const parseFrame = (frame: string): ChatStreamEvent | null => {
  const event = /^event: (.*)$/m.exec(frame)?.[1];
  const data = /^data: (.*)$/m.exec(frame)?.[1];
  if (!event || !data) return null;
  return { event, data: JSON.parse(data) } as ChatStreamEvent;
};

/** Reads the SSE stream from POST /sessions/:id/messages. Resolves with the saved message id. */
export async function readChatStream(body: ByteStream, onText: (text: string) => void): Promise<string> {
  const reader = body.getReader();
  const decoder = createDecoder();
  let buffer = "";

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let sep: number;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const frame = parseFrame(buffer.slice(0, sep));
      buffer = buffer.slice(sep + 2);
      if (frame?.event === "delta") onText(frame.data.text);
      else if (frame?.event === "done") return frame.data.messageId;
      else if (frame?.event === "error") throw new Error(frame.data.error);
    }
  }
  throw new Error("The reply was cut off. Try sending it again.");
}
