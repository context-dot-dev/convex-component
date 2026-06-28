import { defineComponent } from "convex/server";
import { v } from "convex/values";

const component = defineComponent("contextDev", {
  env: {
    CONTEXT_DEV_API_KEY: v.string(),
  },
});

export default component;
