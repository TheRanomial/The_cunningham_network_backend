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
exports.MagicEdenService = void 0;
const core_1 = require("@goat-sdk/core");
const web3_js_1 = require("@solana/web3.js");
let MagicEdenService = (() => {
    let _instanceExtraInitializers = [];
    let _getNftListings_decorators;
    let _getBuyListingTransaction_decorators;
    return class MagicEdenService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getNftListings_decorators = [(0, core_1.Tool)({
                    description: "Get information about an NFT from the Magic Eden API",
                })];
            _getBuyListingTransaction_decorators = [(0, core_1.Tool)({
                    description: "Buy an NFT from a listing from the Magic Eden API",
                })];
            __esDecorate(this, null, _getNftListings_decorators, { kind: "method", name: "getNftListings", static: false, private: false, access: { has: obj => "getNftListings" in obj, get: obj => obj.getNftListings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getBuyListingTransaction_decorators, { kind: "method", name: "getBuyListingTransaction", static: false, private: false, access: { has: obj => "getBuyListingTransaction" in obj, get: obj => obj.getBuyListingTransaction }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _instanceExtraInitializers);
        constructor(apiKey) {
            this.apiKey = apiKey;
        }
        async getNftListings(parameters) {
            let nftInfo;
            try {
                const response = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${parameters.mintHash}/listings
    `, {
                    headers: {
                        "Content-Type": "application/json",
                        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
                    },
                });
                nftInfo = (await response.json());
            }
            catch (error) {
                throw new Error(`Failed to get NFT listings: ${error}`);
            }
            return nftInfo[0];
        }
        async getBuyListingTransaction(walletClient, parameters) {
            const nftInfo = await this.getNftListings(parameters);
            const queryParams = new URLSearchParams({
                buyer: walletClient.getAddress(),
                seller: nftInfo.seller,
                tokenMint: parameters.mintHash,
                tokenATA: nftInfo.tokenAddress,
                price: nftInfo.price.toString(),
                ...(nftInfo.auctionHouse ? { auctionHouseAddress: nftInfo.auctionHouse } : {}),
            });
            let data;
            try {
                const response = await fetch(`https://api-mainnet.magiceden.dev/v2/instructions/buy_now?${queryParams.toString()}`, {
                    headers: {
                        "Content-Type": "application/json",
                        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
                    },
                });
                data = (await response.json());
            }
            catch (error) {
                throw new Error(`Failed to get buy listing transaction: ${error}`);
            }
            const versionedTransaction = web3_js_1.VersionedTransaction.deserialize(Buffer.from(data.v0.tx.data));
            const instructions = await walletClient.decompileVersionedTransactionToInstructions(versionedTransaction);
            const lookupTableAddresses = versionedTransaction.message.addressTableLookups.map((lookup) => lookup.accountKey.toString());
            const { hash } = await walletClient.sendTransaction({
                instructions,
                addressLookupTableAddresses: lookupTableAddresses,
            });
            return hash;
        }
    };
})();
exports.MagicEdenService = MagicEdenService;
