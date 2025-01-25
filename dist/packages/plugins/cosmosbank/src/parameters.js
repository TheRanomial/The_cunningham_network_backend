"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denomMetadataParametersSchema = exports.supplyOfParametersSchema = exports.getBalanceParametersSchema = exports.sendTokenObjectParametersSchema = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class sendTokenObjectParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    toAddress: zod_1.z.string().describe("The address to send tokens to"),
    amount: zod_1.z
        .object({ symbol: zod_1.z.string(), amount: zod_1.z.string() })
        .describe("A token data having its symbol and the amount of token to be sent"),
})) {
}
exports.sendTokenObjectParametersSchema = sendTokenObjectParametersSchema;
class getBalanceParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z.string().describe("The address required to retrieve the balance"),
    symbol: zod_1.z.string().describe("The token symbol required to retrieve the balance"),
})) {
}
exports.getBalanceParametersSchema = getBalanceParametersSchema;
class supplyOfParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    symbol: zod_1.z.string().describe("The token symbol required to retrieve the totalsupply"),
})) {
}
exports.supplyOfParametersSchema = supplyOfParametersSchema;
class denomMetadataParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    symbol: zod_1.z.string().describe("The token symbol required to retrieve the metadata"),
})) {
}
exports.denomMetadataParametersSchema = denomMetadataParametersSchema;
