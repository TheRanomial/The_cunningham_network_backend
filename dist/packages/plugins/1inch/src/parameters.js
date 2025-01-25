"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalancesParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetBalancesParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    walletAddress: zod_1.z.string().optional().describe("The wallet address to check balances for"),
})) {
}
exports.GetBalancesParameters = GetBalancesParameters;
