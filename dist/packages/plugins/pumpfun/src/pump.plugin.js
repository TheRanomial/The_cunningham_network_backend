"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumpfun = exports.PumpFunPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const pump_service_1 = require("./pump.service");
class PumpFunPlugin extends core_1.PluginBase {
    constructor() {
        super("pumpfun", [new pump_service_1.PumpService()]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.PumpFunPlugin = PumpFunPlugin;
const pumpfun = () => new PumpFunPlugin();
exports.pumpfun = pumpfun;
