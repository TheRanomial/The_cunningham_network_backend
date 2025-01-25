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
exports.UniswapService = void 0;
const core_1 = require("@goat-sdk/core");
let UniswapService = (() => {
    let _instanceExtraInitializers = [];
    let _checkApproval_decorators;
    let _getQuote_decorators;
    let _getSwapTransaction_decorators;
    return class UniswapService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _checkApproval_decorators = [(0, core_1.Tool)({
                    name: "uniswap_check_approval",
                    description: "Check if the wallet has enough approval for a token and return the transaction to approve the token. The approval must takes place before the swap transaction",
                })];
            _getQuote_decorators = [(0, core_1.Tool)({
                    name: "uniswap_get_quote",
                    description: "Get the quote for a swap",
                })];
            _getSwapTransaction_decorators = [(0, core_1.Tool)({
                    name: "uniswap_swap_tokens",
                    description: "Swap tokens on Uniswap",
                })];
            __esDecorate(this, null, _checkApproval_decorators, { kind: "method", name: "checkApproval", static: false, private: false, access: { has: obj => "checkApproval" in obj, get: obj => obj.checkApproval }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getQuote_decorators, { kind: "method", name: "getQuote", static: false, private: false, access: { has: obj => "getQuote" in obj, get: obj => obj.getQuote }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSwapTransaction_decorators, { kind: "method", name: "getSwapTransaction", static: false, private: false, access: { has: obj => "getSwapTransaction" in obj, get: obj => obj.getSwapTransaction }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        params = __runInitializers(this, _instanceExtraInitializers);
        constructor(params) {
            this.params = params;
        }
        async makeRequest(endpoint, parameters) {
            const url = new URL(`${this.params.baseUrl}/${endpoint}`);
            const response = await fetch(url.toString(), {
                method: "POST",
                body: JSON.stringify(parameters),
                headers: {
                    "x-api-key": this.params.apiKey,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch ${endpoint}: ${JSON.stringify(await response.json(), null, 2)}`);
            }
            return response.json();
        }
        async checkApproval(walletClient, parameters) {
            const data = await this.makeRequest("check_approval", {
                token: parameters.token,
                amount: parameters.amount,
                walletAddress: parameters.walletAddress,
                chainId: walletClient.getChain().id,
            });
            const approval = data.approval;
            if (!approval) {
                return {
                    status: "approved",
                };
            }
            const transaction = await walletClient.sendTransaction({
                to: approval.to,
                value: approval.value,
                data: approval.data,
            });
            return {
                status: "approved",
                txHash: transaction.hash,
            };
        }
        async getQuote(walletClient, parameters) {
            return this.makeRequest("quote", {
                ...parameters,
                tokenInChainId: walletClient.getChain().id,
                tokenOutChainId: parameters.tokenOutChainId ?? walletClient.getChain().id,
                swapper: walletClient.getAddress(),
            });
        }
        async getSwapTransaction(walletClient, parameters) {
            const quote = await this.getQuote(walletClient, parameters);
            const response = await this.makeRequest("swap", {
                quote: quote.quote,
            });
            const swap = response.swap;
            const transaction = await walletClient.sendTransaction({
                to: swap.to,
                value: swap.value,
                data: swap.data,
            });
            return {
                txHash: transaction.hash,
            };
        }
    };
})();
exports.UniswapService = UniswapService;
