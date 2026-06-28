import { action } from "./_generated/server.js";
import { contextRequest } from "./lib/http.js";
import { apiResponse, args as validators } from "./lib/validators.js";

export const retrieve = action({
  args: validators.retrieveBrand,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/retrieve", args),
});

export const retrieveByName = action({
  args: validators.retrieveBrandByName,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-name", args),
});

export const retrieveByEmail = action({
  args: validators.retrieveBrandByEmail,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-email", args),
});

export const retrieveByTicker = action({
  args: validators.retrieveBrandByTicker,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-ticker", args),
});

export const retrieveByIsin = action({
  args: validators.retrieveBrandByIsin,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-by-isin", args),
});

export const identifyFromTransaction = action({
  args: validators.identifyBrandFromTransaction,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/transaction_identifier", args),
});

export const retrieveSimplified = action({
  args: validators.retrieveSimplifiedBrand,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/brand/retrieve-simplified", args),
});

export const prefetch = action({
  args: validators.prefetchBrand,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/brand/prefetch", args),
});

export const prefetchByEmail = action({
  args: validators.prefetchBrandByEmail,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/brand/prefetch-by-email", args),
});
