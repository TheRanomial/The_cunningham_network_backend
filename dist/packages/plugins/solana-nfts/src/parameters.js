"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferNftParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class TransferNftParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    recipientAddress: zod_1.z.string().describe("The address to send the NFT to"),
    assetId: zod_1.z.string().describe("The asset ID of the NFT to send"),
})) {
}
exports.TransferNftParameters = TransferNftParameters;
