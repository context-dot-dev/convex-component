import { v } from "convex/values";
import type { Validator } from "convex/values";

const jsonPrimitive = v.union(v.null(), v.boolean(), v.number(), v.string());
const jsonValue1 = v.union(
  jsonPrimitive,
  v.array(jsonPrimitive),
  v.record(v.string(), jsonPrimitive),
);
const jsonValue2 = v.union(
  jsonPrimitive,
  v.array(jsonValue1),
  v.record(v.string(), jsonValue1),
);
const jsonValue3 = v.union(
  jsonPrimitive,
  v.array(jsonValue2),
  v.record(v.string(), jsonValue2),
);
const jsonValue4 = v.union(
  jsonPrimitive,
  v.array(jsonValue3),
  v.record(v.string(), jsonValue3),
);
const jsonValue5 = v.union(
  jsonPrimitive,
  v.array(jsonValue4),
  v.record(v.string(), jsonValue4),
);
const jsonValue6 = v.union(
  jsonPrimitive,
  v.array(jsonValue5),
  v.record(v.string(), jsonValue5),
);

export const jsonValue = jsonValue6;
// Context.dev endpoints return JSON object envelopes. The validator is intentionally
// recursive to a practical depth instead of accepting arbitrary Convex values.
export const apiResponse = v.record(v.string(), jsonValue) as unknown as Validator<unknown>;

const optionalStringArray = v.optional(v.array(v.string()));
const optionalHeaders = v.optional(v.record(v.string(), v.string()));
const optionalTimeoutMS = v.optional(v.number());
const optionalMaxAgeMs = v.optional(v.number());

const pdfOptions = v.optional(
  v.object({
    shouldParse: v.optional(v.boolean()),
    start: v.optional(v.number()),
    end: v.optional(v.number()),
  }),
);

const scrapeParams = {
  url: v.string(),
  pdf: pdfOptions,
  includeFrames: v.optional(v.boolean()),
  useMainContentOnly: v.optional(v.boolean()),
  includeSelectors: optionalStringArray,
  excludeSelectors: optionalStringArray,
  maxAgeMs: optionalMaxAgeMs,
  waitForMs: v.optional(v.number()),
  headers: optionalHeaders,
  country: v.optional(v.string()),
  timeoutMS: optionalTimeoutMS,
};

const brandLookupParams = {
  force_language: v.optional(v.string()),
  maxSpeed: v.optional(v.boolean()),
  maxAgeMs: optionalMaxAgeMs,
  timeoutMS: optionalTimeoutMS,
};

const domainOrDirectUrlParams = {
  domain: v.optional(v.string()),
  directUrl: v.optional(v.string()),
  maxAgeMs: optionalMaxAgeMs,
  timeoutMS: optionalTimeoutMS,
};

const dataPointType = v.union(
  v.literal("text"),
  v.literal("number"),
  v.literal("date"),
  v.literal("boolean"),
  v.literal("list"),
  v.literal("url"),
);

