"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAllOrdersParametersSchema = exports.cancelOrderParametersSchema = exports.getOpenOrdersParametersSchema = exports.createOrderParametersSchema = exports.getMarketInfoParametersSchema = exports.getEventsParametersSchema = void 0;
const zod_1 = require("zod");
exports.getEventsParametersSchema = zod_1.z.object({
    id: zod_1.z.optional(zod_1.z.string()).describe("The id of the event to get"),
    slug: zod_1.z.optional(zod_1.z.string()).describe("The slug of the event to get"),
    archived: zod_1.z.optional(zod_1.z.boolean()).describe("Whether to get archived events or not"),
    active: zod_1.z.optional(zod_1.z.boolean()).default(true).describe("Whether to filter by only active events or not"),
    closed: zod_1.z.optional(zod_1.z.boolean()).default(false).describe("Whether to get closed events or not"),
    startDateMin: zod_1.z.optional(zod_1.z.string()).describe("The minimum start date of the events to get"),
    startDateMax: zod_1.z.optional(zod_1.z.string()).describe("The maximum start date of the events to get"),
    endDateMin: zod_1.z.optional(zod_1.z.string()).describe("The minimum end date of the events to get"),
    endDateMax: zod_1.z.optional(zod_1.z.string()).describe("The maximum end date of the events to get"),
    ascending: zod_1.z.optional(zod_1.z.boolean()).describe("Whether to get the events in ascending order or not"),
    order: zod_1.z
        .optional(zod_1.z.enum(["startDate", "endDate", "slug", "liquidity", "volume"]))
        .describe("The field to order the events by"),
    limit: zod_1.z.optional(zod_1.z.number()).describe("The maximum number of events to get"),
    offset: zod_1.z.optional(zod_1.z.number()).describe("The number of events to skip"),
    liquidityMin: zod_1.z.optional(zod_1.z.number()).describe("The minimum liquidity of the events to get"),
    tagSlug: zod_1.z.optional(zod_1.z.string()).describe("Keyword to search events by"),
    showOnlyMarketsAcceptingOrders: zod_1.z
        .optional(zod_1.z.boolean())
        .default(true)
        .describe("Whether to show only markets accepting orders"),
});
exports.getMarketInfoParametersSchema = zod_1.z.object({
    id: zod_1.z.string().describe("The id of the market to get"),
});
exports.createOrderParametersSchema = zod_1.z.object({
    type: zod_1.z
        .enum(["FOK", "GTC", "GTD"])
        .describe("The type of the order:\n" +
        "- `FOK`: A 'Fill-Or-Kill' order is a market order to buy shares that must be executed immediately in its entirety; otherwise, the entire order will be cancelled.\n" +
        "- `GTC`: A 'Good-Til-Cancelled' order is a limit order that is active until it is fulfilled or cancelled.\n" +
        "- `GTD`: A 'Good-Til-Day' order is active until its specified expiration date (provided as a UTC seconds timestamp)."),
    tokenId: zod_1.z.string().describe("ERC1155 token ID of the conditional token being traded"),
    price: zod_1.z.string().describe("Price of the conditional token being traded"),
    size: zod_1.z.number().describe("How many shares to buy or sell"),
    expiration: zod_1.z.number().describe("Time in seconds until the order expires"),
    side: zod_1.z.enum(["BUY", "SELL"]).describe("Buy or sell"),
});
exports.getOpenOrdersParametersSchema = zod_1.z.object({
    id: zod_1.z.optional(zod_1.z.string()).describe("The id of the order to get"),
    market: zod_1.z.optional(zod_1.z.string()).describe("The market of the order to get"),
    asset_id: zod_1.z.optional(zod_1.z.string()).describe("The id of the asset or token to get"),
});
exports.cancelOrderParametersSchema = zod_1.z.object({
    id: zod_1.z.string().describe("The id of the order to cancel"),
});
exports.cancelAllOrdersParametersSchema = zod_1.z.object({});
