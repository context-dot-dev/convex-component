# Context.dev Convex Component

Use the Context.dev API from Convex actions through an isolated Convex component.

This package is generated against `openapispec.json` and exposes thin wrappers for the Context.dev REST API. It does not persist data in Convex; Context.dev caching behavior is controlled through the API parameters such as `maxAgeMs`.

## Install

```sh
npm install @context-dev/convex
```

Add the component to your Convex app:

```ts
import contextDev from "@context-dev/convex/convex.config.js";
import { defineApp } from "convex/server";
import { v } from "convex/values";

const app = defineApp({
  env: {
    CONTEXT_DEV_API_KEY: v.string(),
  },
});

app.use(contextDev, {
  env: {
    CONTEXT_DEV_API_KEY: app.env.CONTEXT_DEV_API_KEY,
  },
});

export default app;
```

Set `CONTEXT_DEV_API_KEY` on the Convex deployment, then run:

```sh
npx convex dev
```

## Usage

You can call the component API directly from Convex actions:

```ts
import { v } from "convex/values";

import { components } from "./_generated/api.js";
import { action } from "./_generated/server.js";

export const brand = action({
  args: { domain: v.string() },
  handler: async (ctx, args) => {
    return await ctx.runAction(components.contextDev.brand.retrieve, {
      params: { domain: args.domain },
    });
  },
});
```

Or use the typed helper client:

```ts
import { ContextDev } from "@context-dev/convex";
import { v } from "convex/values";

import { components } from "./_generated/api.js";
import { action } from "./_generated/server.js";

const contextDev = new ContextDev(components.contextDev);

export const scrape = action({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    return await contextDev.scrapeMarkdown(ctx, {
      params: { url: args.url },
    });
  },
});
```

## API Shape

GET endpoints take `params`; POST endpoints take `body` and may also take `params` if the OpenAPI operation defines query parameters.

The helper client types `params`, `body`, and returned data from `openapispec.json`:

- `contextDev.retrieveBrand(ctx, { params: { domain } })`
- `contextDev.retrieveBrandByName(ctx, { params: { company_name } })`
- `contextDev.retrieveBrandByEmail(ctx, { params: { email } })`
- `contextDev.identifyBrandFromTransaction(ctx, { params: { transaction_info } })`
- `contextDev.scrapeMarkdown(ctx, { params: { url } })`
- `contextDev.crawl(ctx, { body: { url, maxPages } })`
- `contextDev.extract(ctx, { body: { url, schema } })`
- `contextDev.search(ctx, { body: { query } })`
- `contextDev.aiQuery(ctx, { body: { domain, data_to_extract } })`
- `contextDev.extractProducts(ctx, { body: { domain } })`
- `contextDev.retrieveNaics(ctx, { params: { input } })`

The component actions also validate their runtime argument shapes with Convex validators. For example, `components.contextDev.web.scrapeMarkdown` requires `params.url`, while `components.contextDev.web.search` requires `body.query`. API responses are validated as JSON objects before they are returned to your Convex function.

Raw component action groups are available under:

- `components.contextDev.brand`
- `components.contextDev.web`
- `components.contextDev.ai`
- `components.contextDev.industry`
- `components.contextDev.people`

## Development

```sh
npm install
npm run build
npm run typecheck
```

`npm run build` regenerates TypeScript types from `openapispec.json` and compiles the package.

After configuring a real Convex deployment, run `npm run codegen` to refresh the component generated files from Convex itself.
