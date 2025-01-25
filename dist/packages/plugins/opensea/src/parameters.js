"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNftSalesResponseSchema = exports.GetNftCollectionStatisticsResponseSchema = exports.GetNftSalesParametersSchema = exports.GetNftCollectionStatisticsParametersSchema = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetNftCollectionStatisticsParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    collectionSlug: zod_1.z.string(),
})) {
}
exports.GetNftCollectionStatisticsParametersSchema = GetNftCollectionStatisticsParametersSchema;
class GetNftSalesParametersSchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    collectionSlug: zod_1.z.string(),
})) {
}
exports.GetNftSalesParametersSchema = GetNftSalesParametersSchema;
exports.GetNftCollectionStatisticsResponseSchema = zod_1.z.object({
    total: zod_1.z.object({
        volume: zod_1.z.number(),
        sales: zod_1.z.number(),
        average_price: zod_1.z.number(),
        num_owners: zod_1.z.number(),
        market_cap: zod_1.z.number(),
        floor_price: zod_1.z.number(),
        floor_price_symbol: zod_1.z.string(),
    }),
    intervals: zod_1.z.array(zod_1.z.object({
        interval: zod_1.z.string(),
        volume: zod_1.z.number(),
        volume_diff: zod_1.z.number(),
        volume_change: zod_1.z.number(),
        sales: zod_1.z.number(),
        sales_diff: zod_1.z.number(),
        average_price: zod_1.z.number(),
    })),
});
exports.GetNftSalesResponseSchema = zod_1.z.object({
    asset_events: zod_1.z.array(zod_1.z.object({
        event_type: zod_1.z.string(),
        order_hash: zod_1.z.string(),
        chain: zod_1.z.string(),
        protocol_address: zod_1.z.string(),
        closing_date: zod_1.z.number(),
        nft: zod_1.z.object({
            identifier: zod_1.z.string(),
            collection: zod_1.z.string(),
            contract: zod_1.z.string(),
            token_standard: zod_1.z.string(),
            name: zod_1.z.string(),
            description: zod_1.z.string(),
            image_url: zod_1.z.string(),
            display_image_url: zod_1.z.string(),
            display_animation_url: zod_1.z.string().nullable(),
            metadata_url: zod_1.z.string(),
            opensea_url: zod_1.z.string(),
            updated_at: zod_1.z.string(),
            is_disabled: zod_1.z.boolean(),
            is_nsfw: zod_1.z.boolean(),
        }),
        quantity: zod_1.z.number(),
        seller: zod_1.z.string(),
        buyer: zod_1.z.string(),
        payment: zod_1.z.object({
            quantity: zod_1.z.string(),
            token_address: zod_1.z.string(),
            decimals: zod_1.z.number(),
            symbol: zod_1.z.string(),
        }),
        transaction: zod_1.z.string(),
        event_timestamp: zod_1.z.number(),
    })),
    next: zod_1.z.string(),
});
