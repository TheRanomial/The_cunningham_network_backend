"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapParametersSchema = exports.quoteResponseSchema = exports.swapInfoSchema = exports.GetQuoteParameters = void 0;
const core_1 = require("@goat-sdk/core");
const api_1 = require("@jup-ag/api");
const zod_1 = require("zod");
class GetQuoteParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    inputMint: zod_1.z.string().describe("The token address of the token to swap from"),
    outputMint: zod_1.z.string().describe("The token address of the token to swap to"),
    amount: zod_1.z.number().describe("The amount of tokens to swap in the tokens base unit"),
    slippageBps: zod_1.z.number().optional().describe("The slippage in bps"),
    autoSlippage: zod_1.z.boolean().optional().describe("Whether to use auto slippage"),
    autoSlippageCollisionUsdValue: zod_1.z.number().optional().describe("The collision USD value for auto slippage"),
    computeAutoSlippage: zod_1.z.boolean().optional().describe("Whether to compute auto slippage"),
    maxAutoSlippageBps: zod_1.z.number().optional().describe("The maximum auto slippage in bps"),
    swapMode: zod_1.z.nativeEnum(api_1.QuoteGetSwapModeEnum).optional().describe("The swap mode"),
    dexes: zod_1.z.array(zod_1.z.string()).optional().describe("The dexes to use"),
    excludeDexes: zod_1.z.array(zod_1.z.string()).optional().describe("The dexes to exclude"),
    restrictIntermediateTokens: zod_1.z.boolean().optional().describe("Whether to restrict intermediate tokens"),
    onlyDirectRoutes: zod_1.z.boolean().optional().describe("Whether to only use direct routes"),
    asLegacyTransaction: zod_1.z
        .boolean()
        .optional()
        .describe("Whether to return the transaction as a legacy transaction"),
    platformFeeBps: zod_1.z.number().optional().describe("The platform fee in bps"),
    maxAccounts: zod_1.z.number().optional().describe("The maximum number of accounts"),
    minimizeSlippage: zod_1.z.boolean().optional().describe("Whether to minimize slippage"),
    preferLiquidDexes: zod_1.z.boolean().optional().describe("Whether to prefer liquid dexes"),
    tokenCategoryBasedIntermediateTokens: zod_1.z
        .boolean()
        .optional()
        .describe("Whether to use token category based intermediate tokens"),
})) {
}
exports.GetQuoteParameters = GetQuoteParameters;
exports.swapInfoSchema = zod_1.z.object({
    ammKey: zod_1.z.string().describe("The AMM key"),
    label: zod_1.z.string().optional().describe("The label"),
    inputMint: zod_1.z.string().describe("The token to swap from"),
    outputMint: zod_1.z.string().describe("The token to swap to"),
    inAmount: zod_1.z.string().describe("The amount of tokens to swap"),
    outAmount: zod_1.z.string().describe("The amount of tokens to swap"),
    feeAmount: zod_1.z.string().describe("The fee amount"),
    feeMint: zod_1.z.string().describe("The fee mint"),
});
exports.quoteResponseSchema = zod_1.z.object({
    inputMint: zod_1.z.string().describe("The token address of the token to swap from"),
    inAmount: zod_1.z.string().describe("The amount of tokens to swap in the tokens base unit"),
    outputMint: zod_1.z.string().describe("The token address of the token to swap to"),
    outAmount: zod_1.z.string().describe("The amount of tokens to swap in the tokens base unit"),
    otherAmountThreshold: zod_1.z.string().describe("The amount of tokens to swap in the tokens base unit"),
    swapMode: zod_1.z.enum(["ExactIn", "ExactOut"]).describe("The swap mode"),
    slippageBps: zod_1.z.number().describe("The slippage in bps"),
    computedAutoSlippage: zod_1.z.number().optional().describe("The computed auto slippage"),
    platformFee: zod_1.z
        .object({
        amount: zod_1.z.string().describe("The amount of tokens to swap"),
        feeBps: zod_1.z.number().describe("The platform fee in bps"),
    })
        .optional()
        .describe("The platform fee"),
    priceImpactPct: zod_1.z.string().describe("The price impact in percentage"),
    routePlan: zod_1.z
        .array(zod_1.z.object({
        swapInfo: exports.swapInfoSchema.describe("The swap info"),
        percent: zod_1.z.number().describe("The percent of the route plan step"),
    }))
        .describe("The route plan"),
    contextSlot: zod_1.z.number().optional().describe("The context slot"),
    timeTaken: zod_1.z.number().optional().describe("The time taken"),
});
exports.swapParametersSchema = zod_1.z.object({
    swapRequest: zod_1.z.object({
        userPublicKey: zod_1.z.string().describe("The user public key"),
        quoteResponse: exports.quoteResponseSchema.describe("The quote response"),
    }),
});
