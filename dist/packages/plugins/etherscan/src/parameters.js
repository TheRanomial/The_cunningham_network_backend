"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogsParameters = exports.GasPriceParameters = exports.TokenBalanceParameters = exports.BlockByNumberParameters = exports.TransactionReceiptParameters = exports.TransactionStatusParameters = exports.ContractSourceCodeParameters = exports.ContractABIParameters = exports.AccountTransactionsParameters = exports.AccountBalanceParameters = exports.txHashSchema = exports.blockNumberSchema = exports.tagSchema = exports.networkSchema = exports.addressSchema = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
// Base schemas
exports.addressSchema = zod_1.z.string().regex(/^0x[a-fA-F0-9]{40}$/);
exports.networkSchema = zod_1.z
    .enum(["mainnet", "goerli", "sepolia"])
    .optional()
    .default("mainnet");
exports.tagSchema = zod_1.z.enum(["latest", "pending", "earliest"]).optional().default("latest");
exports.blockNumberSchema = zod_1.z.union([
    zod_1.z.literal("latest"),
    zod_1.z.literal("pending"),
    zod_1.z.literal("earliest"),
    zod_1.z.number(),
]);
exports.txHashSchema = zod_1.z.string().regex(/^0x[a-fA-F0-9]{64}$/);
// Tool parameters using createToolParameters
class AccountBalanceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: exports.addressSchema,
    tag: exports.tagSchema,
    network: exports.networkSchema,
})) {
}
exports.AccountBalanceParameters = AccountBalanceParameters;
class AccountTransactionsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: exports.addressSchema,
    startBlock: zod_1.z.number().optional(),
    endBlock: zod_1.z.number().optional(),
    page: zod_1.z.number().optional(),
    offset: zod_1.z.number().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional().default("desc"),
    network: exports.networkSchema,
})) {
}
exports.AccountTransactionsParameters = AccountTransactionsParameters;
class ContractABIParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: exports.addressSchema,
    network: exports.networkSchema,
})) {
}
exports.ContractABIParameters = ContractABIParameters;
class ContractSourceCodeParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: exports.addressSchema,
    network: exports.networkSchema,
})) {
}
exports.ContractSourceCodeParameters = ContractSourceCodeParameters;
class TransactionStatusParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    txhash: exports.txHashSchema,
    network: exports.networkSchema,
})) {
}
exports.TransactionStatusParameters = TransactionStatusParameters;
class TransactionReceiptParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    txhash: exports.txHashSchema,
    network: exports.networkSchema,
})) {
}
exports.TransactionReceiptParameters = TransactionReceiptParameters;
class BlockByNumberParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    blockNumber: exports.blockNumberSchema,
    network: exports.networkSchema,
})) {
}
exports.BlockByNumberParameters = BlockByNumberParameters;
class TokenBalanceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: exports.addressSchema,
    contractAddress: exports.addressSchema,
    tag: exports.tagSchema,
    network: exports.networkSchema,
})) {
}
exports.TokenBalanceParameters = TokenBalanceParameters;
class GasPriceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    network: exports.networkSchema,
})) {
}
exports.GasPriceParameters = GasPriceParameters;
class EventLogsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: exports.addressSchema,
    fromBlock: exports.blockNumberSchema.optional(),
    toBlock: exports.blockNumberSchema.optional(),
    topic0: zod_1.z.string().optional(),
    topic1: zod_1.z.string().optional(),
    topic2: zod_1.z.string().optional(),
    topic3: zod_1.z.string().optional(),
    network: exports.networkSchema,
})) {
}
exports.EventLogsParameters = EventLogsParameters;
