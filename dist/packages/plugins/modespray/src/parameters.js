"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprayErc20TokenParams = exports.SprayEtherParams = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
/**
 * Schema for dispersing Ether to multiple recipients.
 */
class SprayEtherParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    recipients: zod_1.z
        .array(zod_1.z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, "Each recipient must be a valid Ethereum address 42 hexadecimal characters included 0x-prefixed."))
        .nonempty({
        message: "The recipients array must have at least one valid Ethereum address.",
    }),
    amounts: zod_1.z.array(zod_1.z.string().regex(/^\d+$/, "Each amount must be a positive in gwei units")).nonempty({
        message: "The amounts array must have at least one valid amount specified",
    }),
})) {
}
exports.SprayEtherParams = SprayEtherParams;
/**
 * Schema for dispersing ERC-20 tokens to multiple recipients.
 */
class SprayErc20TokenParams extends (0, core_1.createToolParameters)(zod_1.z.object({
    token: zod_1.z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, "The token address must be a valid Ethereum address 42 hexadecimal characters included 0x-prefixed."),
    recipients: zod_1.z
        .array(zod_1.z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, "Each recipient must be a valid Ethereum address 42 hexadecimal characters included 0x-prefixed."))
        .nonempty({
        message: "The recipients array must have at least one valid Ethereum address.",
    }),
    amounts: zod_1.z
        .array(zod_1.z.string().regex(/^\d+$/, "Each amount must be a positive integer in the token unit."))
        .nonempty({
        message: "The amounts array must have at least one valid amount specified in the token unit.",
    }),
})) {
}
exports.SprayErc20TokenParams = SprayErc20TokenParams;
