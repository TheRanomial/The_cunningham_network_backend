"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherscanPlugin = void 0;
exports.etherscan = etherscan;
const core_1 = require("@goat-sdk/core");
const etherscan_service_1 = require("./etherscan.service");
class EtherscanPlugin extends core_1.PluginBase {
    constructor({ apiKey }) {
        super("etherscan", [new etherscan_service_1.EtherscanService(apiKey)]);
    }
    supportsChain(chain) {
        return chain.type === "evm";
    }
}
exports.EtherscanPlugin = EtherscanPlugin;
function etherscan(options) {
    return new EtherscanPlugin(options);
}
