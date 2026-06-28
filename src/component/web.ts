import { v } from "convex/values";

import { action } from "./_generated/server.js";
import { anyArgs, contextRequest } from "./lib/http.js";

export const scrapeHtml = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/scrape/html", args),
});

export const scrapeMarkdown = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/scrape/markdown", args),
});

export const scrapeImages = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/scrape/images", args),
});

export const crawlSitemap = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/scrape/sitemap", args),
});

export const crawl = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/web/crawl", args),
});

export const extract = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/web/extract", args),
});

export const search = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/web/search", args),
});

export const competitors = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/competitors", args),
});

export const styleguide = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/styleguide", args),
});

export const fonts = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/fonts", args),
});

export const screenshot = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/screenshot", args),
});
