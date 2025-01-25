"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfts = exports.SolanaNftsPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const solana_nfts_service_1 = require("./solana-nfts.service");
class SolanaNftsPlugin extends core_1.PluginBase {
    constructor() {
        super("solana-nfts", [new solana_nfts_service_1.SolanaNftsService()]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.SolanaNftsPlugin = SolanaNftsPlugin;
const nfts = () => new SolanaNftsPlugin();
exports.nfts = nfts;
