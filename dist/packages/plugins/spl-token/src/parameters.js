"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToBaseUnitParameters = exports.TransferTokenByMintAddressParameters = exports.GetTokenBalanceByMintAddressParameters = exports.GetTokenMintAddressBySymbolParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetTokenMintAddressBySymbolParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    symbol: zod_1.z.string().describe("The symbol of the token to get the mint address of (e.g USDC, GOAT, SOL)"),
})) {
}
exports.GetTokenMintAddressBySymbolParameters = GetTokenMintAddressBySymbolParameters;
class GetTokenBalanceByMintAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    walletAddress: zod_1.z.string().describe("The address to get the balance of"),
    mintAddress: zod_1.z.string().describe("The mint address of the token to get the balance of"),
})) {
}
exports.GetTokenBalanceByMintAddressParameters = GetTokenBalanceByMintAddressParameters;
class TransferTokenByMintAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    mintAddress: zod_1.z.string().describe("The mint address of the token to transfer"),
    to: zod_1.z.string().describe("The address to transfer the token to"),
    amount: zod_1.z.string().describe("The amount of tokens to transfer in base unit"),
})) {
}
exports.TransferTokenByMintAddressParameters = TransferTokenByMintAddressParameters;
class ConvertToBaseUnitParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    amount: zod_1.z.number().describe("The amount of tokens to convert to base unit"),
    decimals: zod_1.z.number().describe("The decimals of the token"),
})) {
}
exports.ConvertToBaseUnitParameters = ConvertToBaseUnitParameters;
