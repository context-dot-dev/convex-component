import type {
  AnyDataModel,
  FunctionReference,
  GenericActionCtx,
} from "convex/server";
import type { ComponentApi } from "./component/_generated/component.js";
import type { paths } from "./generated/openapi.js";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
type MethodFor<Path extends keyof paths> = Extract<keyof paths[Path], HttpMethod>;
type Operation<Path extends keyof paths, Method extends MethodFor<Path>> =
  paths[Path][Method];

type QueryParams<Path extends keyof paths, Method extends MethodFor<Path>> =
  Operation<Path, Method> extends {
    parameters: {
      query?: infer Query;
    };
  }
    ? NonNullable<Query>
    : never;

type JsonBody<Path extends keyof paths, Method extends MethodFor<Path>> =
  Operation<Path, Method> extends {
    requestBody: {
      content: {
        "application/json": infer Body;
      };
    };
  }
    ? Body
    : never;

type JsonResponse<Path extends keyof paths, Method extends MethodFor<Path>> =
  Operation<Path, Method> extends {
    responses: infer Responses;
  }
    ? Responses extends {
        200: {
          content: {
            "application/json": infer Body;
          };
        };
      }
      ? Body
      : unknown
    : unknown;

export type ContextDevArgs<
  Path extends keyof paths,
  Method extends MethodFor<Path>,
> = ([QueryParams<Path, Method>] extends [never]
  ? { params?: never }
  : { params: QueryParams<Path, Method> }) &
  ([JsonBody<Path, Method>] extends [never]
    ? { body?: never }
    : { body: JsonBody<Path, Method> });

export type ContextDevResponse<
  Path extends keyof paths,
  Method extends MethodFor<Path>,
> = JsonResponse<Path, Method>;

type ContextDevAction = FunctionReference<
  "action",
  "public" | "internal",
  {
    params?: unknown;
    body?: unknown;
  },
  unknown
>;

export type RunActionCtx = Pick<GenericActionCtx<AnyDataModel>, "runAction">;

/**
 * Typed helper for calling the Context.dev Convex component from your app functions.
 */
export class ContextDev {
  constructor(private readonly component: ComponentApi) {}

  /** Scrape a URL and return raw HTML content. */
  scrapeHtml(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/html", "get">) {
    return this.run<"/web/scrape/html", "get">(ctx, this.component.web.scrapeHtml, args);
  }

  /** Scrape a URL and return Markdown suitable for LLM workflows. */
  scrapeMarkdown(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/markdown", "get">) {
    return this.run<"/web/scrape/markdown", "get">(
      ctx,
      this.component.web.scrapeMarkdown,
      args,
    );
  }

  /** Extract image references and optional image metadata from a page. */
  scrapeImages(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/images", "get">) {
    return this.run<"/web/scrape/images", "get">(ctx, this.component.web.scrapeImages, args);
  }

  /** Crawl a domain sitemap and return discovered URLs. */
  crawlSitemap(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/sitemap", "get">) {
    return this.run<"/web/scrape/sitemap", "get">(
      ctx,
      this.component.web.crawlSitemap,
      args,
    );
  }

  /** Crawl a site and return Markdown pages plus crawl metadata. */
  crawl(ctx: RunActionCtx, args: ContextDevArgs<"/web/crawl", "post">) {
    return this.run<"/web/crawl", "post">(ctx, this.component.web.crawl, args);
  }

  /** Crawl pages and extract structured data matching a JSON schema. */
  extract(ctx: RunActionCtx, args: ContextDevArgs<"/web/extract", "post">) {
    return this.run<"/web/extract", "post">(ctx, this.component.web.extract, args);
  }

  /** Search the web with optional domain filters and Markdown extraction. */
  search(ctx: RunActionCtx, args: ContextDevArgs<"/web/search", "post">) {
    return this.run<"/web/search", "post">(ctx, this.component.web.search, args);
  }

  /** Find direct competitors for a company domain. */
  competitors(ctx: RunActionCtx, args: ContextDevArgs<"/web/competitors", "get">) {
    return this.run<"/web/competitors", "get">(ctx, this.component.web.competitors, args);
  }

  /** Extract colors, typography, spacing, and design system details from a site. */
  styleguide(ctx: RunActionCtx, args: ContextDevArgs<"/web/styleguide", "get">) {
    return this.run<"/web/styleguide", "get">(ctx, this.component.web.styleguide, args);
  }

  /** Extract font usage and font asset links from a site. */
  fonts(ctx: RunActionCtx, args: ContextDevArgs<"/web/fonts", "get">) {
    return this.run<"/web/fonts", "get">(ctx, this.component.web.fonts, args);
  }

  /** Capture a website screenshot and return image metadata. */
  screenshot(ctx: RunActionCtx, args: ContextDevArgs<"/web/screenshot", "get">) {
    return this.run<"/web/screenshot", "get">(ctx, this.component.web.screenshot, args);
  }

