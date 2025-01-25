"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConversationParameters = exports.SearchCastsParameters = exports.PublishCastParameters = exports.GetCastParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
const paginationSchema = zod_1.z.object({
    limit: zod_1.z.number().min(1).max(100).optional().describe("Number of results to return"),
    cursor: zod_1.z.string().optional().describe("Pagination cursor for fetching next page"),
});
class GetCastParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    identifier: zod_1.z.string().describe("Cast URL or hash identifier"),
    type: zod_1.z.enum(["url", "hash"]).default("hash").describe("Type of identifier (url or hash)"),
})) {
}
exports.GetCastParameters = GetCastParameters;
class PublishCastParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    signer_uuid: zod_1.z.string().describe("UUID of the signer. Must be approved for the API key"),
    text: zod_1.z.string().max(320).describe("Content of the cast (max 320 characters)"),
    parent: zod_1.z.string().optional().describe("Parent URL or hash for replies"),
    channel_id: zod_1.z.string().optional().describe("Channel ID to post in (e.g., 'neynar', 'farcaster')"),
    embeds: zod_1.z
        .array(zod_1.z.object({
        url: zod_1.z.string().optional(),
        cast_id: zod_1.z
            .object({
            hash: zod_1.z.string(),
            fid: zod_1.z.number(),
        })
            .optional(),
    }))
        .optional()
        .describe("Optional embeds for the cast (URLs or other casts)"),
})) {
}
exports.PublishCastParameters = PublishCastParameters;
class SearchCastsParameters extends (0, core_1.createToolParameters)(zod_1.z
    .object({
    query: zod_1.z.string().describe("Search query string"),
    author_fid: zod_1.z.number().optional().describe("Filter results by author FID"),
    parent_url: zod_1.z.string().optional().describe("Filter by parent URL"),
    channel_id: zod_1.z.string().optional().describe("Filter by channel ID"),
    priority_mode: zod_1.z
        .boolean()
        .optional()
        .default(false)
        .describe("Only show results from power users and followed users"),
})
    .merge(paginationSchema)) {
}
exports.SearchCastsParameters = SearchCastsParameters;
class GetConversationParameters extends (0, core_1.createToolParameters)(zod_1.z
    .object({
    identifier: zod_1.z.string().describe("Cast URL or hash identifier"),
    type: zod_1.z.enum(["url", "hash"]).default("hash").describe("Type of identifier (url or hash)"),
    reply_depth: zod_1.z.number().min(0).max(5).optional().default(2).describe("Depth of replies to fetch (0-5)"),
    include_parent_casts: zod_1.z
        .boolean()
        .optional()
        .default(false)
        .describe("Include parent casts in chronological order"),
    viewer_fid: zod_1.z.number().optional().describe("Viewer's FID to include viewer-specific context"),
})
    .merge(paginationSchema)) {
}
exports.GetConversationParameters = GetConversationParameters;
