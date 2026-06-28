import { v } from "convex/values";

import { action } from "./_generated/server.js";
import { anyArgs, contextRequest } from "./lib/http.js";

export const query = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/brand/ai/query", args),
});

export const product = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/brand/ai/product", args),
});

export const products = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/brand/ai/products", args),
});
