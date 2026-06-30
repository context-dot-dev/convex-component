/// <reference types="vite/client" />

import schema from "./component/schema.js";

const modules = import.meta.glob("./component/**/*.ts");

type ConvexTestLike = {
  registerComponent: (name: string, schema: unknown, modules: unknown) => void;
};

export function registerContextDev(t: ConvexTestLike, name = "contextDev") {
  t.registerComponent(name, schema, modules);
}

export { modules, schema };

export default {
  modules,
  register: registerContextDev,
  schema,
};
