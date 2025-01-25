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
exports.CoinGeckoService = void 0;
const core_1 = require("@goat-sdk/core");
let CoinGeckoService = (() => {
    let _instanceExtraInitializers = [];
    let _getTrendingCoins_decorators;
    let _getCoinPrices_decorators;
    let _searchCoins_decorators;
    let _getCoinPriceByContractAddress_decorators;
    let _getCoinData_decorators;
    let _getHistoricalData_decorators;
    let _getOHLCData_decorators;
    let _getTrendingCoinCategories_decorators;
    let _coinCategories_decorators;
    return class CoinGeckoService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getTrendingCoins_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_trending_coins",
                    description: "Get the list of trending coins from CoinGecko",
                })];
            _getCoinPrices_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_coin_prices",
                    description: "Get the prices of specific coins from CoinGecko",
                })];
            _searchCoins_decorators = [(0, core_1.Tool)({
                    name: "coingecko_search_coins",
                    description: "Search for coins by keyword",
                })];
            _getCoinPriceByContractAddress_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_coin_price_by_contract_address",
                    description: "Get coin price by contract address",
                })];
            _getCoinData_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_coin_data",
                    description: "Get detailed coin data by ID (including contract address, market data, community data, developer stats, and more)",
                })];
            _getHistoricalData_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_historical_data",
                    description: "Get historical data for a coin by ID",
                })];
            _getOHLCData_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_ohlc_data",
                    description: "Get OHLC chart data for a coin by ID",
                })];
            _getTrendingCoinCategories_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_trending_coin_categories",
                    description: "Get trending coin categories",
                })];
            _coinCategories_decorators = [(0, core_1.Tool)({
                    name: "coingecko_get_coin_categories",
                    description: "Get all coin categories",
                })];
            __esDecorate(this, null, _getTrendingCoins_decorators, { kind: "method", name: "getTrendingCoins", static: false, private: false, access: { has: obj => "getTrendingCoins" in obj, get: obj => obj.getTrendingCoins }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCoinPrices_decorators, { kind: "method", name: "getCoinPrices", static: false, private: false, access: { has: obj => "getCoinPrices" in obj, get: obj => obj.getCoinPrices }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _searchCoins_decorators, { kind: "method", name: "searchCoins", static: false, private: false, access: { has: obj => "searchCoins" in obj, get: obj => obj.searchCoins }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCoinPriceByContractAddress_decorators, { kind: "method", name: "getCoinPriceByContractAddress", static: false, private: false, access: { has: obj => "getCoinPriceByContractAddress" in obj, get: obj => obj.getCoinPriceByContractAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCoinData_decorators, { kind: "method", name: "getCoinData", static: false, private: false, access: { has: obj => "getCoinData" in obj, get: obj => obj.getCoinData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getHistoricalData_decorators, { kind: "method", name: "getHistoricalData", static: false, private: false, access: { has: obj => "getHistoricalData" in obj, get: obj => obj.getHistoricalData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getOHLCData_decorators, { kind: "method", name: "getOHLCData", static: false, private: false, access: { has: obj => "getOHLCData" in obj, get: obj => obj.getOHLCData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTrendingCoinCategories_decorators, { kind: "method", name: "getTrendingCoinCategories", static: false, private: false, access: { has: obj => "getTrendingCoinCategories" in obj, get: obj => obj.getTrendingCoinCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _coinCategories_decorators, { kind: "method", name: "coinCategories", static: false, private: false, access: { has: obj => "coinCategories" in obj, get: obj => obj.coinCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        api = __runInitializers(this, _instanceExtraInitializers);
        constructor(api) {
            this.api = api;
        }
        async getTrendingCoins(parameters) {
            return this.api.request("search/trending", {});
        }
        async getCoinPrices(parameters) {
            const { coinIds, vsCurrency, includeMarketCap, include24hrVol, include24hrChange, includeLastUpdatedAt } = parameters;
            return this.api.request("simple/price", {
                ids: coinIds.join(","),
                vs_currencies: vsCurrency,
                include_market_cap: includeMarketCap,
                include_24hr_vol: include24hrVol,
                include_24hr_change: include24hrChange,
                include_last_updated_at: includeLastUpdatedAt,
            });
        }
        async searchCoins(parameters) {
            const { query } = parameters;
            return this.api.request("search", {
                query,
            });
        }
        async getCoinPriceByContractAddress(parameters) {
            const { id, contractAddresses, vsCurrency, includeMarketCap, include24hrVol, include24hrChange, includeLastUpdatedAt, } = parameters;
            return this.api.request(`simple/token_price/${id}`, {
                contract_addresses: contractAddresses.join(","),
                vs_currencies: vsCurrency,
                include_market_cap: includeMarketCap,
                include_24hr_vol: include24hrVol,
                include_24hr_change: include24hrChange,
                include_last_updated_at: includeLastUpdatedAt,
            });
        }
        async getCoinData(parameters) {
            const { id, localization, tickers, marketData, communityData, developerData, sparkline } = parameters;
            return this.api.request(`coins/${id}`, {
                localization,
                tickers,
                market_data: marketData,
                community_data: communityData,
                developer_data: developerData,
                sparkline,
            });
        }
        async getHistoricalData(parameters) {
            const { id, date, localization } = parameters;
            return this.api.request(`coins/${id}/history`, {
                date,
                localization,
            });
        }
        async getOHLCData(parameters) {
            const { id, vsCurrency, days } = parameters;
            return this.api.request(`coins/${id}/ohlc`, {
                vs_currency: vsCurrency,
                days,
            });
        }
        async getTrendingCoinCategories(parameters) {
            const { vsCurrency, ids, category, order, perPage, page, sparkline, priceChangePercentage, locale } = parameters;
            return this.api.request("coins/markets", {
                vs_currency: vsCurrency,
                ids: ids.join(","),
                category,
                order,
                per_page: perPage,
                page,
                sparkline,
                price_change_percentage: priceChangePercentage,
                locale,
            });
        }
        async coinCategories(parameters) {
            return this.api.request("coins/categories", {});
        }
    };
})();
exports.CoinGeckoService = CoinGeckoService;
