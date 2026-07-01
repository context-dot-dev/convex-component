import { ContextDev } from "@context-dot-dev/convex";
import { v } from "convex/values";

import { components } from "./_generated/api.js";
import { action } from "./_generated/server.js";

const contextDev = new ContextDev(components.contextDev);

export const brand = action({
  args: {
    domain: v.string(),
  },
  handler: async (ctx, args) => {
    return await contextDev.retrieveBrand(ctx, {
      params: {
        domain: args.domain,
      },
    });
  },
});

export const scrapeMarkdown = action({
  args: {
    url: v.string(),
  },
  handler: async (ctx, args) => {
    return await contextDev.scrapeMarkdown(ctx, {
      params: {
        url: args.url,
      },
    });
  },
});
