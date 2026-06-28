import { action } from "./_generated/server.js";
import { contextRequest } from "./lib/http.js";
import { apiResponse, args as validators } from "./lib/validators.js";

export const retrieve = action({
  args: validators.retrievePerson,
  returns: apiResponse,
  handler: async (_, args) => contextRequest("post", "/people/retrieve", args),
});
