"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertFromBaseUnitParameters = exports.ConvertToBaseUnitParameters = exports.TransferFromParameters = exports.RevokeApprovalParameters = exports.ApproveParameters = exports.GetTokenAllowanceParameters = exports.GetTokenTotalSupplyParameters = exports.TransferParameters = exports.GetTokenBalanceParameters = exports.GetTokenInfoBySymbolParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetTokenInfoBySymbolParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    symbol: zod_1.z.string().describe("The symbol of the token to get the info of"),
})) {
}
exports.GetTokenInfoBySymbolParameters = GetTokenInfoBySymbolParameters;
class GetTokenBalanceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    wallet: zod_1.z.string().describe("The address to get the balance of"),
    tokenAddress: zod_1.z.string().describe("The address of the token to get the balance of"),
})) {
}
exports.GetTokenBalanceParameters = GetTokenBalanceParameters;
class TransferParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to transfer"),
    to: zod_1.z.string().describe("The address to transfer the token to"),
    amount: zod_1.z.string().describe("The amount of tokens to transfer in base units"),
})) {
}
exports.TransferParameters = TransferParameters;
class GetTokenTotalSupplyParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to get the total supply of"),
})) {
}
exports.GetTokenTotalSupplyParameters = GetTokenTotalSupplyParameters;
class GetTokenAllowanceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to check the allowance of"),
    owner: zod_1.z.string().describe("The address to check the allowance of"),
    spender: zod_1.z.string().describe("The address to check the allowance for"),
})) {
}
exports.GetTokenAllowanceParameters = GetTokenAllowanceParameters;
class ApproveParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to approve"),
    spender: zod_1.z.string().describe("The address to approve the allowance to"),
    amount: zod_1.z.string().describe("The amount of tokens to approve in base units"),
})) {
}
exports.ApproveParameters = ApproveParameters;
class RevokeApprovalParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to revoke"),
    spender: zod_1.z.string().describe("The address to revoke the allowance to"),
})) {
}
exports.RevokeApprovalParameters = RevokeApprovalParameters;
class TransferFromParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to transfer"),
    from: zod_1.z.string().describe("The address to transfer the token from"),
    to: zod_1.z.string().describe("The address to transfer the token to"),
    amount: zod_1.z.string().describe("The amount of tokens to transfer in base units"),
})) {
}
exports.TransferFromParameters = TransferFromParameters;
class ConvertToBaseUnitParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    amount: zod_1.z.number().describe("The amount of tokens to convert from decimal units to base units"),
    decimals: zod_1.z.number().describe("The number of decimals of the token"),
})) {
}
exports.ConvertToBaseUnitParameters = ConvertToBaseUnitParameters;
class ConvertFromBaseUnitParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    amount: zod_1.z.number().describe("The amount of tokens to convert from base units to decimal units"),
    decimals: zod_1.z.number().describe("The number of decimals of the token"),
})) {
}
exports.ConvertFromBaseUnitParameters = ConvertFromBaseUnitParameters;
