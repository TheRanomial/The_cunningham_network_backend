"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinGeckoProService = void 0;
const core_1 = require("@goat-sdk/core");
const coingecko_service_1 = require("./coingecko.service");
let CoinGeckoProService = (() => {
    let _classSuper = coingecko_service_1.CoinGeckoService;
    let _instanceExtraInitializers = [];
    let _getPoolDataByPoolAddress_decorators;
    let _getTrendingPools_decorators;
    let _getTrendingPoolsByNetwork_decorators;
    let _getTopGainersLosers_decorators;
    let _getTokenDataByTokenAddress_decorators;
    let _getTokensInfoByPoolAddress_decorators;
    return class CoinGeckoProService extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _getPoolDataByPoolAddress_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_pool_data_by_pool_address",
                    description: "Get data for a specific pool by its address",
                })];
            _getTrendingPools_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_trending_pools",
                    description: "Get trending pools for a specific network",
                })];
            _getTrendingPoolsByNetwork_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_trending_pools_by_network",
                    description: "Get trending pools for a specific network",
                })];
            _getTopGainersLosers_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_top_gainers_losers",
                    description: "Get top gainers and losers for a specific duration",
                })];
            _getTokenDataByTokenAddress_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_token_data_by_token_address",
                    description: "Get data for a specific token by its address",
                })];
            _getTokensInfoByPoolAddress_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_tokens_info_by_pool_address",
                    description: "Get data for all tokens in a specific pool by its address",
                })];
            __esDecorate(this, null, _getPoolDataByPoolAddress_decorators, { kind: "method", name: "getPoolDataByPoolAddress", static: false, private: false, access: { has: obj => "getPoolDataByPoolAddress" in obj, get: obj => obj.getPoolDataByPoolAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTrendingPools_decorators, { kind: "method", name: "getTrendingPools", static: false, private: false, access: { has: obj => "getTrendingPools" in obj, get: obj => obj.getTrendingPools }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTrendingPoolsByNetwork_decorators, { kind: "method", name: "getTrendingPoolsByNetwork", static: false, private: false, access: { has: obj => "getTrendingPoolsByNetwork" in obj, get: obj => obj.getTrendingPoolsByNetwork }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTopGainersLosers_decorators, { kind: "method", name: "getTopGainersLosers", static: false, private: false, access: { has: obj => "getTopGainersLosers" in obj, get: obj => obj.getTopGainersLosers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenDataByTokenAddress_decorators, { kind: "method", name: "getTokenDataByTokenAddress", static: false, private: false, access: { has: obj => "getTokenDataByTokenAddress" in obj, get: obj => obj.getTokenDataByTokenAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokensInfoByPoolAddress_decorators, { kind: "method", name: "getTokensInfoByPoolAddress", static: false, private: false, access: { has: obj => "getTokensInfoByPoolAddress" in obj, get: obj => obj.getTokensInfoByPoolAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async getPoolDataByPoolAddress(parameters) {
            const { network, addresses } = parameters;
            return this.api.request(`coins/${network}/pools/multi/${addresses.join(",")}`, {});
        }
        async getTrendingPools(parameters) {
            const { include, page, duration } = parameters;
            return this.api.request("onchain/networks/trending_pools", {
                include: include.join(","),
                page,
                duration,
            });
        }
        async getTrendingPoolsByNetwork(parameters) {
            const { network } = parameters;
            return this.api.request(`onchain/networks/${network}/trending_pools`, {});
        }
        async getTopGainersLosers(parameters) {
            const { vsCurrency, duration, topCoins } = parameters;
            return this.api.request("coins/top_gainers_losers", {
                vs_currency: vsCurrency,
                duration,
                top_coins: topCoins,
            });
        }
        async getTokenDataByTokenAddress(parameters) {
            const { network, address } = parameters;
            return this.api.request(`onchain/networks/${network}/tokens/${address}/info`, {});
        }
        async getTokensInfoByPoolAddress(parameters) {
            const { network, poolAddress } = parameters;
            return this.api.request(`onchain/networks/${network}/pools/${poolAddress}/tokens`, {});
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.CoinGeckoProService = CoinGeckoProService;
