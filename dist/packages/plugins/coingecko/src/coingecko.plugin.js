"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinGeckoPlugin = void 0;
exports.coingecko = coingecko;
const core_1 = require("@goat-sdk/core");
const api_1 = require("./api");
const coingecko_service_1 = require("./coingecko.service");
const pro_service_1 = require("./pro.service");
class CoinGeckoPlugin extends core_1.PluginBase {
    constructor({ apiKey, isPro = false }) {
        const api = new api_1.CoinGeckoAPI(apiKey, isPro);
        const commonService = new coingecko_service_1.CoinGeckoService(api);
        const services = [commonService];
        if (isPro) {
            services.push(new pro_service_1.CoinGeckoProService(api));
        }
        super("coingecko", services);
    }
    supportsChain = () => true;
}
exports.CoinGeckoPlugin = CoinGeckoPlugin;
function coingecko(options) {
    return new CoinGeckoPlugin(options);
}
