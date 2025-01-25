"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetQuoteParameters = exports.CheckApprovalBodySchema = exports.SwapResponseSchema = exports.TransactionSchema = exports.QuoteResponseSchema = exports.PermitDataSchema = exports.QuoteSchema = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
var SwapType;
(function (SwapType) {
    SwapType["EXACT_INPUT"] = "EXACT_INPUT";
    SwapType["EXACT_OUTPUT"] = "EXACT_OUTPUT";
})(SwapType || (SwapType = {}));
var Protocol;
(function (Protocol) {
    Protocol["V2"] = "V2";
    Protocol["V3"] = "V3";
})(Protocol || (Protocol = {}));
var Routing;
(function (Routing) {
    Routing["CLASSIC"] = "CLASSIC";
    Routing["UNISWAPX"] = "UNISWAPX";
    Routing["UNISWAPX_V2"] = "UNISWAPX_V2";
    Routing["V3_ONLY"] = "V3_ONLY";
    Routing["V2_ONLY"] = "V2_ONLY";
    Routing["BEST_PRICE"] = "BEST_PRICE";
    Routing["BEST_PRICE_V2"] = "BEST_PRICE_V2";
    Routing["FASTEST"] = "FASTEST";
})(Routing || (Routing = {}));
exports.QuoteSchema = zod_1.z.object({
    chainId: zod_1.z.number(),
    swapper: zod_1.z.string(),
    input: zod_1.z.any(),
    output: zod_1.z.any(),
    slippage: zod_1.z.any(),
    tradeType: zod_1.z.nativeEnum(SwapType),
    route: zod_1.z.any(),
    gasFee: zod_1.z.string(),
    gasFeeUSD: zod_1.z.string(),
    gasFeeQuote: zod_1.z.string(),
    gasUseEstimate: zod_1.z.string(),
    routeString: zod_1.z.string(),
    blockNumber: zod_1.z.string(),
    quoteId: zod_1.z.string(),
    gasPrice: zod_1.z.string(),
    maxFeePerGas: zod_1.z.string(),
    maxPriorityFeePerGas: zod_1.z.string(),
    txFailureReasons: zod_1.z.array(zod_1.z.string()),
    priceImpact: zod_1.z.number(),
});
exports.PermitDataSchema = zod_1.z.object({
    domain: zod_1.z.string(),
    types: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    primaryType: zod_1.z.string(),
    message: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});
exports.QuoteResponseSchema = zod_1.z.object({
    routing: zod_1.z.nativeEnum(Routing),
    permitData: exports.PermitDataSchema.optional(),
    quote: exports.QuoteSchema,
});
exports.TransactionSchema = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    amount: zod_1.z.string(),
    token: zod_1.z.string(),
});
exports.SwapResponseSchema = zod_1.z.object({
    transaction: exports.TransactionSchema,
    gasFee: zod_1.z.string(),
});
class CheckApprovalBodySchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    token: zod_1.z.string(),
    amount: zod_1.z.string(),
    walletAddress: zod_1.z.string(),
})) {
}
exports.CheckApprovalBodySchema = CheckApprovalBodySchema;
class GetQuoteParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    tokenIn: zod_1.z.string(),
    tokenOut: zod_1.z.string(),
    tokenOutChainId: zod_1.z.number().optional(),
    amount: zod_1.z.string().describe("The amount of tokens to swap in base units"),
    type: zod_1.z.nativeEnum(SwapType).default(SwapType.EXACT_INPUT),
    protocols: zod_1.z.array(zod_1.z.nativeEnum(Protocol)),
    routingPreference: zod_1.z
        .nativeEnum(Routing)
        .default(Routing.CLASSIC)
        .describe("The routing preference determines which protocol to use for the swap. If the routing preference is UNISWAPX, then the swap will be routed through the UniswapX Dutch Auction Protocol. If the routing preference is CLASSIC, then the swap will be routed through the Classic Protocol. If the routing preference is BEST_PRICE, then the swap will be routed through the protocol that provides the best price. When UNIXWAPX_V2 is passed, the swap will be routed through the UniswapX V2 Dutch Auction Protocol. When V3_ONLY is passed, the swap will be routed ONLY through the Uniswap V3 Protocol. When V2_ONLY is passed, the swap will be routed ONLY through the Uniswap V2 Protocol."),
})) {
}
exports.GetQuoteParameters = GetQuoteParameters;
