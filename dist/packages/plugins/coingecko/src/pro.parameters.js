"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTokensInfoByPoolAddressParameters = exports.GetTokenDataByTokenAddressParameters = exports.TopGainersLosersParameters = exports.GetTrendingPoolsParameters = exports.GetTrendingPoolsByNetworkParameters = exports.GetPoolDataByPoolAddressParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetPoolDataByPoolAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    network: zod_1.z.string().describe("The network id to get data for (e.g., 'eth', 'polygon_pos')"),
    addresses: zod_1.z.array(zod_1.z.string()).describe("The addresses of the pools to get data for"),
})) {
}
exports.GetPoolDataByPoolAddressParameters = GetPoolDataByPoolAddressParameters;
class GetTrendingPoolsByNetworkParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    network: zod_1.z.string().describe("The network id to get data for (e.g., 'eth', 'polygon_pos')"),
})) {
}
exports.GetTrendingPoolsByNetworkParameters = GetTrendingPoolsByNetworkParameters;
class GetTrendingPoolsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    include: zod_1.z
        .array(zod_1.z.enum(["base_token", "quote_token", "dex", "network"]))
        .describe("The fields to include in the response"),
    page: zod_1.z.number().max(10).describe("The page number to get trending pools for"),
    duration: zod_1.z.enum(["24h", "6h", "1h", "5m"]).describe("The duration to get trending pools for"),
})) {
}
exports.GetTrendingPoolsParameters = GetTrendingPoolsParameters;
class TopGainersLosersParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    vsCurrency: zod_1.z.string().default("usd").describe("The target currency of market data (usd, eur, jpy, etc.)"),
    duration: zod_1.z
        .enum(["1h", "24h", "7d", "14d", "30d", "60d", "1y"])
        .optional()
        .default("24h")
        .describe("The duration to get top gainers/losers for"),
    topCoins: zod_1.z
        .enum(["300", "500", "1000", "all"])
        .optional()
        .default("1000")
        .describe("The number of top coins to get"),
})) {
}
exports.TopGainersLosersParameters = TopGainersLosersParameters;
class GetTokenDataByTokenAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    network: zod_1.z.string().describe("The network id to get data for (e.g., 'eth', 'polygon_pos')"),
    address: zod_1.z.string().describe("The address of the token to get data for"),
})) {
}
exports.GetTokenDataByTokenAddressParameters = GetTokenDataByTokenAddressParameters;
class GetTokensInfoByPoolAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    network: zod_1.z.string().describe("The network id to get data for (e.g., 'eth', 'polygon_pos')"),
    poolAddress: zod_1.z.string().describe("The address of the pool to get data for"),
})) {
}
exports.GetTokensInfoByPoolAddressParameters = GetTokensInfoByPoolAddressParameters;
