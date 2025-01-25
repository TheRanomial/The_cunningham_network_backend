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
exports.CrossmintFaucetService = exports.TopUpBalanceParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
const chains_1 = require("../chains");
class TopUpBalanceParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    wallet: zod_1.z.string().optional().describe("The address to top up the balance of"),
    amount: zod_1.z.number().min(1).max(100).describe("The amount of tokens to top up"),
})) {
}
exports.TopUpBalanceParameters = TopUpBalanceParameters;
let CrossmintFaucetService = (() => {
    let _instanceExtraInitializers = [];
    let _topUpUsdc_decorators;
    return class CrossmintFaucetService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _topUpUsdc_decorators = [(0, core_1.Tool)({
                    description: "Top up your USDC balance",
                })];
            __esDecorate(this, null, _topUpUsdc_decorators, { kind: "method", name: "topUpUsdc", static: false, private: false, access: { has: obj => "topUpUsdc" in obj, get: obj => obj.topUpUsdc }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        client = __runInitializers(this, _instanceExtraInitializers);
        constructor(client) {
            this.client = client;
        }
        async topUpUsdc(walletClient, parameters) {
            const wallet = parameters.wallet ?? walletClient.getAddress();
            const resolvedWalletAddress = await walletClient.resolveAddress(wallet);
            const network = walletClient.getChain();
            if (!network.id) {
                throw new Error("Network ID is required");
            }
            const chain = (0, chains_1.getTestnetChainNameById)(network.id);
            if (!chain) {
                throw new Error(`Failed to top up balance: Unsupported chain ${network}`);
            }
            const options = {
                method: "POST",
                headers: {
                    ...this.client.authHeaders,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: 10,
                    currency: "usdc",
                    chain,
                }),
            };
            console.log("options", options);
            const response = await fetch(`${this.client.baseUrl}/api/v1-alpha2/wallets/${resolvedWalletAddress}/balances`, options);
            if (response.ok) {
                return "Balance topped up successfully";
            }
            throw new Error(`Failed to top up balance: ${await response.text()}`);
        }
    };
})();
exports.CrossmintFaucetService = CrossmintFaucetService;
