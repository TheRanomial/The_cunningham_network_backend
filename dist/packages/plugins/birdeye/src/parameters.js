"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTokenParameters = exports.GetTrendingTokensParameters = exports.GetTokenSecurityParameters = exports.GetOhlcvPairParameters = exports.GetOhlcvParameters = exports.GetTokenHistoryPriceParameters = exports.GetTokenPriceParameters = exports.chainSchema = exports.supportedChains = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
exports.supportedChains = [
    "solana",
    "ethereum",
    "arbitrum",
    "avalanche",
    "bsc",
    "optimism",
    "polygon",
    "base",
    "zksync",
    "sui",
];
exports.chainSchema = zod_1.z.enum(exports.supportedChains).describe("Chain name (e.g., ethereum, solana)");
// Defi Price Parameters
class GetTokenPriceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    list_address: zod_1.z.array(zod_1.z.string()).max(100).describe("Array of token contract addresses (max 100)"),
    chain: exports.chainSchema,
    include_liquidity: zod_1.z.boolean().optional().describe("Include liquidity"),
})) {
}
exports.GetTokenPriceParameters = GetTokenPriceParameters;
class GetTokenHistoryPriceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("Token contract address"),
    address_type: zod_1.z.enum(["token", "pair"]).default("token").describe("Address type"),
    type: zod_1.z
        .enum(["1m", "3m", "15m", "30m", "1H", "2H", "4H", "6H", "8H", "12H", "1D", "3D", "1W", "1M"])
        .describe("Time interval"),
    time_from: zod_1.z.number().optional().describe("Unix timestamp"),
    time_to: zod_1.z.number().optional().describe("Unix timestamp"),
    chain: exports.chainSchema,
})) {
}
exports.GetTokenHistoryPriceParameters = GetTokenHistoryPriceParameters;
class GetOhlcvParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("Token contract address"),
    type: zod_1.z.enum(["1H", "4H", "12H", "1D", "1W", "1M"]).describe("Time interval"),
    time_from: zod_1.z.number().optional().describe("Unix timestamp"),
    time_to: zod_1.z.number().optional().describe("Unix timestamp"),
    chain: exports.chainSchema,
})) {
}
exports.GetOhlcvParameters = GetOhlcvParameters;
class GetOhlcvPairParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    pair_address: zod_1.z.string().describe("Pair contract address"),
    type: zod_1.z.enum(["1H", "4H", "12H", "1D", "1W", "1M"]).describe("Time interval"),
    limit: zod_1.z.number().optional().describe("Number of data points to return"),
    chain: exports.chainSchema,
})) {
}
exports.GetOhlcvPairParameters = GetOhlcvPairParameters;
class GetTokenSecurityParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("Token contract address"),
    chain: exports.chainSchema,
})) {
}
exports.GetTokenSecurityParameters = GetTokenSecurityParameters;
class GetTrendingTokensParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    chain: exports.chainSchema,
    sort_by: zod_1.z.enum(["rank", "volume24hUSD", "liquidity"]).describe("Sort by"),
    sort_type: zod_1.z.enum(["asc", "desc"]).describe("Sort type"),
    offset: zod_1.z.number().optional().describe("Offset"),
    limit: zod_1.z.number().optional().describe("Limit"),
})) {
}
exports.GetTrendingTokensParameters = GetTrendingTokensParameters;
class SearchTokenParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    keyword: zod_1.z.string().describe("Search query"),
    chain: exports.chainSchema,
    sort_by: zod_1.z
        .enum([
        "fdv",
        "marketcap",
        "liquidity",
        "price",
        "price_change_24h_percent",
        "trade_24h",
        "trade_24h_change_percent",
        "buy_24h",
        "buy_24h_change_percent",
        "sell_24h",
        "sell_24h_change_percent",
        "unique_wallet_24h",
        "unique_wallet_24h_change_percent",
        "last_trade_unix_time",
        "volume_24h_usd",
        "volume_24h_change_percent",
    ])
        .describe("Sort by"),
    sort_type: zod_1.z.enum(["asc", "desc"]).describe("Sort type"),
    verify_token: zod_1.z
        .boolean()
        .optional()
        .describe("A filter to retrieve tokens based on their verification status (supported on Solana)"),
    markets: zod_1.z
        .array(zod_1.z.enum([
        "Raydium",
        "Raydium CP",
        "Raydium Clamm",
        "Meteora",
        "Meteora DLMM",
        "Fluxbeam",
        "Pump.fun",
        "OpenBook",
        "OpenBook V2",
        "Orca",
    ]))
        .optional()
        .describe("list of market sources to filter results (supported on Solana)"),
    offset: zod_1.z.number().optional().describe("Offset"),
    limit: zod_1.z.number().optional().describe("Limit"),
})) {
}
exports.SearchTokenParameters = SearchTokenParameters;
