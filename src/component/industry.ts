import { action } from "./_generated/server.js";
import { contextRequest } from "./lib/http.js";
import { apiResponse, args as validators } from "./lib/validators.js";

export const retrieveNaics = action({
  args: validators.retrieveNaics,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/naics", args),
});

export const retrieveSic = action({
  args: validators.retrieveSic,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("get", "/web/sic", args),
});
