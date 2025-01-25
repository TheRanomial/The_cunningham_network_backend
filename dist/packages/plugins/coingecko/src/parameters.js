"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTrendingCoinCategoriesParameters = exports.GetOHLCParameters = exports.GetHistoricalDataParameters = exports.GetCoinDataParameters = exports.GetCoinPriceByContractAddressParameters = exports.SearchCoinsParameters = exports.GetCoinPricesParameters = exports.NoParams = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class NoParams extends (0, core_1.createToolParameters)(zod_1.z.object({})) {
}
exports.NoParams = NoParams;
class GetCoinPricesParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    coinIds: zod_1.z.array(zod_1.z.string()).describe("The ID of the coin on CoinGecko (e.g., 'bitcoin', 'eth')"),
    vsCurrency: zod_1.z
        .string()
        .default("usd")
        .describe("The target currency to get price in (e.g., 'usd', 'eur', 'jpy')"),
    includeMarketCap: zod_1.z.boolean().optional().default(false).describe("Include market cap data in the response"),
    include24hrVol: zod_1.z.boolean().optional().default(false).describe("Include 24 hour volume data in the response"),
    include24hrChange: zod_1.z
        .boolean()
        .optional()
        .default(false)
        .describe("Include 24 hour price change data in the response"),
    includeLastUpdatedAt: zod_1.z
        .boolean()
        .optional()
        .default(false)
        .describe("Include last updated timestamp in the response"),
})) {
}
exports.GetCoinPricesParameters = GetCoinPricesParameters;
class SearchCoinsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    query: zod_1.z.string().describe("The search query to find coins (e.g., 'bitcoin' or 'btc')"),
})) {
}
exports.SearchCoinsParameters = SearchCoinsParameters;
class GetCoinPriceByContractAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.string().describe("Asset platform's id (e.g., 'eth')"),
    contractAddresses: zod_1.z.array(zod_1.z.string()).describe("List of contract addresses for the tokens"),
    vsCurrency: zod_1.z.string().default("usd").describe("Target currency (e.g., 'usd', 'eur')"),
    includeMarketCap: zod_1.z.boolean().optional().default(false).describe("Include market cap data"),
    include24hrVol: zod_1.z.boolean().optional().default(false).describe("Include 24hr volume"),
    include24hrChange: zod_1.z.boolean().optional().default(false).describe("Include 24hr change"),
    includeLastUpdatedAt: zod_1.z.boolean().optional().default(false).describe("Include last updated timestamp"),
})) {
}
exports.GetCoinPriceByContractAddressParameters = GetCoinPriceByContractAddressParameters;
class GetCoinDataParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.string().describe("Pass the coin id (can be obtained from the supported coins endpoint)"),
    localization: zod_1.z.boolean().optional().default(false).describe("Include all localizations"),
    tickers: zod_1.z.boolean().optional().default(true).describe("Include tickers data"),
    marketData: zod_1.z.boolean().optional().default(true).describe("Include market data"),
    communityData: zod_1.z.boolean().optional().default(true).describe("Include community data"),
    developerData: zod_1.z.boolean().optional().default(true).describe("Include developer data"),
    sparkline: zod_1.z.boolean().optional().default(false).describe("Include sparkline 7 days data"),
})) {
}
exports.GetCoinDataParameters = GetCoinDataParameters;
class GetHistoricalDataParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.string().describe("Pass the coin id (can be obtained from the supported coins endpoint)"),
    date: zod_1.z.string().describe("The date of data snapshot in dd-mm-yyyy format"),
    localization: zod_1.z.boolean().optional().default(true).describe("Include localized languages"),
})) {
}
exports.GetHistoricalDataParameters = GetHistoricalDataParameters;
class GetOHLCParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    id: zod_1.z.string().describe("Pass the coin id (can be obtained from the supported coins endpoint)"),
    vsCurrency: zod_1.z.string().default("usd").describe("The target currency of market data (usd, eur, jpy, etc.)"),
    days: zod_1.z.number().describe("Data up to number of days ago (1/7/14/30/90/180/365/max)"),
})) {
}
exports.GetOHLCParameters = GetOHLCParameters;
class GetTrendingCoinCategoriesParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    vsCurrency: zod_1.z.string().default("usd").describe("The target currency of market data (usd, eur, jpy, etc.)"),
    ids: zod_1.z.array(zod_1.z.string()).describe("The ids of the coins to get trending data for"),
    category: zod_1.z.string().describe("The category to get trending data for"),
    order: zod_1.z
        .enum(["market_cap_desc", "volume_desc", "volume_asc", "market_cap_asc"])
        .describe("The order to get trending data for"),
    perPage: zod_1.z.number().min(1).max(30).default(10).describe("The number of trending coins to get"),
    page: zod_1.z.number().describe("The page number to get trending coins for"),
    sparkline: zod_1.z.boolean().optional().default(false).describe("Include sparkline 7 days data"),
    priceChangePercentage: zod_1.z
        .enum(["1h", "24h", "7d", "14d", "30d", "200d", "1y"])
        .optional()
        .default("24h")
        .describe("The price change percentage to get trending coins for"),
    locale: zod_1.z.string().optional().default("en").describe("The locale to get trending coins for"),
})) {
}
exports.GetTrendingCoinCategoriesParameters = GetTrendingCoinCategoriesParameters;
