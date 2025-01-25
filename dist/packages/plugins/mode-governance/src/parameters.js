"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalanceParameters = exports.GetStakeInfoParameters = exports.StakeParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
const TokenType = zod_1.z.enum(["MODE", "BPT"]);
const ExtendedTokenType = zod_1.z.enum(["MODE", "BPT", "veMode", "veBPT"]);
const StakeSchema = zod_1.z.object({
    amount: zod_1.z.string().describe("The amount of tokens to stake in base units (18 decimals)"),
    tokenType: TokenType,
});
const GetStakeInfoSchema = zod_1.z.object({
    tokenType: TokenType.describe("The type of token to get info for (MODE or BPT)"),
});
const GetBalanceSchema = zod_1.z.object({
    tokenType: ExtendedTokenType.describe("The type of token to get balance for: 'veMode'/'veBPT' for voting power, 'MODE'/'BPT' for token balances"),
    address: zod_1.z
        .string()
        .optional()
        .describe("The address to check balance for. If not provided, uses the wallet's address"),
});
class StakeParameters extends (0, core_1.createToolParameters)(StakeSchema) {
}
exports.StakeParameters = StakeParameters;
class GetStakeInfoParameters extends (0, core_1.createToolParameters)(GetStakeInfoSchema) {
}
exports.GetStakeInfoParameters = GetStakeInfoParameters;
class GetBalanceParameters extends (0, core_1.createToolParameters)(GetBalanceSchema) {
}
exports.GetBalanceParameters = GetBalanceParameters;
