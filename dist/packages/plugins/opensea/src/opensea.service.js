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
exports.OpenseaService = void 0;
const core_1 = require("@goat-sdk/core");
let OpenseaService = (() => {
    let _instanceExtraInitializers = [];
    let _getNftCollectionStatistics_decorators;
    let _getNftSales_decorators;
    return class OpenseaService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getNftCollectionStatistics_decorators = [(0, core_1.Tool)({
                    description: "Get NFT collection statistics",
                })];
            _getNftSales_decorators = [(0, core_1.Tool)({
                    description: "Get recent NFT Sales",
                })];
            __esDecorate(this, null, _getNftCollectionStatistics_decorators, { kind: "method", name: "getNftCollectionStatistics", static: false, private: false, access: { has: obj => "getNftCollectionStatistics" in obj, get: obj => obj.getNftCollectionStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getNftSales_decorators, { kind: "method", name: "getNftSales", static: false, private: false, access: { has: obj => "getNftSales" in obj, get: obj => obj.getNftSales }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _instanceExtraInitializers);
        constructor(apiKey) {
            this.apiKey = apiKey;
        }
        async getNftCollectionStatistics(parameters) {
            let nftCollectionStatistics;
            try {
                const response = await fetch(`https://api.opensea.io/api/v2/collections/${parameters.collectionSlug}/stats`, {
                    headers: {
                        accept: "application/json",
                        "x-api-key": this.apiKey,
                    },
                });
                nftCollectionStatistics = (await response.json());
            }
            catch (error) {
                throw new Error(`Failed to get NFT collection statistics: ${error}`);
            }
            return nftCollectionStatistics;
        }
        async getNftSales(parameters) {
            let nftSales;
            try {
                const response = await fetch(`https://api.opensea.io/api/v2/events/collection/${parameters.collectionSlug}?event_type=sale&limit=5`, {
                    headers: {
                        accept: "application/json",
                        "x-api-key": this.apiKey,
                    },
                });
                nftSales = (await response.json());
            }
            catch (error) {
                throw new Error(`Failed to get NFT sales: ${error}`);
            }
            return nftSales.asset_events.map((event) => {
                return {
                    name: event.nft.name,
                    seller: event.seller,
                    buyer: event.buyer,
                    price: Number(event.payment.quantity) / 10 ** 18,
                };
            });
        }
    };
})();
exports.OpenseaService = OpenseaService;
