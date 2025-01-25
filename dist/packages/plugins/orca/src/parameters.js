"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSingleSidedPositionParameters = exports.OpenCenteredPositionParameters = exports.FetchPositionsByOwnerParameters = exports.CreateSingleSidedPoolParameters = exports.CreateCLMMParameters = exports.ClosePositionParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class ClosePositionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    positionMintAddress: zod_1.z.string().describe("The mint address of the liquidity position to close."),
})) {
}
exports.ClosePositionParameters = ClosePositionParameters;
class CreateCLMMParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    mintDeploy: zod_1.z.string().describe("The mint of the token you want to deploy."),
    mintPair: zod_1.z.string().describe("The mint of the token you want to pair the deployed mint with."),
    initialPrice: zod_1.z.string().describe("The mint address of the other token in the pool, eg. USDC."),
    feeTier: zod_1.z.string().describe("The fee tier percentage for the pool, determining tick spacing and fee collection rates. \
        Available fee tiers are 0.01, 0.02, 0.04, 0.05, 0.16, 0.30, 0.65, 1.0, 2.0"),
})) {
}
exports.CreateCLMMParameters = CreateCLMMParameters;
class CreateSingleSidedPoolParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    depositTokenAmount: zod_1.z
        .string()
        .describe("The amount of the deposit token (including the decimals) to contribute to the pool."),
    depositTokenMint: zod_1.z
        .string()
        .describe("The mint address of the token being deposited into the pool, eg. NEW_TOKEN."),
    otherTokenMint: zod_1.z.string().describe("The mint address of the other token in the pool, eg. USDC."),
    startPrice: zod_1.z
        .string()
        .describe("The initial start price of the deposit token in terms of the other token, eg. 0.001 USDC."),
    maxPrice: zod_1.z.string().describe("The initial maximum price of the token."),
    feeTier: zod_1.z.string().describe("The fee tier percentage for the pool, determining tick spacing and fee collection rates. \
        Available fee tiers are 0.01, 0.02, 0.04, 0.05, 0.16, 0.30, 0.65, 1.0, 2.0"),
})) {
}
exports.CreateSingleSidedPoolParameters = CreateSingleSidedPoolParameters;
class FetchPositionsByOwnerParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    owner: zod_1.z
        .string()
        .describe("Wallet address of the owner for who you want to fetch the positions. If left blank, will default to agent."),
})) {
}
exports.FetchPositionsByOwnerParameters = FetchPositionsByOwnerParameters;
class OpenCenteredPositionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    whirlpoolAddress: zod_1.z.string().describe("The address of the Orca Whirlpool."),
    priceOffsetBps: zod_1.z.string().describe("The basis point offset (one side) from the current pool price."),
    inputTokenMint: zod_1.z.string().describe("The mint address of the token to deposit."),
    inputAmount: zod_1.z.string().describe("The amount of the input token to deposit."),
})) {
}
exports.OpenCenteredPositionParameters = OpenCenteredPositionParameters;
class OpenSingleSidedPositionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    whirlpoolAddress: zod_1.z.string().describe("The address of the Orca Whirlpool."),
    distanceFromCurrentPriceBps: zod_1.z
        .string()
        .describe("The basis point offset from the current price for the lower bound."),
    widthBps: zod_1.z.string().describe("The width of the range as a percentage increment from the lower bound."),
    inputTokenMint: zod_1.z.string().describe("The mint address of the token to deposit."),
    inputAmount: zod_1.z.string().describe("The amount of the input token to deposit."),
})) {
}
exports.OpenSingleSidedPositionParameters = OpenSingleSidedPositionParameters;
