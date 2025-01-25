"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinmarketcapPlugin = void 0;
exports.coinmarketcap = coinmarketcap;
const core_1 = require("@goat-sdk/core");
const coinmarketcap_service_1 = require("./coinmarketcap.service");
class CoinmarketcapPlugin extends core_1.PluginBase {
    options;
    constructor(options) {
        super("coinmarketcap", [new coinmarketcap_service_1.CoinmarketcapService(options.apiKey)]);
        this.options = options;
    }
    supportsChain(_chain) {
        // This plugin doesn't require specific chain support as it's an API wrapper
        return true;
    }
}
exports.CoinmarketcapPlugin = CoinmarketcapPlugin;
function coinmarketcap(options) {
    return new CoinmarketcapPlugin(options);
}
