"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressParameters = exports.TransferParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class TransferParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    toAddress: zod_1.z
        .string()
        .describe("The address to transfer ZIL to, from your Zilliqa address. This may be an EVM or a Zilliqa address, encoded in either hex or bech32 format"),
    amount: zod_1.z.string().describe("The amount of ZIL to send"),
})) {
}
exports.TransferParameters = TransferParameters;
class AddressParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    address: zod_1.z
        .string()
        .describe("An account address, which may be EVM or Zilliqa, encoded in either hex or bech32 format"),
})) {
}
exports.AddressParameters = AddressParameters;
