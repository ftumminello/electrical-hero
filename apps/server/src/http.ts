import type { Context } from "hono";
import { z } from "zod";

export type ErrorStatus = 400 | 404 | 500 | 502;

export class HttpError extends Error {
  readonly status: ErrorStatus;

  constructor(status: ErrorStatus, message: string) {
    super(message);
    this.status = status;
  }
}

export const badRequest = (message: string) => new HttpError(400, message);
export const notFound = (message: string) => new HttpError(404, message);

export function errorResponse(err: Error, c: Context): Response {
  if (err instanceof HttpError) return c.json({ error: err.message }, err.status);
  console.error(err);
  return c.json({ error: "Internal error" }, 500);
}

/** Parses and validates a JSON body, turning any problem into a 400. */
export async function readJson<T>(c: Context, schema: z.ZodType<T>): Promise<T> {
  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    throw badRequest("Request body must be valid JSON");
  }
  const result = schema.safeParse(raw);
  if (!result.success) throw badRequest(z.prettifyError(result.error));
  return result.data;
}
