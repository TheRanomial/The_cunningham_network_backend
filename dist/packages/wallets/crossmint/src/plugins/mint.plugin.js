"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintPlugin = void 0;
exports.mintPlugin = mintPlugin;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("../chains");
const mint_service_1 = require("./mint.service");
class MintPlugin extends core_1.PluginBase {
    constructor(client) {
        super("mint", [new mint_service_1.CrossmintMintService(client)]);
    }
    supportsChain(chain) {
        if (chain.type === "evm") {
            return (0, chains_1.isChainSupportedByMinting)(chain.id ?? 0);
        }
        if (chain.type === "aptos" || chain.type === "solana") {
            return true;
        }
        return false;
    }
}
exports.MintPlugin = MintPlugin;
function mintPlugin(client) {
    return () => {
        return new MintPlugin(client);
    };
}
