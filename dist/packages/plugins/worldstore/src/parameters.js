"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRedemptionParameters = exports.StartRedemptionParameters = exports.BuyProductParameters = exports.SearchParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class SearchParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    query: zod_1.z.string(),
    limit: zod_1.z.string().optional(),
})) {
}
exports.SearchParameters = SearchParameters;
class BuyProductParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    contractAddress: zod_1.z.string(),
    productId: zod_1.z.string(),
    to: zod_1.z.string(),
    quantity: zod_1.z.number(),
})) {
}
exports.BuyProductParameters = BuyProductParameters;
const ShippingAddressSchema = zod_1.z.object({
    address1: zod_1.z.string(),
    address2: zod_1.z.string().optional(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    postalCode: zod_1.z.string(),
    country: zod_1.z.enum(["US"]),
});
class StartRedemptionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    shopId: zod_1.z.string(),
    walletAddress: zod_1.z.string(),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().int().positive(),
    })),
    userInformation: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional(),
        shippingAddress: ShippingAddressSchema.optional(),
    }),
})) {
}
exports.StartRedemptionParameters = StartRedemptionParameters;
class VerifyRedemptionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    shopId: zod_1.z.string(),
    redemptionId: zod_1.z.string(),
    signedMessage: zod_1.z.string(),
})) {
}
exports.VerifyRedemptionParameters = VerifyRedemptionParameters;
