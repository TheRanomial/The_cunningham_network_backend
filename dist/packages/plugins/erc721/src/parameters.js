"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerOfParametersSchema = exports.transferFromParametersSchema = exports.approveParametersSchema = exports.totalSupplyParametersSchema = exports.transferParametersSchema = exports.getBalanceParametersSchema = void 0;
const zod_1 = require("zod");
exports.getBalanceParametersSchema = zod_1.z.object({
    wallet: zod_1.z.string().describe("The address to get the NFT balance of"),
});
exports.transferParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The address to transfer the NFT to"),
    tokenId: zod_1.z.string().describe("The ID of the NFT to transfer"),
});
exports.totalSupplyParametersSchema = zod_1.z.object({});
exports.approveParametersSchema = zod_1.z.object({
    spender: zod_1.z.string().describe("The address to approve for the NFT"),
    tokenId: zod_1.z.string().describe("The ID of the NFT to approve"),
});
exports.transferFromParametersSchema = zod_1.z.object({
    from: zod_1.z.string().describe("The address to transfer the NFT from"),
    to: zod_1.z.string().describe("The address to transfer the NFT to"),
    tokenId: zod_1.z.string().describe("The ID of the NFT to transfer"),
});
exports.ownerOfParametersSchema = zod_1.z.object({
    tokenId: zod_1.z.string().describe("The ID of the NFT to check ownership of"),
});
