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
exports.BirdeyeDefiService = void 0;
const core_1 = require("@goat-sdk/core");
let BirdeyeDefiService = (() => {
    let _instanceExtraInitializers = [];
    let _getTokenPrice_decorators;
    let _getTokenHistoryPrice_decorators;
    let _getOhlcv_decorators;
    let _getOhlcvPair_decorators;
    let _getTokenSecurity_decorators;
    let _getTrendingTokens_decorators;
    let _searchToken_decorators;
    return class BirdeyeDefiService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getTokenPrice_decorators = [(0, core_1.Tool)({
                    name: "birdeye.get_token_price",
                    description: "Get price information for a token or multiple tokens (max 100)",
                })];
            _getTokenHistoryPrice_decorators = [(0, core_1.Tool)({
                    name: "birdeye.get_token_history_price",
                    description: "Get historical price line chart for a token",
                })];
            _getOhlcv_decorators = [(0, core_1.Tool)({
                    name: "birdeye.get_ohlcv",
                    description: "Get OHLCV price of token",
                })];
            _getOhlcvPair_decorators = [(0, core_1.Tool)({
                    name: "birdeye.get_ohlcv_pair",
                    description: "Get OHLCV price of pair",
                })];
            _getTokenSecurity_decorators = [(0, core_1.Tool)({
                    name: "birdeye.get_token_security",
                    description: "Get security information of a token",
                })];
            _getTrendingTokens_decorators = [(0, core_1.Tool)({
                    name: "birdeye.get_trending_tokens",
                    description: "Get trending tokens",
                })];
            _searchToken_decorators = [(0, core_1.Tool)({
                    name: "birdeye.search_token",
                    description: "Search for a token",
                })];
            __esDecorate(this, null, _getTokenPrice_decorators, { kind: "method", name: "getTokenPrice", static: false, private: false, access: { has: obj => "getTokenPrice" in obj, get: obj => obj.getTokenPrice }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenHistoryPrice_decorators, { kind: "method", name: "getTokenHistoryPrice", static: false, private: false, access: { has: obj => "getTokenHistoryPrice" in obj, get: obj => obj.getTokenHistoryPrice }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getOhlcv_decorators, { kind: "method", name: "getOhlcv", static: false, private: false, access: { has: obj => "getOhlcv" in obj, get: obj => obj.getOhlcv }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getOhlcvPair_decorators, { kind: "method", name: "getOhlcvPair", static: false, private: false, access: { has: obj => "getOhlcvPair" in obj, get: obj => obj.getOhlcvPair }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenSecurity_decorators, { kind: "method", name: "getTokenSecurity", static: false, private: false, access: { has: obj => "getTokenSecurity" in obj, get: obj => obj.getTokenSecurity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTrendingTokens_decorators, { kind: "method", name: "getTrendingTokens", static: false, private: false, access: { has: obj => "getTrendingTokens" in obj, get: obj => obj.getTrendingTokens }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _searchToken_decorators, { kind: "method", name: "searchToken", static: false, private: false, access: { has: obj => "searchToken" in obj, get: obj => obj.searchToken }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        birdeyeApi = __runInitializers(this, _instanceExtraInitializers);
        constructor(birdeyeApi) {
            this.birdeyeApi = birdeyeApi;
        }
        async getTokenPrice(params) {
            const endpoint = `/defi/multi_price?&addresses=${params.list_address.join(",")}${params.include_liquidity ? "&include_liquidity=true" : ""}`;
            const response = await this.birdeyeApi.makeRequest(endpoint, params.chain);
            return response;
        }
        async getTokenHistoryPrice(params) {
            // except chain, transform all params in query string
            const queryString = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .filter(([key]) => key !== "chain")
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const endpoint = `/defi/history_price?${queryString}`;
            const response = await this.birdeyeApi.makeRequest(endpoint, params.chain);
            return response;
        }
        async getOhlcv(params) {
            const queryString = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .filter(([key]) => key !== "chain")
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const endpoint = `/defi/ohlcv?${queryString}`;
            const response = await this.birdeyeApi.makeRequest(endpoint, params.chain);
            return response;
        }
        async getOhlcvPair(params) {
            const queryString = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .filter(([key]) => key !== "chain")
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const endpoint = `/defi/ohlcv/pair?${queryString}`;
            const response = await this.birdeyeApi.makeRequest(endpoint);
            return response;
        }
        async getTokenSecurity(params) {
            const endpoint = `/defi/token_security?address=${params.address}`;
            const response = await this.birdeyeApi.makeRequest(endpoint, params.chain);
            return response;
        }
        async getTrendingTokens(params) {
            const queryString = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .filter(([key]) => key !== "chain")
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const endpoint = `/defi/trending_tokens?${queryString}`;
            const response = await this.birdeyeApi.makeRequest(endpoint, params.chain);
            return response;
        }
        async searchToken(params) {
            const queryString = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const endpoint = `/defi/v3/search?${queryString}`;
            const response = await this.birdeyeApi.makeRequest(endpoint, params.chain);
            return response;
        }
    };
})();
exports.BirdeyeDefiService = BirdeyeDefiService;
