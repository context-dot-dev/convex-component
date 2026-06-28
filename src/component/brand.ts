import { v } from "convex/values";

import { action } from "./_generated/server.js";
import { anyArgs, contextRequest } from "./lib/http.js";

export const retrieve = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/retrieve", args),
});

export const retrieveByName = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-name", args),
});

export const retrieveByEmail = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-email", args),
});

export const retrieveByTicker = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-ticker", args),
});

export const retrieveByIsin = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-isin", args),
});

export const identifyFromTransaction = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/transaction_identifier", args),
});

export const retrieveSimplified = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-simplified", args),
});

export const prefetch = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/brand/prefetch", args),
});

export const prefetchByEmail = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/brand/prefetch-by-email", args),
});
