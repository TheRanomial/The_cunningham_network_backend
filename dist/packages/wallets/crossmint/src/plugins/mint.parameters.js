"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintNFTParameters = exports.GetAllCollectionsParameters = exports.CollectionParameters = void 0;
const zod_1 = require("zod");
const core_1 = require("@goat-sdk/core");
class CollectionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    metadata: zod_1.z
        .object({
        name: zod_1.z.string().describe("The name of the collection"),
        description: zod_1.z.string().describe("A description of the NFT collection"),
        image: zod_1.z.string().optional().describe("URL pointing to an image that represents the collection"),
        symbol: zod_1.z
            .string()
            .optional()
            .describe("Shorthand identifier for the NFT collection (Max length: 10). Defaults to 'TOKEN'"),
    })
        .default({
        name: "My first Minting API Collection",
        description: "An NFT Collection created with the Crossmint Minting API - learn more at https://www.crossmint.com/products/nft-minting-api",
        image: "https://www.crossmint.com/assets/crossmint/logo.png",
    })
        .describe("The metadata of the collection"),
    fungibility: zod_1.z
        .enum(["semi-fungible", "non-fungible"])
        .optional()
        .default("non-fungible")
        .describe("Whether or not this collection is fungible (e.g ERC-1155 vs ERC-721)"),
    transferable: zod_1.z
        .boolean()
        .optional()
        .default(true)
        .describe("Whether or not the NFTs in this collection are transferable"),
})) {
}
exports.CollectionParameters = CollectionParameters;
class GetAllCollectionsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({})) {
}
exports.GetAllCollectionsParameters = GetAllCollectionsParameters;
class MintNFTParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    collectionId: zod_1.z.string().describe("The ID of the collection to mint the NFT in"),
    recipient: zod_1.z.string().describe("The recipient of the NFT, this can be a wallet address or an email address"),
    recipientType: zod_1.z
        .enum(["wallet", "email"])
        .optional()
        .default("email")
        .describe("The type of the recipient, either 'wallet' or 'email'"),
    metadata: zod_1.z
        .object({
        name: zod_1.z.string().describe("The name of the NFT"),
        description: zod_1.z.string().max(64).describe("The description of the NFT"),
        image: zod_1.z.string().describe("URL pointing to the NFT image"),
        animation_url: zod_1.z.string().optional().describe("URL pointing to the NFT animation"),
        attributes: zod_1.z
            .array(zod_1.z.object({
            display_type: zod_1.z
                .enum(["number", "boost_number", "boost_percentage"])
                .describe("The type of the attribute, if it's a number or a percentage"),
            value: zod_1.z.string().describe("The trait value"),
        }))
            .optional()
            .describe("The attributes of the NFT"),
    })
        .describe("The metadata of the NFT"),
})) {
}
exports.MintNFTParameters = MintNFTParameters;
