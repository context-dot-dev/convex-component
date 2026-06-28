import { action } from "./_generated/server.js";
import { contextRequest } from "./lib/http.js";
import { apiResponse, args as validators } from "./lib/validators.js";

export const query = action({
  args: validators.aiQuery,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/brand/ai/query", args),
});

export const product = action({
  args: validators.extractProduct,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/brand/ai/product", args),
});

export const products = action({
  args: validators.extractProducts,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/brand/ai/products", args),
});
