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
exports.DexscreenerService = void 0;
const core_1 = require("@goat-sdk/core");
let DexscreenerService = (() => {
    let _instanceExtraInitializers = [];
    let _getPairsByChainAndPair_decorators;
    let _searchPairs_decorators;
    let _get_token_pairs_by_token_address_decorators;
    return class DexscreenerService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getPairsByChainAndPair_decorators = [(0, core_1.Tool)({
                    name: "dexscreener.get_pairs_by_chain_and_pair",
                    description: "Fetch pairs by chainId and pairId from Dexscreener",
                })];
            _searchPairs_decorators = [(0, core_1.Tool)({
                    name: "dexscreener.search_pairs",
                    description: "Search for DEX pairs matching a query string on Dexscreener",
                })];
            _get_token_pairs_by_token_address_decorators = [(0, core_1.Tool)({
                    name: "dexscreener.get_token_pairs_by_token_address",
                    description: "Get all DEX pairs for given token addresses (up to 30) from Dexscreener",
                })];
            __esDecorate(this, null, _getPairsByChainAndPair_decorators, { kind: "method", name: "getPairsByChainAndPair", static: false, private: false, access: { has: obj => "getPairsByChainAndPair" in obj, get: obj => obj.getPairsByChainAndPair }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _searchPairs_decorators, { kind: "method", name: "searchPairs", static: false, private: false, access: { has: obj => "searchPairs" in obj, get: obj => obj.searchPairs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_token_pairs_by_token_address_decorators, { kind: "method", name: "get_token_pairs_by_token_address", static: false, private: false, access: { has: obj => "get_token_pairs_by_token_address" in obj, get: obj => obj.get_token_pairs_by_token_address }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        baseUrl = (__runInitializers(this, _instanceExtraInitializers), "https://api.dexscreener.com/latest/dex");
        async fetchDexscreener(url, action) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return await response.json();
            }
            catch (error) {
                throw new Error(`Failed to ${action}: ${error}`);
            }
        }
        async getPairsByChainAndPair(parameters) {
            const url = `${this.baseUrl}/pairs/${parameters.chainId}/${parameters.pairId}`;
            return this.fetchDexscreener(url, "fetch pairs");
        }
        async searchPairs(parameters) {
            const url = `${this.baseUrl}/search?q=${encodeURIComponent(parameters.query)}`;
            return this.fetchDexscreener(url, "search pairs");
        }
        async get_token_pairs_by_token_address(parameters) {
            if (parameters.tokenAddresses.length > 30) {
                throw new Error("Maximum of 30 token addresses allowed per request");
            }
            const addresses = parameters.tokenAddresses.join(",");
            const url = `${this.baseUrl}/tokens/${addresses}`;
            return this.fetchDexscreener(url, "get token pairs");
        }
    };
})();
exports.DexscreenerService = DexscreenerService;
