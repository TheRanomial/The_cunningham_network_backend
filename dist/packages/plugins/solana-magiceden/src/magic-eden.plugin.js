"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magicEden = exports.MagicEdenPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const magic_eden_service_1 = require("./magic-eden.service");
class MagicEdenPlugin extends core_1.PluginBase {
    constructor(apiKey) {
        super("magic-eden", [new magic_eden_service_1.MagicEdenService(apiKey)]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.MagicEdenPlugin = MagicEdenPlugin;
const magicEden = (apiKey) => new MagicEdenPlugin(apiKey);
exports.magicEden = magicEden;
