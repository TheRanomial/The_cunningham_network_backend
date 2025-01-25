"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStateResponseParams = exports.BurnParams = exports.CollectParams = exports.DecreaseLiquidityParams = exports.IncreaseLiquidityParams = exports.MintParams = exports.PoolByPairParams = exports.DefaultConfigurationForPoolParams = exports.ExactOutputSingleParams = exports.ExactInputSingleParams = exports.ExactOutputParams = exports.ExactInputParams = exports.pathSchema = exports.GetSwapRouterAddressParams = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetSwapRouterAddressParams extends (0, core_1.createToolParameters)(zod_1.z.object({})) {
}
exports.GetSwapRouterAddressParams = GetSwapRouterAddressParams;
exports.pathSchema = zod_1.z.object({
    tokenIn: zod_1.z.string().describe("Address of the first token in the path"),
    tokenOut: zod_1.z.string().describe("Address of the last token in the path"),
    intermediateTokens: zod_1.z.array(zod_1.z.string()).describe("Addresses of the intermediate tokens in the path"),
    fees: zod_1.z.array(zod_1.z.number()).describe("Fee tiers between each hop"),
});
class ExactInputParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    path: exports.pathSchema.describe("The path of the swap"),
    recipient: zod_1.z.string().describe("Address to receive the output tokens"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
    amountIn: zod_1.z.string().describe("The amount of tokens to swap in base units"),
    amountOutMinimum: zod_1.z.string().describe("The minimum amount of tokens to receive in base units"),
})) {
}
exports.ExactInputParams = ExactInputParams;
class ExactOutputParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    path: zod_1.z.any().describe("The path of the swap"),
    recipient: zod_1.z.string().describe("The address to receive the output tokens"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
    amountOut: zod_1.z.string().describe("The amount of tokens to swap out in base units"),
    amountInMaximum: zod_1.z.string().describe("The maximum amount of tokens to swap in in base units"),
})) {
}
exports.ExactOutputParams = ExactOutputParams;
class ExactInputSingleParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenInAddress: zod_1.z.string().describe("The address of the token to swap in"),
    tokenOutAddress: zod_1.z.string().describe("The address of the token to swap out"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
    amountIn: zod_1.z.string().describe("The amount of tokens to swap in in base units"),
    amountOutMinimum: zod_1.z.string().describe("The minimum amount of tokens to receive in base units"),
    limitSqrtPrice: zod_1.z.string().describe("The limit price for the swap"),
})) {
}
exports.ExactInputSingleParams = ExactInputSingleParams;
class ExactOutputSingleParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenInAddress: zod_1.z.string().describe("The address of the token to swap in"),
    tokenOutAddress: zod_1.z.string().describe("The address of the token to swap out"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
    amountOut: zod_1.z.string().describe("The amount of tokens to swap out in base units of the output token"),
    amountInMaximum: zod_1.z.string().describe("The maximum amount of tokens to swap in base units of the input token"),
    limitSqrtPrice: zod_1.z.string().describe("The limit price for the swap"),
})) {
}
exports.ExactOutputSingleParams = ExactOutputSingleParams;
class DefaultConfigurationForPoolParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    poolAddress: zod_1.z.string().describe("The address of the pool"),
})) {
}
exports.DefaultConfigurationForPoolParams = DefaultConfigurationForPoolParams;
class PoolByPairParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    token0: zod_1.z.string().describe("The first token in the pair"),
    token1: zod_1.z.string().describe("The second token in the pair"),
})) {
}
exports.PoolByPairParams = PoolByPairParams;
class MintParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    token0Address: zod_1.z.string().describe("The address of the first token in the pair"),
    token1Address: zod_1.z.string().describe("The address of the second token in the pair"),
    tickLower: zod_1.z.number().optional().describe("The lower tick for the liquidity"),
    tickUpper: zod_1.z.number().optional().describe("The upper tick for the liquidity"),
    amount0Desired: zod_1.z.string().describe("The amount of token0 to add in base units"),
    amount1Desired: zod_1.z.string().describe("The amount of token1 to add in base units"),
    amount0Min: zod_1.z.string().describe("The minimum amount of token0 to add in base units"),
    amount1Min: zod_1.z.string().describe("The minimum amount of token1 to add in base units"),
    deadline: zod_1.z.number().describe("The deadline for the swap"),
})) {
}
exports.MintParams = MintParams;
class IncreaseLiquidityParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    token0Address: zod_1.z.string().describe("The address of the first token in the pair"),
    token1Address: zod_1.z.string().describe("The address of the second token in the pair"),
    tokenId: zod_1.z.string().describe("The token id of the liquidity"),
    amount0Desired: zod_1.z.string().describe("The amount of token0 to add in base units"),
    amount1Desired: zod_1.z.string().describe("The amount of token1 to add in base units"),
    amount0Min: zod_1.z.string().describe("The minimum amount of token0 to add in base units"),
    amount1Min: zod_1.z.string().describe("The minimum amount of token1 to add in base units"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the swap in seconds from now"),
})) {
}
exports.IncreaseLiquidityParams = IncreaseLiquidityParams;
class DecreaseLiquidityParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenId: zod_1.z.string().describe("The token id of the liquidity"),
    percentage: zod_1.z.number().min(1).max(100).describe("The percentage of liquidity to remove (1-100)"),
    amount0Min: zod_1.z.string().optional().describe("The minimum amount of token0 to remove in base units"),
    amount1Min: zod_1.z.string().optional().describe("The minimum amount of token1 to remove in base units"),
    deadline: zod_1.z
        .number()
        .optional()
        .default(60 * 60 * 24)
        .describe("The deadline for the transaction in seconds from now"),
})) {
}
exports.DecreaseLiquidityParams = DecreaseLiquidityParams;
class CollectParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenId: zod_1.z.string().describe("The token id of the LP position whose tokens are being collected"),
})) {
}
exports.CollectParams = CollectParams;
class BurnParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenId: zod_1.z.string().describe("The token id of the liquidity position to be burned"),
})) {
}
exports.BurnParams = BurnParams;
class GlobalStateResponseParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    price: zod_1.z.string().describe("The current price of the pool"),
    tick: zod_1.z.number().describe("The current tick of the pool"),
    lastFee: zod_1.z.number().describe("The current (last known) fee in hundredths of a bip"),
    pluginCongig: zod_1.z.number().describe("The current plugin config as bitmap"),
    communityFee: zod_1.z
        .number()
        .describe("The community fee represented as a percent of all collected fee in thousandths"),
    unlocked: zod_1.z.boolean().describe("Whether the pool is unlocked"),
})) {
}
exports.GlobalStateResponseParams = GlobalStateResponseParams;
