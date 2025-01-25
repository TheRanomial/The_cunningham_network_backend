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
exports.JupiterService = void 0;
const core_1 = require("@goat-sdk/core");
const api_1 = require("@jup-ag/api");
const web3_js_1 = require("@solana/web3.js");
let JupiterService = (() => {
    let _instanceExtraInitializers = [];
    let _getQuote_decorators;
    let _swapTokens_decorators;
    return class JupiterService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getQuote_decorators = [(0, core_1.Tool)({
                    description: "Get a quote for a swap on the Jupiter DEX",
                })];
            _swapTokens_decorators = [(0, core_1.Tool)({
                    description: "Swap an SPL token for another token on the Jupiter DEX",
                })];
            __esDecorate(this, null, _getQuote_decorators, { kind: "method", name: "getQuote", static: false, private: false, access: { has: obj => "getQuote" in obj, get: obj => obj.getQuote }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _swapTokens_decorators, { kind: "method", name: "swapTokens", static: false, private: false, access: { has: obj => "swapTokens" in obj, get: obj => obj.swapTokens }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        jupiterApiClient = __runInitializers(this, _instanceExtraInitializers);
        constructor() {
            this.jupiterApiClient = (0, api_1.createJupiterApiClient)();
        }
        async getQuote(parameters) {
            try {
                const response = this.jupiterApiClient.quoteGet(parameters);
                return response;
            }
            catch (error) {
                if (error && typeof error === "object" && "response" in error) {
                    const response = error.response;
                    const result = await response.json();
                    throw new Error(`Failed to get quote: ${result.error}`);
                }
                throw error;
            }
        }
        async swapTokens(walletClient, parameters) {
            const quoteResponse = await this.getQuote(parameters);
            const { swapTransaction } = await this.jupiterApiClient.swapPost({
                swapRequest: {
                    userPublicKey: walletClient.getAddress(),
                    quoteResponse: quoteResponse,
                    dynamicComputeUnitLimit: true,
                    prioritizationFeeLamports: "auto",
                },
            });
            const versionedTransaction = web3_js_1.VersionedTransaction.deserialize(Buffer.from(swapTransaction, "base64"));
            const instructions = await walletClient.decompileVersionedTransactionToInstructions(versionedTransaction);
            const { hash } = await walletClient.sendTransaction({
                instructions,
                addressLookupTableAddresses: versionedTransaction.message.addressTableLookups.map((lookup) => lookup.accountKey.toBase58()),
            });
            return {
                hash,
            };
        }
    };
})();
exports.JupiterService = JupiterService;
