import { v } from "convex/values";

import { action } from "./_generated/server.js";
import { anyArgs, contextRequest } from "./lib/http.js";

export const retrieve = action({
  args: anyArgs,
  returns: v.any(),
  handler: async (_, args) => contextRequest("post", "/people/retrieve", args),
});
