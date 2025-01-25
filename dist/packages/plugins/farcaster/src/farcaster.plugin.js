"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.farcasterPlugin = exports.FarcasterPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const farcaster_service_1 = require("./farcaster.service");
class FarcasterPlugin extends core_1.PluginBase {
    constructor(config) {
        super("farcaster", [new farcaster_service_1.FarcasterClient(config)]);
    }
    // Plugin supports all chains since Farcaster is chain-agnostic
    supportsChain = () => true;
}
exports.FarcasterPlugin = FarcasterPlugin;
const farcasterPlugin = (config) => new FarcasterPlugin(config);
exports.farcasterPlugin = farcasterPlugin;
