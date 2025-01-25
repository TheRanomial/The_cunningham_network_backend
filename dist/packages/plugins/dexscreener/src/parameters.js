"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTokenPairsParameters = exports.SearchPairsParameters = exports.GetPairsByChainAndPairParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetPairsByChainAndPairParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    chainId: zod_1.z.string().describe("The chain ID of the pair"),
    pairId: zod_1.z.string().describe("The pair ID to fetch"),
})) {
}
exports.GetPairsByChainAndPairParameters = GetPairsByChainAndPairParameters;
class SearchPairsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    query: zod_1.z.string().describe("The search query string"),
})) {
}
exports.SearchPairsParameters = SearchPairsParameters;
class GetTokenPairsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddresses: zod_1.z.array(zod_1.z.string()).max(30).describe("List of up to 30 token addresses"),
})) {
}
exports.GetTokenPairsParameters = GetTokenPairsParameters;
