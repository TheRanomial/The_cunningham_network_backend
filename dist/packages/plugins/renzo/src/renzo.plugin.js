"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renzo = exports.RenzoPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const renzo_service_1 = require("./renzo.service");
const SUPPORTED_CHAINS = [chains_1.mode, chains_1.base, chains_1.arbitrum, chains_1.bsc, chains_1.linea];
class RenzoPlugin extends core_1.PluginBase {
    constructor() {
        super("renzo", [new renzo_service_1.RenzoService()]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.RenzoPlugin = RenzoPlugin;
const renzo = () => new RenzoPlugin();
exports.renzo = renzo;
