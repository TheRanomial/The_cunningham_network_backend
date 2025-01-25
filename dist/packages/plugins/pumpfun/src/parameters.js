"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAndBuyTokenParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class CreateAndBuyTokenParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    name: zod_1.z.string().describe("The name of the token"),
    symbol: zod_1.z.string().describe("The symbol of the token"),
    description: zod_1.z.string().describe("The description of the token"),
    amountToBuyInSol: zod_1.z.number().default(0).describe("The amount of tokens to buy in lamports (base units)"),
    slippage: zod_1.z.number().default(5).describe("The slippage of the transaction"),
    priorityFee: zod_1.z.number().default(0.0005).describe("The priority fee of the transaction"),
    imageUrl: zod_1.z.string().describe("URL of the image file of the token"),
    twitter: zod_1.z.string().optional().describe("The twitter / X handle of the token"),
    telegram: zod_1.z.string().optional().describe("The telegram handle of the token"),
    website: zod_1.z.string().optional().describe("The website of the token"),
})) {
}
exports.CreateAndBuyTokenParameters = CreateAndBuyTokenParameters;
