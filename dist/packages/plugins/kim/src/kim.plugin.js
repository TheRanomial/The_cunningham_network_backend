"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kim = exports.KimPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const kim_service_1 = require("./kim.service");
const SUPPORTED_CHAINS = [chains_1.mode];
class KimPlugin extends core_1.PluginBase {
    constructor() {
        super("kim", [new kim_service_1.KimService()]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.KimPlugin = KimPlugin;
const kim = () => new KimPlugin();
exports.kim = kim;
