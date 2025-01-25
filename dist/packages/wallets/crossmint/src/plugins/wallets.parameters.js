"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWalletByEmailParameters = exports.GetWalletByTwitterUsernameParameters = exports.CreateWalletForEmailParameters = exports.CreateWalletForTwitterUserParameters = void 0;
const zod_1 = require("zod");
const core_1 = require("@goat-sdk/core");
class CreateWalletForTwitterUserParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    username: zod_1.z.string().describe("The username of the Twitter / X user"),
    chain: zod_1.z.enum(["evm", "solana", "aptos", "cardano", "sui"]).describe("The chain of the wallet"),
})) {
}
exports.CreateWalletForTwitterUserParameters = CreateWalletForTwitterUserParameters;
class CreateWalletForEmailParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    email: zod_1.z.string().describe("The email address of the user"),
    chain: zod_1.z.enum(["evm", "solana", "aptos", "cardano", "sui"]).describe("The chain of the wallet"),
})) {
}
exports.CreateWalletForEmailParameters = CreateWalletForEmailParameters;
class GetWalletByTwitterUsernameParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    username: zod_1.z.string().describe("The username of the Twitter / X user"),
    chain: zod_1.z.string().describe("The chain of the wallet"),
})) {
}
exports.GetWalletByTwitterUsernameParameters = GetWalletByTwitterUsernameParameters;
class GetWalletByEmailParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    email: zod_1.z.string().describe("The email address of the user"),
    chain: zod_1.z.string().describe("The chain of the wallet"),
})) {
}
exports.GetWalletByEmailParameters = GetWalletByEmailParameters;
