import type { FunctionReference } from "convex/server";
import { describe, expect, it } from "vitest";

import type { ComponentApi } from "../src/component/_generated/component.js";
import { ContextDev, type RunActionCtx } from "../src/index.js";

type ContextAction = FunctionReference<
  "action",
  "internal",
  {
    params?: unknown;
    body?: unknown;
  },
  unknown
>;

type ActionCall = {
  action: unknown;
  args: unknown;
};

function actionRef(name: string): ContextAction {
  return { name } as unknown as ContextAction;
}

function createCtx(calls: ActionCall[], result: unknown): RunActionCtx {
  return {
    runAction: (async (action: unknown, args: unknown) => {
      calls.push({ action, args });
      return result;
    }) as RunActionCtx["runAction"],
  };
}

describe("ContextDev", () => {
  it("delegates GET helpers to the matching component action", async () => {
    const scrapeMarkdown = actionRef("web.scrapeMarkdown");
    const client = new ContextDev({
      web: {
        scrapeMarkdown,
      },
    } as unknown as ComponentApi);
    const calls: ActionCall[] = [];
    const response = { markdown: "# Example" };

    const result = await client.scrapeMarkdown(createCtx(calls, response), {
      params: {
        url: "https://example.com",
      },
    });

    expect(result).toBe(response);
    expect(calls).toEqual([
      {
        action: scrapeMarkdown,
        args: {
          params: {
            url: "https://example.com",
          },
        },
      },
    ]);
  });

  it("delegates POST helpers with request bodies unchanged", async () => {
    const search = actionRef("web.search");
    const client = new ContextDev({
      web: {
        search,
      },
    } as unknown as ComponentApi);
    const calls: ActionCall[] = [];
    const response = { results: [] };

    const result = await client.search(createCtx(calls, response), {
      body: {
        query: "Context.dev Convex",
        numResults: 3,
      },
    });

    expect(result).toBe(response);
    expect(calls).toEqual([
      {
        action: search,
        args: {
          body: {
            query: "Context.dev Convex",
            numResults: 3,
          },
        },
      },
    ]);
  });
});
