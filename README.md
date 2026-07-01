[![Convex Component](https://www.convex.dev/components/badge/context-dot-dev/convex)](https://www.convex.dev/components/context-dot-dev/convex)

# Context.dev Convex Component

Call the [Context.dev](https://context.dev) API from your Convex actions. This component wraps the Context.dev REST API with typed helpers and isolated component actions—no data is stored in Convex.

## Prerequisites

- A Convex app ([get started](https://docs.convex.dev/get-started))
- A [Context.dev API key](https://context.dev)

## Install

```sh
npm install @context-dot-dev/convex
```

## Setup

Add the component to your Convex app config and wire your API key through component env:

```ts
import contextDev from "@context-dot-dev/convex/convex.config.js";
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

Set `CONTEXT_DEV_API_KEY` on your Convex deployment:

```sh
npx convex env set CONTEXT_DEV_API_KEY your_api_key_here
npx convex dev
```

## Usage

### Typed helper client (recommended)

Create a shared client and call it from your actions:

```ts
import { ContextDev } from "@context-dot-dev/convex";
import { v } from "convex/values";

import { components } from "./_generated/api.js";
import { action } from "./_generated/server.js";

const contextDev = new ContextDev(components.contextDev);

export const brand = action({
  args: { domain: v.string() },
  handler: async (ctx, args) => {
    return await contextDev.retrieveBrand(ctx, {
      params: { domain: args.domain },
    });
  },
});

export const scrapeMarkdown = action({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    return await contextDev.scrapeMarkdown(ctx, {
      params: { url: args.url },
    });
  },
});
```

### Direct component actions

You can also call component actions directly with `ctx.runAction`:

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

## API reference

GET endpoints take `params`. POST endpoints take `body` and may also take `params` when the operation defines query parameters. Responses are validated as JSON before being returned to your function.

### Helper methods

| Method | Description |
| --- | --- |
| `scrapeHtml` | Scrape a URL and return raw HTML |
| `scrapeMarkdown` | Scrape a URL and return Markdown |
| `scrapeImages` | Extract image references from a page |
| `crawlSitemap` | Crawl a domain sitemap |
| `crawl` | Crawl a site and return Markdown pages |
| `extract` | Crawl pages and extract structured data from a JSON schema |
| `search` | Search the web with optional filters and Markdown extraction |
| `competitors` | Find direct competitors for a domain |
| `styleguide` | Extract colors, typography, and design system details |
| `fonts` | Extract font usage and font asset links |
| `screenshot` | Capture a website screenshot |
| `retrieveBrand` | Retrieve full brand data by domain |
| `retrieveBrandByName` | Retrieve brand data by company name |
| `retrieveBrandByEmail` | Retrieve brand data from a business email |
| `retrieveBrandByTicker` | Retrieve brand data by stock ticker |
| `retrieveBrandByIsin` | Retrieve brand data by ISIN |
| `identifyBrandFromTransaction` | Identify a brand from transaction text |
| `retrieveSimplifiedBrand` | Retrieve a smaller brand payload |
| `prefetchBrand` | Queue brand prefetching by domain |
| `prefetchBrandByEmail` | Queue brand prefetching by email |
| `retrievePerson` | Retrieve a person profile from supported identifiers |
| `retrieveNaics` | Classify a company into NAICS codes |
| `retrieveSic` | Classify a company into SIC codes |
| `aiQuery` | Extract custom AI-defined datapoints from a website |
| `extractProduct` | Extract product data from a product page URL |
| `extractProducts` | Extract product listings from a domain or URL |

### Component action groups

Raw component actions are available under:

- `components.contextDev.brand`
- `components.contextDev.web`
- `components.contextDev.ai`
- `components.contextDev.industry`
- `components.contextDev.people`

Argument and response types are inferred from the Context.dev OpenAPI spec, so your editor will autocomplete `params` and `body` fields.

## Caching

This component does not persist data in Convex. Context.dev caching is controlled through API parameters such as `maxAgeMs` on individual requests.

## Learn more

- [Context.dev documentation](https://docs.context.dev)
- [Convex components](https://docs.convex.dev/components)
