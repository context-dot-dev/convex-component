import type { FunctionReference } from "convex/server";

type ContextDevAction = FunctionReference<
  "action",
  "internal",
  {
    params?: any;
    body?: any;
  },
  any
>;

export type ComponentApi<Name extends string | undefined = string | undefined> = {
  ai: {
    query: ContextDevAction;
    product: ContextDevAction;
    products: ContextDevAction;
  };
  brand: {
    identifyFromTransaction: ContextDevAction;
    prefetch: ContextDevAction;
    prefetchByEmail: ContextDevAction;
    retrieve: ContextDevAction;
    retrieveByEmail: ContextDevAction;
    retrieveByIsin: ContextDevAction;
    retrieveByName: ContextDevAction;
    retrieveByTicker: ContextDevAction;
    retrieveSimplified: ContextDevAction;
  };
  industry: {
    retrieveNaics: ContextDevAction;
    retrieveSic: ContextDevAction;
  };
  people: {
    retrieve: ContextDevAction;
  };
  web: {
    competitors: ContextDevAction;
    crawl: ContextDevAction;
    crawlSitemap: ContextDevAction;
    extract: ContextDevAction;
    fonts: ContextDevAction;
    scrapeHtml: ContextDevAction;
    scrapeImages: ContextDevAction;
    scrapeMarkdown: ContextDevAction;
    screenshot: ContextDevAction;
    search: ContextDevAction;
    styleguide: ContextDevAction;
  };
  componentPath: Name;
};
