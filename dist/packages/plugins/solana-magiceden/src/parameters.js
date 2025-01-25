"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyListingTransactionResponseSchema = exports.getNftInfoResponseSchema = exports.GetNftInfoParametersSchema = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetNftInfoParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    mintHash: zod_1.z.string(),
})) {
}
exports.GetNftInfoParametersSchema = GetNftInfoParametersSchema;
exports.getNftInfoResponseSchema = zod_1.z.array(zod_1.z.object({
    pdaAddress: zod_1.z.string(),
    auctionHouse: zod_1.z.string().optional(),
    tokenAddress: zod_1.z.string(),
    tokenMint: zod_1.z.string().optional(),
    seller: zod_1.z.string(),
    sellerReferral: zod_1.z.string().optional(),
    tokenSize: zod_1.z.number().optional(),
    price: zod_1.z.number(),
    priceInfo: zod_1.z
        .object({
        solPrice: zod_1.z.object({
            rawAmount: zod_1.z.string(),
            address: zod_1.z.string(),
            decimals: zod_1.z.number(),
        }),
    })
        .optional(),
    rarity: zod_1.z.any().optional(),
    extra: zod_1.z.any().optional(),
    expiry: zod_1.z.number().optional(),
    token: zod_1.z.any().optional(),
    listingSource: zod_1.z.string().optional(),
}));
exports.getBuyListingTransactionResponseSchema = zod_1.z.object({
    v0: zod_1.z.object({
        tx: zod_1.z.object({
            type: zod_1.z.string(),
            data: zod_1.z.array(zod_1.z.number()),
        }),
        txSigned: zod_1.z.object({
            type: zod_1.z.string(),
            data: zod_1.z.array(zod_1.z.number()),
        }),
    }),
});
