"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLendingPoolAddressParameters = exports.GetBorrowerAddressParameters = exports.GetIcVaultParameters = exports.CalculateMaxWithdrawableParameters = exports.MonitorPositionParameters = exports.RepayIUSDParameters = exports.BorrowIUSDParameters = exports.LoopWithdrawParameters = exports.LoopDepositParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class LoopDepositParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    assetAddress: zod_1.z.string().describe("The address of the asset to deposit and borrow"),
    initialAmount: zod_1.z.string().describe("The initial amount of the asset to deposit in base units"),
    numLoops: zod_1.z.number().min(1).max(5).default(2).describe("Number of loops to perform, a number between 1 and 5"),
    referralCode: zod_1.z.string().optional().default("0").describe("Referral code"),
})) {
}
exports.LoopDepositParameters = LoopDepositParameters;
class LoopWithdrawParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    assetAddress: zod_1.z.string().describe("The address of the asset to withdraw in base units"),
})) {
}
exports.LoopWithdrawParameters = LoopWithdrawParameters;
class BorrowIUSDParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to deposit"),
    tokenAmount: zod_1.z.string().describe("Amount of token to deposit in base units"),
    maxFeePercentage: zod_1.z.string().describe("Maximum fee percentage for the borrowing operation"),
    iUSDAmount: zod_1.z.string().describe("Amount of iUSD to borrow"),
    upperHint: zod_1.z
        .string()
        .optional()
        .default("0x0000000000000000000000000000000000000000")
        .describe("Upper hint for the trove insertion"),
    lowerHint: zod_1.z
        .string()
        .optional()
        .default("0x0000000000000000000000000000000000000000")
        .describe("Lower hint for the trove insertion"),
})) {
}
exports.BorrowIUSDParameters = BorrowIUSDParameters;
class RepayIUSDParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The token address used"),
})) {
}
exports.RepayIUSDParameters = RepayIUSDParameters;
class MonitorPositionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The token address to check position for"),
})) {
}
exports.MonitorPositionParameters = MonitorPositionParameters;
class CalculateMaxWithdrawableParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    assetAddress: zod_1.z.string().describe("The address of the asset to calculate max withdrawable amount for"),
})) {
}
exports.CalculateMaxWithdrawableParameters = CalculateMaxWithdrawableParameters;
class GetIcVaultParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenAddress: zod_1.z.string().describe("The address of the token to get corresponding ic-vault for"),
})) {
}
exports.GetIcVaultParameters = GetIcVaultParameters;
class GetBorrowerAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
// Empty object as we don't need any parameters,
// the borrower address is constant for all operations
})) {
}
exports.GetBorrowerAddressParameters = GetBorrowerAddressParameters;
class GetLendingPoolAddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({})) {
}
exports.GetLendingPoolAddressParameters = GetLendingPoolAddressParameters;
