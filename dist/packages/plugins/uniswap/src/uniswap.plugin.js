"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniswap = exports.UniswapPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const uniswap_service_1 = require("./uniswap.service");
const SUPPORTED_CHAINS = [chains_1.mainnet, chains_1.polygon, chains_1.avalanche, chains_1.base, chains_1.optimism, chains_1.zora, chains_1.arbitrum, chains_1.celo];
class UniswapPlugin extends core_1.PluginBase {
    constructor(params) {
        super("uniswap", [new uniswap_service_1.UniswapService(params)]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.UniswapPlugin = UniswapPlugin;
const uniswap = (params) => new UniswapPlugin(params);
exports.uniswap = uniswap;
