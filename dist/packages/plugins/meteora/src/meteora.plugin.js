"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meteora = exports.MeteoraPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const meteora_service_1 = require("./meteora.service");
class MeteoraPlugin extends core_1.PluginBase {
    constructor() {
        super("meteora", [new meteora_service_1.MeteoraService()]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.MeteoraPlugin = MeteoraPlugin;
const meteora = () => new MeteoraPlugin();
exports.meteora = meteora;
