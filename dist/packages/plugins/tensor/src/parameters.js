"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyListingTransactionResponseSchema = exports.getNftInfoResponseSchema = exports.GetNftInfoParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetNftInfoParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    mintHash: zod_1.z.string().describe("The mint hash of the NFT"),
})) {
}
exports.GetNftInfoParameters = GetNftInfoParameters;
exports.getNftInfoResponseSchema = zod_1.z.array(zod_1.z.object({
    onchainId: zod_1.z.string(),
    attributes: zod_1.z.array(zod_1.z.any()),
    imageUri: zod_1.z.string().optional(),
    lastSale: zod_1.z
        .object({
        price: zod_1.z.string(),
        priceUnit: zod_1.z.string(),
    })
        .optional(),
    metadataUri: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    rarityRankTT: zod_1.z.number().optional(),
    rarityRankTTStat: zod_1.z.number().optional(),
    rarityRankHrtt: zod_1.z.number().optional(),
    rarityRankStat: zod_1.z.number().optional(),
    sellRoyaltyFeeBPS: zod_1.z.number().optional(),
    tokenEdition: zod_1.z.string().optional(),
    tokenStandard: zod_1.z.string().optional(),
    hidden: zod_1.z.boolean().optional(),
    compressed: zod_1.z.boolean().optional(),
    verifiedCollection: zod_1.z.string().optional(),
    owner: zod_1.z.string().optional(),
    inscription: zod_1.z.string().optional(),
    tokenProgram: zod_1.z.string().optional(),
    metadataProgram: zod_1.z.string().optional(),
    transferHookProgram: zod_1.z.string().optional(),
    listingNormalizedPrice: zod_1.z.string().optional(),
    hybridAmount: zod_1.z.string().optional(),
    listing: zod_1.z
        .object({
        price: zod_1.z.string(),
        txId: zod_1.z.string(),
        seller: zod_1.z.string(),
        source: zod_1.z.string(),
    })
        .optional(),
    slugDisplay: zod_1.z.string().optional(),
    collId: zod_1.z.string().optional(),
    collName: zod_1.z.string().optional(),
    numMints: zod_1.z.number().optional(),
}));
exports.getBuyListingTransactionResponseSchema = zod_1.z.object({
    txs: zod_1.z.array(zod_1.z.object({
        tx: zod_1.z.object({
            type: zod_1.z.string(),
            data: zod_1.z.array(zod_1.z.number()),
        }),
        txV0: zod_1.z.object({
            type: zod_1.z.string(),
            data: zod_1.z.array(zod_1.z.number()),
        }),
    })),
});
