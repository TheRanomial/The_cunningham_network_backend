"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeroDevGlobalAddress = exports.ZeroDevGlobalAddressPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const zerodev_global_address_service_1 = require("./zerodev-global-address.service");
__exportStar(require("./types"), exports);
const SUPPORTED_CHAINS = [chains_1.mainnet, chains_1.polygon, chains_1.base, chains_1.optimism, chains_1.arbitrum, chains_1.mode, chains_1.scroll];
class ZeroDevGlobalAddressPlugin extends core_1.PluginBase {
    constructor() {
        super("zero-dev-global-address", [new zerodev_global_address_service_1.ZeroDevGlobalAddressService()]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.ZeroDevGlobalAddressPlugin = ZeroDevGlobalAddressPlugin;
const zeroDevGlobalAddress = () => new ZeroDevGlobalAddressPlugin();
exports.zeroDevGlobalAddress = zeroDevGlobalAddress;
