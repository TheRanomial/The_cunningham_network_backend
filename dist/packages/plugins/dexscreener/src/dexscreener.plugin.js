"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexscreenerPlugin = void 0;
exports.dexscreener = dexscreener;
const core_1 = require("@goat-sdk/core");
const dexscreener_service_1 = require("./dexscreener.service");
/**
 * Plugin for interacting with Dexscreener API
 * Provides tools for fetching DEX pair data, token information, and market searches
 */
class DexscreenerPlugin extends core_1.PluginBase {
    constructor() {
        super("dexscreener", [new dexscreener_service_1.DexscreenerService()]);
    }
    /**
     * This plugin supports all chains as it's a data provider
     */
    supportsChain = (chain) => true;
}
exports.DexscreenerPlugin = DexscreenerPlugin;
/**
 * Utility factory function for creating a DexscreenerPlugin instance
 */
function dexscreener() {
    return new DexscreenerPlugin();
}
