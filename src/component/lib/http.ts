import { ConvexError, v } from "convex/values";

import { env } from "../_generated/server.js";
import type { paths } from "../../generated/openapi.js";

export const API_BASE_URL = "https://api.context.dev/v1";

export const anyArgs = {
  params: v.optional(v.any()),
  body: v.optional(v.any()),
};

type MethodFor<Path extends keyof paths> = Extract<
  keyof paths[Path],
  "get" | "post" | "put" | "patch" | "delete"
>;

type JsonResponse<
  Path extends keyof paths,
  Method extends MethodFor<Path>,
> = paths[Path][Method] extends {
  responses: infer Responses;
}
  ? Responses extends {
      200: {
        content: {
          "application/json": infer Body;
        };
      };
    }
    ? Body
    : unknown
  : unknown;

type RequestArgs = {
  params?: unknown;
  body?: unknown;
};

export async function contextRequest<
  Path extends keyof paths,
  Method extends MethodFor<Path>,
>(
  method: Method,
  path: Path,
  args: RequestArgs,
): Promise<JsonResponse<Path, Method>> {
  const url = new URL(`${API_BASE_URL}${String(path)}`);

  if (args.params !== undefined) {
    appendQueryParams(url.searchParams, args.params);
  }

  const response = await fetch(url, {
    method: String(method).toUpperCase(),
    headers: {
      Authorization: `Bearer ${env.CONTEXT_DEV_API_KEY}`,
      Accept: "application/json",
      ...(args.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: args.body === undefined ? undefined : JSON.stringify(args.body),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ConvexError({
      message: errorMessage(payload, response.status),
      status: response.status,
      response: payload,
    });
  }

  return payload as JsonResponse<Path, Method>;
}

function appendQueryParams(searchParams: URLSearchParams, value: unknown, prefix?: string) {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendQueryParams(searchParams, item, prefix);
    }
    return;
  }

  if (typeof value === "object") {
    for (const [key, nestedValue] of Object.entries(value)) {
      appendQueryParams(
        searchParams,
        nestedValue,
        prefix === undefined ? key : `${prefix}[${key}]`,
      );
    }
    return;
  }

  if (prefix === undefined) {
    throw new ConvexError("Query parameter objects must have keys.");
  }

  searchParams.append(prefix, String(value));
}

function errorMessage(payload: unknown, status: number) {
  if (
    payload !== null &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  return `Context.dev API request failed with status ${status}`;
}
