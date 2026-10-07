/** The parts of a streaming fetch Response the chat client uses (web fetch and expo/fetch both fit). */
export type ByteStream = { getReader(): { read(): Promise<{ value?: Uint8Array; done: boolean }> } };

export type StreamResponse = {
  ok: boolean;
  status: number;
  body: ByteStream | null;
  json(): Promise<unknown>;
};

export type StreamFetch = (
  url: string,
  init: { method: "POST"; headers: Record<string, string>; body: string },
) => Promise<StreamResponse>;
