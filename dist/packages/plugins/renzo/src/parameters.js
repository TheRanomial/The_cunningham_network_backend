"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDepositAddressParams = exports.BalanceOfParams = exports.DepositETHParams = exports.DepositParams = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class DepositParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to deposit"),
    amountIn: zod_1.z.string().describe("The amount of tokens to deposit in base units"),
    minOut: zod_1.z.string().describe("The minimum amount of tokens to receive in base units"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
})) {
}
exports.DepositParams = DepositParams;
class DepositETHParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    minOut: zod_1.z.string().describe("The minimum amount of ETH to receive in base units"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
    value: zod_1.z.string().describe("The amount of ETH to send in base units"),
})) {
}
exports.DepositETHParams = DepositETHParams;
class BalanceOfParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("The address to check the balance of"),
})) {
}
exports.BalanceOfParams = BalanceOfParams;
class GetDepositAddressParams extends (0, core_1.createToolParameters)(zod_1.z.object({})) {
}
exports.GetDepositAddressParams = GetDepositAddressParams;
