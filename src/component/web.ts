import { action } from "./_generated/server.js";
import { contextRequest } from "./lib/http.js";
import { apiResponse, args as validators } from "./lib/validators.js";

export const scrapeHtml = action({
  args: validators.scrapeHtml,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/scrape/html", args),
});

export const scrapeMarkdown = action({
  args: validators.scrapeMarkdown,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/scrape/markdown", args),
});

export const scrapeImages = action({
  args: validators.scrapeImages,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/scrape/images", args),
});

export const crawlSitemap = action({
  args: validators.crawlSitemap,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/scrape/sitemap", args),
});

export const crawl = action({
  args: validators.crawl,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/web/crawl", args),
});

export const extract = action({
  args: validators.extract,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/web/extract", args),
});

export const search = action({
  args: validators.search,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/web/search", args),
});

export const competitors = action({
  args: validators.competitors,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/competitors", args),
});

export const styleguide = action({
  args: validators.styleguide,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/styleguide", args),
});

export const fonts = action({
  args: validators.fonts,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/fonts", args),
});

export const screenshot = action({
  args: validators.screenshot,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/screenshot", args),
});
