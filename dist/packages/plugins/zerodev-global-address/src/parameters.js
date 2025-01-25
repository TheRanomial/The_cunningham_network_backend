"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGlobalAddressConfigParams = exports.GlobalAddressConfigSchema = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const zod_1 = require("zod");
const SupportedChains = zod_1.z
    .enum(["base", "arbitrum", "mainnet", "optimism", "scroll", "mode"])
    .describe("The supported chains for global account deployment");
exports.GlobalAddressConfigSchema = zod_1.z.object({
    owner: zod_1.z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, "Must be a valid Ethereum address")
        .transform((val) => val)
        .describe("The owner address of the global account")
        .optional(),
    destinationChain: SupportedChains.transform((val) => {
        switch (val) {
            case "base":
                return chains_1.base;
            case "arbitrum":
                return chains_1.arbitrum;
            case "mainnet":
                return chains_1.mainnet;
            case "optimism":
                return chains_1.optimism;
            case "scroll":
                return chains_1.scroll;
            case "mode":
                return chains_1.mode;
        }
    })
        .describe("The chain where tokens will be bridged to (e.g., optimism, base, arbitrum)")
        .default("optimism")
        .optional(),
    slippage: zod_1.z
        .number()
        .min(0)
        .max(10000)
        .describe("Slippage tolerance in basis points (default: 5000 = 50%)")
        .default(5000)
        .optional(),
});
class CreateGlobalAddressConfigParams extends (0, core_1.createToolParameters)(exports.GlobalAddressConfigSchema) {
}
exports.CreateGlobalAddressConfigParams = CreateGlobalAddressConfigParams;
