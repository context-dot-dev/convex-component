import { v } from "convex/values";

import { action } from "./_generated/server.js";
import { anyArgs, contextRequest } from "./lib/http.js";

export const retrieveNaics = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/naics", args),
});

export const retrieveSic = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("get", "/web/sic", args),
});
