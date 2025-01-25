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
exports.CoinmarketcapService = void 0;
const core_1 = require("@goat-sdk/core");
const api_1 = require("./api");
let CoinmarketcapService = (() => {
    let _instanceExtraInitializers = [];
    let _getCryptocurrencyListings_decorators;
    let _getCryptocurrencyQuotes_decorators;
    let _getExchangeListings_decorators;
    let _getExchangeQuotes_decorators;
    let _getContent_decorators;
    let _getCryptocurrencyMap_decorators;
    let _getCryptocurrencyOHLCV_decorators;
    let _getCryptocurrencyTrending_decorators;
    let _getCryptocurrencyMostVisited_decorators;
    let _getCryptocurrencyGainersLosers_decorators;
    return class CoinmarketcapService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getCryptocurrencyListings_decorators = [(0, core_1.Tool)({
                    description: "Fetch the latest cryptocurrency listings with market data including price, market cap, volume, and other key metrics",
                })];
            _getCryptocurrencyQuotes_decorators = [(0, core_1.Tool)({
                    description: "Get the latest market quotes for one or more cryptocurrencies, including price, market cap, and volume in any supported currency",
                })];
            _getExchangeListings_decorators = [(0, core_1.Tool)({
                    description: "Fetch the latest cryptocurrency exchange listings with market data including trading volume, number of markets, and liquidity metrics",
                })];
            _getExchangeQuotes_decorators = [(0, core_1.Tool)({
                    description: "Get the latest market data for one or more exchanges including trading volume, number of markets, and other exchange-specific metrics",
                })];
            _getContent_decorators = [(0, core_1.Tool)({
                    description: "Fetch the latest cryptocurrency news, articles, and market analysis content from trusted sources",
                })];
            _getCryptocurrencyMap_decorators = [(0, core_1.Tool)({
                    description: "Get a mapping of all cryptocurrencies with unique CoinMarketCap IDs, including active and inactive assets",
                })];
            _getCryptocurrencyOHLCV_decorators = [(0, core_1.Tool)({
                    description: "Get the latest OHLCV (Open, High, Low, Close, Volume) values for cryptocurrencies",
                })];
            _getCryptocurrencyTrending_decorators = [(0, core_1.Tool)({
                    description: "Get the latest trending cryptocurrencies based on CoinMarketCap user activity",
                })];
            _getCryptocurrencyMostVisited_decorators = [(0, core_1.Tool)({
                    description: "Get the most visited cryptocurrencies on CoinMarketCap over a specified time period",
                })];
            _getCryptocurrencyGainersLosers_decorators = [(0, core_1.Tool)({
                    description: "Get the top gaining and losing cryptocurrencies based on price changes over different time periods",
                })];
            __esDecorate(this, null, _getCryptocurrencyListings_decorators, { kind: "method", name: "getCryptocurrencyListings", static: false, private: false, access: { has: obj => "getCryptocurrencyListings" in obj, get: obj => obj.getCryptocurrencyListings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCryptocurrencyQuotes_decorators, { kind: "method", name: "getCryptocurrencyQuotes", static: false, private: false, access: { has: obj => "getCryptocurrencyQuotes" in obj, get: obj => obj.getCryptocurrencyQuotes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getExchangeListings_decorators, { kind: "method", name: "getExchangeListings", static: false, private: false, access: { has: obj => "getExchangeListings" in obj, get: obj => obj.getExchangeListings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getExchangeQuotes_decorators, { kind: "method", name: "getExchangeQuotes", static: false, private: false, access: { has: obj => "getExchangeQuotes" in obj, get: obj => obj.getExchangeQuotes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getContent_decorators, { kind: "method", name: "getContent", static: false, private: false, access: { has: obj => "getContent" in obj, get: obj => obj.getContent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCryptocurrencyMap_decorators, { kind: "method", name: "getCryptocurrencyMap", static: false, private: false, access: { has: obj => "getCryptocurrencyMap" in obj, get: obj => obj.getCryptocurrencyMap }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCryptocurrencyOHLCV_decorators, { kind: "method", name: "getCryptocurrencyOHLCV", static: false, private: false, access: { has: obj => "getCryptocurrencyOHLCV" in obj, get: obj => obj.getCryptocurrencyOHLCV }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCryptocurrencyTrending_decorators, { kind: "method", name: "getCryptocurrencyTrending", static: false, private: false, access: { has: obj => "getCryptocurrencyTrending" in obj, get: obj => obj.getCryptocurrencyTrending }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCryptocurrencyMostVisited_decorators, { kind: "method", name: "getCryptocurrencyMostVisited", static: false, private: false, access: { has: obj => "getCryptocurrencyMostVisited" in obj, get: obj => obj.getCryptocurrencyMostVisited }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCryptocurrencyGainersLosers_decorators, { kind: "method", name: "getCryptocurrencyGainersLosers", static: false, private: false, access: { has: obj => "getCryptocurrencyGainersLosers" in obj, get: obj => obj.getCryptocurrencyGainersLosers }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        api = __runInitializers(this, _instanceExtraInitializers);
        constructor(apiKey) {
            this.api = new api_1.CoinmarketcapApi(apiKey);
        }
        async getCryptocurrencyListings(parameters) {
            try {
                return await this.api.makeRequest("/v1/cryptocurrency/listings/latest", {
                    start: parameters.start,
                    limit: parameters.limit,
                    sort: parameters.sort,
                    sort_dir: parameters.sort_dir,
                    cryptocurrency_type: parameters.cryptocurrency_type,
                    tag: parameters.tag,
                    aux: parameters.aux?.join(","),
                    convert: parameters.convert,
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch cryptocurrency listings: ${error}`);
            }
        }
        async getCryptocurrencyQuotes(parameters) {
            try {
                return await this.api.makeRequest("/v2/cryptocurrency/quotes/latest", {
                    id: parameters.id?.join(","),
                    symbol: parameters.symbol?.join(","),
                    convert: parameters.convert,
                    aux: parameters.aux?.join(","),
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch cryptocurrency quotes: ${error}`);
            }
        }
        async getExchangeListings(parameters) {
            try {
                return await this.api.makeRequest("/v1/exchange/listings/latest", {
                    start: parameters.start,
                    limit: parameters.limit,
                    sort: parameters.sort,
                    sort_dir: parameters.sort_dir,
                    market_type: parameters.market_type,
                    aux: parameters.aux?.join(","),
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch exchange listings: ${error}`);
            }
        }
        async getExchangeQuotes(parameters) {
            try {
                return await this.api.makeRequest("/v1/exchange/quotes/latest", {
                    id: parameters.id?.join(","),
                    slug: parameters.slug?.join(","),
                    convert: parameters.convert,
                    aux: parameters.aux?.join(","),
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch exchange quotes: ${error}`);
            }
        }
        async getContent(parameters) {
            try {
                return await this.api.makeRequest("/v1/content/latest", {
                    start: parameters.start,
                    limit: parameters.limit,
                    id: parameters.id?.join(","),
                    slug: parameters.slug?.join(","),
                    symbol: parameters.symbol?.join(","),
                    news_type: parameters.news_type,
                    content_type: parameters.content_type,
                    category: parameters.category,
                    language: parameters.language,
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch content: ${error}`);
            }
        }
        async getCryptocurrencyMap(parameters) {
            try {
                return await this.api.makeRequest("/v1/cryptocurrency/map", {
                    listing_status: parameters.listing_status,
                    start: parameters.start,
                    limit: parameters.limit,
                    sort: parameters.sort,
                    symbol: parameters.symbol?.join(","),
                    aux: parameters.aux?.join(","),
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch cryptocurrency map: ${error}`);
            }
        }
        async getCryptocurrencyOHLCV(parameters) {
            try {
                return await this.api.makeRequest("/v2/cryptocurrency/ohlcv/latest", {
                    id: parameters.id?.join(","),
                    symbol: parameters.symbol?.join(","),
                    convert: parameters.convert,
                    convert_id: parameters.convert_id,
                    skip_invalid: parameters.skip_invalid,
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch cryptocurrency OHLCV data: ${error}`);
            }
        }
        async getCryptocurrencyTrending(parameters) {
            try {
                return await this.api.makeRequest("/cryptocurrency/trending/latest", {
                    start: parameters.start,
                    limit: parameters.limit,
                    time_period: parameters.time_period,
                    convert: parameters.convert,
                    convert_id: parameters.convert_id,
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch trending cryptocurrencies: ${error}`);
            }
        }
        async getCryptocurrencyMostVisited(parameters) {
            try {
                return await this.api.makeRequest("/cryptocurrency/trending/most-visited", {
                    start: parameters.start,
                    limit: parameters.limit,
                    time_period: parameters.time_period,
                    convert: parameters.convert,
                    convert_id: parameters.convert_id,
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch most visited cryptocurrencies: ${error}`);
            }
        }
        async getCryptocurrencyGainersLosers(parameters) {
            try {
                return await this.api.makeRequest("/cryptocurrency/trending/gainers-losers", {
                    start: parameters.start,
                    limit: parameters.limit,
                    time_period: parameters.time_period,
                    convert: parameters.convert,
                    convert_id: parameters.convert_id,
                    sort: parameters.sort,
                    sort_dir: parameters.sort_dir,
                });
            }
            catch (error) {
                throw new Error(`Failed to fetch cryptocurrency gainers and losers: ${error}`);
            }
        }
    };
})();
exports.CoinmarketcapService = CoinmarketcapService;
