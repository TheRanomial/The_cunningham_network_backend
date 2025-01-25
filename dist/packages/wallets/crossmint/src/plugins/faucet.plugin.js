"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaucetPlugin = void 0;
exports.faucetPlugin = faucetPlugin;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("../chains");
const faucet_service_1 = require("./faucet.service");
class FaucetPlugin extends core_1.PluginBase {
    constructor(client) {
        super("faucet", [new faucet_service_1.CrossmintFaucetService(client)]);
    }
    supportsChain(chain) {
        if (chain.type !== "evm") {
            return false;
        }
        if (!chain.id) {
            return false;
        }
        return (0, chains_1.isChainSupportedByFaucet)(chain.id);
    }
}
exports.FaucetPlugin = FaucetPlugin;
function faucetPlugin(client) {
    return () => {
        return new FaucetPlugin(client);
    };
}
