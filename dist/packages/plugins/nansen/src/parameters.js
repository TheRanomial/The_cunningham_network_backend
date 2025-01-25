"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTradingSignalParams = exports.GetSmartMoneyParams = exports.GetNFTTradesParams = exports.GetNFTDetailsParams = exports.GetTokenTradesParams = exports.GetTokenDetailsParams = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetTokenDetailsParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("Token contract address"),
})) {
}
exports.GetTokenDetailsParams = GetTokenDetailsParams;
class GetTokenTradesParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("Token contract address"),
    start_date: zod_1.z.string().describe("Start date to filter for (format: YYYY-MM-DD)"),
    end_date: zod_1.z.string().describe("End date to filter for (format: YYYY-MM-DD)"),
})) {
}
exports.GetTokenTradesParams = GetTokenTradesParams;
class GetNFTDetailsParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    token_address: zod_1.z.string().describe("NFT contract address"),
    nft_id: zod_1.z.string().describe("Specific NFT token ID"),
})) {
}
exports.GetNFTDetailsParams = GetNFTDetailsParams;
class GetNFTTradesParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    token_address: zod_1.z.string().describe("NFT contract address"),
    nft_id: zod_1.z.string().describe("Specific NFT token ID"),
    start_date: zod_1.z.string().describe("Start date to filter for (format: YYYY-MM-DD)"),
    end_date: zod_1.z.string().describe("End date to filter for (format: YYYY-MM-DD)"),
})) {
}
exports.GetNFTTradesParams = GetNFTTradesParams;
class GetSmartMoneyParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    start_date: zod_1.z.string().describe("Start date to filter for (format: YYYY-MM-DD)"),
    end_date: zod_1.z.string().describe("End date to filter for (format: YYYY-MM-DD)"),
    token_address: zod_1.z.string().optional().describe("Token address to filter by"),
})) {
}
exports.GetSmartMoneyParams = GetSmartMoneyParams;
class GetTradingSignalParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    start_date: zod_1.z.string().describe("Start date to filter for (format: YYYY-MM-DD)"),
    end_date: zod_1.z.string().describe("End date to filter for (format: YYYY-MM-DD)"),
    token_address: zod_1.z.string().optional().describe("Token address to filter by"),
})) {
}
exports.GetTradingSignalParams = GetTradingSignalParams;
