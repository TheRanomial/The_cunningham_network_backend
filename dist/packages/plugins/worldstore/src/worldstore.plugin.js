"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldstore = exports.WorldstorePlugin = void 0;
const core_1 = require("@goat-sdk/core");
const worldstore_service_1 = require("./worldstore.service");
class WorldstorePlugin extends core_1.PluginBase {
    constructor(baseUrl = "https://www.crossmint.com") {
        super("worldstore", [new worldstore_service_1.WorldstoreService(baseUrl)]);
    }
    supportsChain(chain) {
        // base and base sepolia
        return chain.type === "evm" && [8453, 84532].includes(chain.id);
    }
}
exports.WorldstorePlugin = WorldstorePlugin;
const worldstore = (baseUrl) => new WorldstorePlugin(baseUrl);
exports.worldstore = worldstore;