  /** Retrieve full brand data by domain. */
  retrieveBrand(ctx: RunActionCtx, args: ContextDevArgs<"/brand/retrieve", "get">) {
    return this.run<"/brand/retrieve", "get">(ctx, this.component.brand.retrieve, args);
  }

  /** Retrieve full brand data by company name. */
  retrieveBrandByName(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/retrieve-by-name", "get">,
  ) {
    return this.run<"/brand/retrieve-by-name", "get">(
      ctx,
      this.component.brand.retrieveByName,
      args,
    );
  }

  /** Retrieve full brand data from a business email address. */
  retrieveBrandByEmail(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/retrieve-by-email", "get">,
  ) {
    return this.run<"/brand/retrieve-by-email", "get">(
      ctx,
      this.component.brand.retrieveByEmail,
      args,
    );
  }

  /** Retrieve full brand data by stock ticker. */
  retrieveBrandByTicker(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/retrieve-by-ticker", "get">,
  ) {
    return this.run<"/brand/retrieve-by-ticker", "get">(
      ctx,
      this.component.brand.retrieveByTicker,
      args,
    );
  }

  /** Retrieve full brand data by ISIN. */
  retrieveBrandByIsin(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/retrieve-by-isin", "get">,
  ) {
    return this.run<"/brand/retrieve-by-isin", "get">(
      ctx,
      this.component.brand.retrieveByIsin,
      args,
    );
  }

  /** Identify a brand from card transaction text and optional location hints. */
  identifyBrandFromTransaction(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/transaction_identifier", "get">,
  ) {
    return this.run<"/brand/transaction_identifier", "get">(
      ctx,
      this.component.brand.identifyFromTransaction,
      args,
    );
  }

  /** Retrieve a smaller brand payload with core identity assets. */
  retrieveSimplifiedBrand(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/retrieve-simplified", "get">,
  ) {
    return this.run<"/brand/retrieve-simplified", "get">(
      ctx,
      this.component.brand.retrieveSimplified,
      args,
    );
  }

  /** Queue brand data prefetching by domain. */
  prefetchBrand(ctx: RunActionCtx, args: ContextDevArgs<"/brand/prefetch", "post">) {
    return this.run<"/brand/prefetch", "post">(ctx, this.component.brand.prefetch, args);
  }

  /** Queue brand data prefetching by email address. */
  prefetchBrandByEmail(
    ctx: RunActionCtx,
    args: ContextDevArgs<"/brand/prefetch-by-email", "post">,
  ) {
    return this.run<"/brand/prefetch-by-email", "post">(
      ctx,
      this.component.brand.prefetchByEmail,
      args,
    );
  }

  /** Retrieve a person profile from supported identifiers such as LinkedIn URL. */
  retrievePerson(ctx: RunActionCtx, args: ContextDevArgs<"/people/retrieve", "post">) {
    return this.run<"/people/retrieve", "post">(ctx, this.component.people.retrieve, args);
  }

  /** Classify a brand or company into NAICS industry codes. */
  retrieveNaics(ctx: RunActionCtx, args: ContextDevArgs<"/web/naics", "get">) {
    return this.run<"/web/naics", "get">(ctx, this.component.industry.retrieveNaics, args);
  }

  /** Classify a brand or company into SIC industry codes. */
  retrieveSic(ctx: RunActionCtx, args: ContextDevArgs<"/web/sic", "get">) {
    return this.run<"/web/sic", "get">(ctx, this.component.industry.retrieveSic, args);
  }

  /** Extract custom AI-defined datapoints from a brand website. */
  aiQuery(ctx: RunActionCtx, args: ContextDevArgs<"/brand/ai/query", "post">) {
    return this.run<"/brand/ai/query", "post">(ctx, this.component.ai.query, args);
  }

  /** Extract product data from a product detail page URL. */
  extractProduct(ctx: RunActionCtx, args: ContextDevArgs<"/brand/ai/product", "post">) {
    return this.run<"/brand/ai/product", "post">(ctx, this.component.ai.product, args);
  }

  /** Extract product listings from a domain or direct URL. */
  extractProducts(ctx: RunActionCtx, args: ContextDevArgs<"/brand/ai/products", "post">) {
    return this.run<"/brand/ai/products", "post">(ctx, this.component.ai.products, args);
  }

  private async run<Path extends keyof paths, Method extends MethodFor<Path>>(
    ctx: RunActionCtx,
    action: ContextDevAction,
    args: ContextDevArgs<Path, Method>,
  ): Promise<ContextDevResponse<Path, Method>> {
    return (await ctx.runAction(action, args)) as ContextDevResponse<Path, Method>;
  }
}

export type { ComponentApi, paths };
