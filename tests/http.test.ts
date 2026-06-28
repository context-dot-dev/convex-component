import { afterEach, describe, expect, it, vi } from "vitest";

import { contextRequest } from "../src/component/lib/http.js";

describe("contextRequest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.CONTEXT_DEV_API_KEY;
  });

  it("sends bearer auth and serializes deep-object query params", async () => {
    process.env.CONTEXT_DEV_API_KEY = "test-key";

    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    await contextRequest("get", "/web/scrape/markdown", {
      params: {
        url: "https://example.com",
        includeFrames: true,
        headers: {
          "X-Test": "yes",
        },
      },
    });

    const [url, init] = fetchMock.mock.calls[0]!;
    const parsedUrl = new URL(String(url));

    expect(parsedUrl.origin + parsedUrl.pathname).toBe(
      "https://api.context.dev/v1/web/scrape/markdown",
    );
    expect(parsedUrl.searchParams.get("url")).toBe("https://example.com");
    expect(parsedUrl.searchParams.get("includeFrames")).toBe("true");
    expect(parsedUrl.searchParams.get("headers[X-Test]")).toBe("yes");
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer test-key",
      Accept: "application/json",
    });
  });

  it("sends JSON request bodies for POST endpoints", async () => {
    process.env.CONTEXT_DEV_API_KEY = "test-key";

    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ results: [] }), {
        headers: { "content-type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    await contextRequest("post", "/web/search", {
      body: {
        query: "Context.dev Convex",
      },
    });

    const [, init] = fetchMock.mock.calls[0]!;

    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({
      "Content-Type": "application/json",
    });
    expect(init?.body).toBe(JSON.stringify({ query: "Context.dev Convex" }));
  });
});
