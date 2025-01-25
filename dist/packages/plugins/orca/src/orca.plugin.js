"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orca = exports.OrcaPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const orca_service_1 = require("./orca.service");
class OrcaPlugin extends core_1.PluginBase {
    constructor() {
        super("orca", [new orca_service_1.OrcaService()]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.OrcaPlugin = OrcaPlugin;
const orca = () => new OrcaPlugin();
exports.orca = orca;
