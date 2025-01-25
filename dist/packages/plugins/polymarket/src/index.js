"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.createOrDeriveAPIKey = exports.PolymarketPlugin = void 0;
exports.polymarket = polymarket;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const api_1 = require("./api");
Object.defineProperty(exports, "createOrDeriveAPIKey", { enumerable: true, get: function () { return api_1.createOrDeriveAPIKey; } });
Object.defineProperty(exports, "createOrder", { enumerable: true, get: function () { return api_1.createOrder; } });
const tools_1 = require("./tools");
class PolymarketPlugin extends core_1.PluginBase {
    options;
    constructor(options) {
        super("polymarket", []);
        this.options = options;
    }
    supportsChain(chain) {
        return chain.type === "evm" && chain.id === chains_1.polygon.id;
    }
    async getTools(walletClient) {
        return (0, tools_1.getTools)(walletClient, this.options);
    }
}
exports.PolymarketPlugin = PolymarketPlugin;
function polymarket(options) {
    return new PolymarketPlugin(options);
}
