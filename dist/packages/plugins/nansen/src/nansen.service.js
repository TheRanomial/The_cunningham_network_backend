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
exports.NansenService = void 0;
const core_1 = require("@goat-sdk/core");
let NansenService = (() => {
    let _instanceExtraInitializers = [];
    let _getTokenDetails_decorators;
    let _getTokenTrades_decorators;
    let _getNFTDetails_decorators;
    let _getNFTTrades_decorators;
    let _getSmartMoneyStatus_decorators;
    let _getTradingSignal_decorators;
    return class NansenService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getTokenDetails_decorators = [(0, core_1.Tool)({
                    name: "nansen.getTokenDetails",
                    description: "Get details for a specific token from Nansen",
                })];
            _getTokenTrades_decorators = [(0, core_1.Tool)({
                    name: "nansen.getTokenTrades",
                    description: "Get trades for a specific token from Nansen",
                })];
            _getNFTDetails_decorators = [(0, core_1.Tool)({
                    name: "nansen.getNFTDetails",
                    description: "Get details for a specific NFT collection or token from Nansen",
                })];
            _getNFTTrades_decorators = [(0, core_1.Tool)({
                    name: "nansen.getNFTTrades",
                    description: "Get trades for a specific NFT collection or token from Nansen",
                })];
            _getSmartMoneyStatus_decorators = [(0, core_1.Tool)({
                    description: "Get the flows of tokens associated with smart money addresses",
                })];
            _getTradingSignal_decorators = [(0, core_1.Tool)({
                    name: "nansen.getTradingSignal",
                    description: "Get trading signals and alerts based on onchain data and patterns",
                })];
            __esDecorate(this, null, _getTokenDetails_decorators, { kind: "method", name: "getTokenDetails", static: false, private: false, access: { has: obj => "getTokenDetails" in obj, get: obj => obj.getTokenDetails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenTrades_decorators, { kind: "method", name: "getTokenTrades", static: false, private: false, access: { has: obj => "getTokenTrades" in obj, get: obj => obj.getTokenTrades }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getNFTDetails_decorators, { kind: "method", name: "getNFTDetails", static: false, private: false, access: { has: obj => "getNFTDetails" in obj, get: obj => obj.getNFTDetails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getNFTTrades_decorators, { kind: "method", name: "getNFTTrades", static: false, private: false, access: { has: obj => "getNFTTrades" in obj, get: obj => obj.getNFTTrades }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSmartMoneyStatus_decorators, { kind: "method", name: "getSmartMoneyStatus", static: false, private: false, access: { has: obj => "getSmartMoneyStatus" in obj, get: obj => obj.getSmartMoneyStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTradingSignal_decorators, { kind: "method", name: "getTradingSignal", static: false, private: false, access: { has: obj => "getTradingSignal" in obj, get: obj => obj.getTradingSignal }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _instanceExtraInitializers);
        constructor(apiKey) {
            this.apiKey = apiKey;
        }
        async fetchNansen(endpoint) {
            const response = await fetch(`https://api.nansen.ai/v1${endpoint}`, {
                headers: {
                    accept: "application/json",
                    "api-key": this.apiKey,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        async getTokenDetails(parameters) {
            const { address } = parameters;
            return this.fetchNansen(`/token?address=${address}`);
        }
        async getTokenTrades(parameters) {
            const { address, start_date, end_date } = parameters;
            const queryParams = `?address=${address}&start_date=${start_date}&end_date=${end_date}`;
            return this.fetchNansen(`/token/dex_trades${queryParams}`);
        }
        async getNFTDetails(parameters) {
            const { token_address, nft_id } = parameters;
            const queryParams = `?token_address=${token_address}&nft_id=${nft_id}`;
            return this.fetchNansen(`/nft${queryParams}`);
        }
        async getNFTTrades(parameters) {
            const { token_address, nft_id, start_date, end_date } = parameters;
            const queryParams = `?token_address=${token_address}&nft_id=${nft_id}&start_date=${start_date}&end_date=${end_date}`;
            return this.fetchNansen(`/nft/trades${queryParams}`);
        }
        async getSmartMoneyStatus(parameters) {
            const { start_date, end_date, token_address } = parameters;
            const queryParams = `?start_date=${start_date}&end_date=${end_date}`;
            const tokenParam = token_address ? `&token_address=${token_address}` : "";
            return this.fetchNansen(`/token_flows${queryParams}${tokenParam}`);
        }
        async getTradingSignal(parameters) {
            const { start_date, end_date, token_address } = parameters;
            const queryParams = `?start_date=${start_date}&end_date=${end_date}`;
            const tokenParam = token_address ? `&token_address=${token_address}` : "";
            return this.fetchNansen(`/signals${queryParams}${tokenParam}`);
        }
    };
})();
exports.NansenService = NansenService;
