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
    ? Query
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

type RunActionCtx = {
  // Convex's concrete ctx type varies by function kind; the helper only needs runAction.
  runAction: (action: any, args: any) => Promise<any>;
};

export class ContextDev {
  constructor(private readonly component: ComponentApi) {}

  scrapeHtml(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/html", "get">) {
    return this.run<"/web/scrape/html", "get">(ctx, this.component.web.scrapeHtml, args);
  }

  scrapeMarkdown(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/markdown", "get">) {
    return this.run<"/web/scrape/markdown", "get">(
      ctx,
      this.component.web.scrapeMarkdown,
      args,
    );
  }

  scrapeImages(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/images", "get">) {
    return this.run<"/web/scrape/images", "get">(ctx, this.component.web.scrapeImages, args);
  }

  crawlSitemap(ctx: RunActionCtx, args: ContextDevArgs<"/web/scrape/sitemap", "get">) {
    return this.run<"/web/scrape/sitemap", "get">(
      ctx,
      this.component.web.crawlSitemap,
      args,
    );
  }

  crawl(ctx: RunActionCtx, args: ContextDevArgs<"/web/crawl", "post">) {
    return this.run<"/web/crawl", "post">(ctx, this.component.web.crawl, args);
  }

  extract(ctx: RunActionCtx, args: ContextDevArgs<"/web/extract", "post">) {
    return this.run<"/web/extract", "post">(ctx, this.component.web.extract, args);
  }

  search(ctx: RunActionCtx, args: ContextDevArgs<"/web/search", "post">) {
    return this.run<"/web/search", "post">(ctx, this.component.web.search, args);
  }

  competitors(ctx: RunActionCtx, args: ContextDevArgs<"/web/competitors", "get">) {
    return this.run<"/web/competitors", "get">(ctx, this.component.web.competitors, args);
  }

  styleguide(ctx: RunActionCtx, args: ContextDevArgs<"/web/styleguide", "get">) {
    return this.run<"/web/styleguide", "get">(ctx, this.component.web.styleguide, args);
  }

  fonts(ctx: RunActionCtx, args: ContextDevArgs<"/web/fonts", "get">) {
    return this.run<"/web/fonts", "get">(ctx, this.component.web.fonts, args);
  }

  screenshot(ctx: RunActionCtx, args: ContextDevArgs<"/web/screenshot", "get">) {
    return this.run<"/web/screenshot", "get">(ctx, this.component.web.screenshot, args);
  }

  retrieveBrand(ctx: RunActionCtx, args: ContextDevArgs<"/brand/retrieve", "get">) {
    return this.run<"/brand/retrieve", "get">(ctx, this.component.brand.retrieve, args);
  }

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

  prefetchBrand(ctx: RunActionCtx, args: ContextDevArgs<"/brand/prefetch", "post">) {
    return this.run<"/brand/prefetch", "post">(ctx, this.component.brand.prefetch, args);
  }

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

  retrievePerson(ctx: RunActionCtx, args: ContextDevArgs<"/people/retrieve", "post">) {
    return this.run<"/people/retrieve", "post">(ctx, this.component.people.retrieve, args);
  }

  retrieveNaics(ctx: RunActionCtx, args: ContextDevArgs<"/web/naics", "get">) {
    return this.run<"/web/naics", "get">(ctx, this.component.industry.retrieveNaics, args);
  }

  retrieveSic(ctx: RunActionCtx, args: ContextDevArgs<"/web/sic", "get">) {
    return this.run<"/web/sic", "get">(ctx, this.component.industry.retrieveSic, args);
  }

  aiQuery(ctx: RunActionCtx, args: ContextDevArgs<"/brand/ai/query", "post">) {
    return this.run<"/brand/ai/query", "post">(ctx, this.component.ai.query, args);
  }

  extractProduct(ctx: RunActionCtx, args: ContextDevArgs<"/brand/ai/product", "post">) {
    return this.run<"/brand/ai/product", "post">(ctx, this.component.ai.product, args);
  }

  extractProducts(ctx: RunActionCtx, args: ContextDevArgs<"/brand/ai/products", "post">) {
    return this.run<"/brand/ai/products", "post">(ctx, this.component.ai.products, args);
  }

  private async run<Path extends keyof paths, Method extends MethodFor<Path>>(
    ctx: RunActionCtx,
    action: unknown,
    args: ContextDevArgs<Path, Method>,
  ): Promise<ContextDevResponse<Path, Method>> {
    return (await ctx.runAction(action, args)) as ContextDevResponse<Path, Method>;
  }
}

export type { ComponentApi, paths };