export const args = {
  scrapeHtml: {
    params: v.object(scrapeParams),
  },
  scrapeMarkdown: {
    params: v.object({
      ...scrapeParams,
      includeLinks: v.optional(v.boolean()),
      includeImages: v.optional(v.boolean()),
      shortenBase64Images: v.optional(v.boolean()),
    }),
  },
  scrapeImages: {
    params: v.object({
      url: v.string(),
      maxAgeMs: optionalMaxAgeMs,
      enrichment: v.optional(
        v.object({
          resolution: v.optional(v.boolean()),
          hostedUrl: v.optional(v.boolean()),
          classification: v.optional(v.boolean()),
          maxTimePerMs: v.optional(v.number()),
        }),
      ),
      waitForMs: v.optional(v.number()),
      headers: optionalHeaders,
      timeoutMS: optionalTimeoutMS,
    }),
  },
  crawlSitemap: {
    params: v.object({
      domain: v.string(),
      maxLinks: v.optional(v.number()),
      urlRegex: v.optional(v.string()),
      headers: optionalHeaders,
      timeoutMS: optionalTimeoutMS,
    }),
  },
  crawl: {
    body: v.object({
      url: v.string(),
      maxPages: v.optional(v.number()),
      maxDepth: v.optional(v.number()),
      urlRegex: v.optional(v.string()),
      includeLinks: v.optional(v.boolean()),
      includeImages: v.optional(v.boolean()),
      shortenBase64Images: v.optional(v.boolean()),
      useMainContentOnly: v.optional(v.boolean()),
      followSubdomains: v.optional(v.boolean()),
      pdf: pdfOptions,
      includeFrames: v.optional(v.boolean()),
      includeSelectors: optionalStringArray,
      excludeSelectors: optionalStringArray,
      maxAgeMs: optionalMaxAgeMs,
      waitForMs: v.optional(v.number()),
      stopAfterMs: v.optional(v.number()),
      country: v.optional(v.string()),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  extract: {
    body: v.object({
      url: v.string(),
      schema: v.record(v.string(), jsonValue),
      instructions: v.optional(v.string()),
      factCheck: v.optional(v.boolean()),
      followSubdomains: v.optional(v.boolean()),
      maxPages: v.optional(v.number()),
      maxDepth: v.optional(v.number()),
      pdf: pdfOptions,
      includeFrames: v.optional(v.boolean()),
      maxAgeMs: optionalMaxAgeMs,
      waitForMs: v.optional(v.number()),
      stopAfterMs: v.optional(v.number()),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  search: {
    body: v.object({
      query: v.string(),
      numResults: v.optional(v.number()),
      includeDomains: optionalStringArray,
      excludeDomains: optionalStringArray,
      freshness: v.optional(
        v.union(
          v.literal("last_24_hours"),
          v.literal("last_week"),
          v.literal("last_month"),
          v.literal("last_year"),
        ),
      ),
      country: v.optional(v.string()),
      queryFanout: v.optional(v.boolean()),
      markdownOptions: v.optional(
        v.object({
          enabled: v.optional(v.boolean()),
          includeLinks: v.optional(v.boolean()),
          includeImages: v.optional(v.boolean()),
          shortenBase64Images: v.optional(v.boolean()),
          useMainContentOnly: v.optional(v.boolean()),
          pdf: pdfOptions,
          includeFrames: v.optional(v.boolean()),
          maxAgeMs: optionalMaxAgeMs,
          waitForMs: v.optional(v.number()),
          timeoutMS: optionalTimeoutMS,
        }),
      ),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  competitors: {
    params: v.object({
      domain: v.string(),
      numCompetitors: v.optional(v.number()),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  styleguide: {
    params: v.optional(
      v.object({
        ...domainOrDirectUrlParams,
        colorScheme: v.optional(v.union(v.literal("light"), v.literal("dark"))),
      }),
    ),
  },
  fonts: {
    params: v.optional(v.object(domainOrDirectUrlParams)),
  },
  screenshot: {
    params: v.optional(
      v.object({
        ...domainOrDirectUrlParams,
        fullScreenshot: v.optional(v.union(v.literal("true"), v.literal("false"))),
        handleCookiePopup: v.optional(v.union(v.literal("true"), v.literal("false"))),
        colorScheme: v.optional(v.union(v.literal("light"), v.literal("dark"))),
        viewport: v.optional(
          v.object({
            width: v.optional(v.number()),
            height: v.optional(v.number()),
          }),
        ),
        page: v.optional(
          v.union(
            v.literal("login"),
            v.literal("signup"),
            v.literal("blog"),
            v.literal("careers"),
            v.literal("pricing"),
            v.literal("terms"),
            v.literal("privacy"),
            v.literal("contact"),
          ),
        ),
        waitForMs: v.optional(v.number()),
        scrollOffset: v.optional(v.number()),
        country: v.optional(v.string()),
      }),
    ),
  },
  retrieveBrand: {
    params: v.object({
      domain: v.string(),
      ...brandLookupParams,
    }),
  },
  retrieveBrandByName: {
    params: v.object({
      name: v.string(),
      country_gl: v.optional(v.string()),
      ...brandLookupParams,
    }),
  },
  retrieveBrandByEmail: {
    params: v.object({
      email: v.string(),
      ...brandLookupParams,
    }),
  },
  retrieveBrandByTicker: {
    params: v.object({
      ticker: v.string(),
      ticker_exchange: v.optional(v.string()),
      ...brandLookupParams,
    }),
  },
  retrieveBrandByIsin: {
    params: v.object({
      isin: v.string(),
      ...brandLookupParams,
    }),
  },
  identifyBrandFromTransaction: {
    params: v.object({
      transaction_info: v.string(),
      country_gl: v.optional(v.string()),
      city: v.optional(v.string()),
      mcc: v.optional(v.string()),
      phone: v.optional(v.number()),
      high_confidence_only: v.optional(v.boolean()),
      force_language: v.optional(v.string()),
      maxSpeed: v.optional(v.boolean()),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  retrieveSimplifiedBrand: {
    params: v.object({
      domain: v.string(),
      maxAgeMs: optionalMaxAgeMs,
      timeoutMS: optionalTimeoutMS,
    }),
  },
  prefetchBrand: {
    body: v.object({
      domain: v.string(),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  prefetchBrandByEmail: {
    body: v.object({
      email: v.string(),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  retrievePerson: {
    body: v.object({
      identifiers: v.object({
        linkedinUrl: v.string(),
      }),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  retrieveNaics: {
    params: v.object({
      input: v.string(),
      minResults: v.optional(v.number()),
      maxResults: v.optional(v.number()),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  retrieveSic: {
    params: v.object({
      input: v.string(),
      type: v.optional(v.union(v.literal("original_sic"), v.literal("latest_sec"))),
      minResults: v.optional(v.number()),
      maxResults: v.optional(v.number()),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  aiQuery: {
    body: v.object({
      domain: v.string(),
      specific_pages: v.optional(
        v.object({
          home_page: v.optional(v.boolean()),
          blog: v.optional(v.boolean()),
          terms_and_conditions: v.optional(v.boolean()),
          privacy_policy: v.optional(v.boolean()),
          about_us: v.optional(v.boolean()),
          contact_us: v.optional(v.boolean()),
          careers: v.optional(v.boolean()),
          faq: v.optional(v.boolean()),
          pricing: v.optional(v.boolean()),
        }),
      ),
      data_to_extract: v.array(
        v.object({
          datapoint_name: v.string(),
          datapoint_type: dataPointType,
          datapoint_list_type: v.optional(v.union(dataPointType, v.literal("object"))),
          datapoint_object_schema: v.optional(v.record(v.string(), dataPointType)),
          datapoint_description: v.string(),
          datapoint_example: v.string(),
        }),
      ),
      timeoutMS: optionalTimeoutMS,
    }),
  },
  extractProduct: {
    body: v.object({
      url: v.string(),
      maxAgeMs: optionalMaxAgeMs,
      timeoutMS: optionalTimeoutMS,
    }),
  },
  extractProducts: {
    body: v.union(
      v.object({
        domain: v.string(),
        maxProducts: v.optional(v.number()),
        maxAgeMs: optionalMaxAgeMs,
        timeoutMS: optionalTimeoutMS,
      }),
      v.object({
        directUrl: v.string(),
        maxProducts: v.optional(v.number()),
        maxAgeMs: optionalMaxAgeMs,
        timeoutMS: optionalTimeoutMS,
      }),
    ),
  },
};
