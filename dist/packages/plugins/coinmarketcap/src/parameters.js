"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptocurrencyTrendingGainersLosersParameters = exports.CryptocurrencyTrendingMostVisitedParameters = exports.CryptocurrencyTrendingLatestParameters = exports.CryptocurrencyOHLCVLatestParameters = exports.CryptocurrencyMapParameters = exports.ContentLatestParameters = exports.ExchangeQuotesLatestParameters = exports.ExchangeListingsParameters = exports.CryptocurrencyQuotesLatestParameters = exports.CryptocurrencyListingsParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class CryptocurrencyListingsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    sort: zod_1.z
        .enum([
        "market_cap",
        "name",
        "symbol",
        "date_added",
        "market_cap_strict",
        "price",
        "circulating_supply",
        "total_supply",
        "max_supply",
        "num_market_pairs",
        "volume_24h",
        "percent_change_1h",
        "percent_change_24h",
        "percent_change_7d",
        "market_cap_by_total_supply_strict",
        "volume_7d",
        "volume_30d",
    ])
        .optional()
        .default("market_cap")
        .describe("What field to sort the list by"),
    sort_dir: zod_1.z.enum(["asc", "desc"]).optional().describe("Direction to sort the list"),
    cryptocurrency_type: zod_1.z
        .enum(["all", "coins", "tokens"])
        .optional()
        .describe("Type of cryptocurrency to include"),
    tag: zod_1.z.string().optional().describe("Tag to filter by"),
    aux: zod_1.z
        .array(zod_1.z.enum([
        "num_market_pairs",
        "cmc_rank",
        "date_added",
        "tags",
        "platform",
        "max_supply",
        "circulating_supply",
        "total_supply",
        "market_cap_by_total_supply",
        "volume_24h_reported",
        "volume_7d",
        "volume_7d_reported",
        "volume_30d",
        "volume_30d_reported",
        "is_market_cap_included_in_calc",
    ]))
        .optional()
        .describe("Array of auxiliary fields to return"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
})) {
}
exports.CryptocurrencyListingsParameters = CryptocurrencyListingsParameters;
class CryptocurrencyQuotesLatestParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency IDs"),
    symbol: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency symbols"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
    aux: zod_1.z
        .array(zod_1.z.enum([
        "num_market_pairs",
        "cmc_rank",
        "date_added",
        "tags",
        "platform",
        "max_supply",
        "circulating_supply",
        "total_supply",
        "market_cap_by_total_supply",
        "volume_24h_reported",
        "volume_7d",
        "volume_7d_reported",
        "volume_30d",
        "volume_30d_reported",
        "is_active",
        "is_fiat",
    ]))
        .optional()
        .describe("Array of auxiliary fields to return"),
})) {
}
exports.CryptocurrencyQuotesLatestParameters = CryptocurrencyQuotesLatestParameters;
class ExchangeListingsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    sort: zod_1.z
        .enum(["name", "volume_24h", "volume_24h_adjusted", "exchange_score"])
        .optional()
        .describe("What field to sort the list by"),
    sort_dir: zod_1.z.enum(["asc", "desc"]).optional().describe("Direction to sort the list"),
    market_type: zod_1.z.enum(["all", "spot", "derivatives"]).optional().describe("Type of exchange market"),
    aux: zod_1.z
        .array(zod_1.z.enum([
        "num_market_pairs",
        "traffic_score",
        "rank",
        "exchange_score",
        "effective_liquidity_24h",
        "date_launched",
        "fiats",
    ]))
        .optional()
        .describe("Array of auxiliary fields to return"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
})) {
}
exports.ExchangeListingsParameters = ExchangeListingsParameters;
class ExchangeQuotesLatestParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.array(zod_1.z.string()).optional().describe("One or more exchange IDs"),
    slug: zod_1.z.array(zod_1.z.string()).optional().describe("One or more exchange slugs"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
    aux: zod_1.z
        .array(zod_1.z.enum([
        "num_market_pairs",
        "traffic_score",
        "rank",
        "exchange_score",
        "liquidity_score",
        "effective_liquidity_24h",
    ]))
        .optional()
        .describe("Array of auxiliary fields to return"),
})) {
}
exports.ExchangeQuotesLatestParameters = ExchangeQuotesLatestParameters;
class ContentLatestParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    id: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency IDs"),
    slug: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency slugs, e.g bitcoin, ethereum, etc."),
    symbol: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency symbols e.g BTC, ETH, etc."),
    news_type: zod_1.z.enum(["news", "community", "alexandria"]).optional().describe("Type of news content to return"),
    content_type: zod_1.z
        .enum(["all", "news", "video", "audio"])
        .optional()
        .describe("Type of content category to return"),
    category: zod_1.z.string().optional().describe("Category of content to return Example: GameFi, DeFi, etc."),
    language: zod_1.z
        .enum([
        "en",
        "zh",
        "zh-tw",
        "de",
        "id",
        "ja",
        "ko",
        "es",
        "th",
        "tr",
        "vi",
        "ru",
        "fr",
        "nl",
        "ar",
        "pt-br",
        "hi",
        "pl",
        "uk",
        "fil-rph",
        "it",
    ])
        .optional()
        .describe("Language of content to return"),
})) {
}
exports.ContentLatestParameters = ContentLatestParameters;
class CryptocurrencyMapParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    listing_status: zod_1.z.enum(["active", "inactive", "untracked"]).optional().describe("Status of listings to return"),
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    sort: zod_1.z.enum(["cmc_rank", "id", "name"]).optional().describe("What field to sort the list by"),
    symbol: zod_1.z.array(zod_1.z.string()).optional().describe("Cryptocurrency symbol(s) to filter by"),
    aux: zod_1.z
        .array(zod_1.z.enum(["platform", "first_historical_data", "last_historical_data", "is_active", "status"]))
        .optional()
        .describe("Array of auxiliary fields to return"),
})) {
}
exports.CryptocurrencyMapParameters = CryptocurrencyMapParameters;
class CryptocurrencyOHLCVLatestParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency IDs"),
    symbol: zod_1.z.array(zod_1.z.string()).optional().describe("One or more cryptocurrency symbols"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
    convert_id: zod_1.z.string().optional().describe("Currency ID to convert prices to"),
    skip_invalid: zod_1.z.boolean().optional().describe("Skip invalid currency conversions"),
})) {
}
exports.CryptocurrencyOHLCVLatestParameters = CryptocurrencyOHLCVLatestParameters;
class CryptocurrencyTrendingLatestParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    time_period: zod_1.z.enum(["24h", "30d", "7d"]).optional().describe("Time period for trending data"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
    convert_id: zod_1.z.string().optional().describe("Currency ID to convert prices to"),
})) {
}
exports.CryptocurrencyTrendingLatestParameters = CryptocurrencyTrendingLatestParameters;
class CryptocurrencyTrendingMostVisitedParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    time_period: zod_1.z.enum(["24h", "30d", "7d"]).optional().describe("Time period for trending data"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
    convert_id: zod_1.z.string().optional().describe("Currency ID to convert prices to"),
})) {
}
exports.CryptocurrencyTrendingMostVisitedParameters = CryptocurrencyTrendingMostVisitedParameters;
class CryptocurrencyTrendingGainersLosersParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    start: zod_1.z.number().optional().describe("Starting position of results"),
    limit: zod_1.z.number().optional().describe("Number of results to return"),
    time_period: zod_1.z.enum(["1h", "24h", "7d", "30d"]).optional().describe("Time period for trending data"),
    convert: zod_1.z.string().optional().describe("Currency to convert prices to"),
    convert_id: zod_1.z.string().optional().describe("Currency ID to convert prices to"),
    sort: zod_1.z.enum(["percent_change_24h"]).optional().describe("What field to sort the list by"),
    sort_dir: zod_1.z.enum(["asc", "desc"]).optional().describe("Direction to sort the list"),
})) {
}
exports.CryptocurrencyTrendingGainersLosersParameters = CryptocurrencyTrendingGainersLosersParameters;
