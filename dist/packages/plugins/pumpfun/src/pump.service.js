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
exports.PumpService = void 0;
const core_1 = require("@goat-sdk/core");
const web3_js_1 = require("@solana/web3.js");
let PumpService = (() => {
    let _instanceExtraInitializers = [];
    let _createAndBuyToken_decorators;
    return class PumpService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createAndBuyToken_decorators = [(0, core_1.Tool)({
                    description: "Create a token and buy it using pump.fun",
                })];
            __esDecorate(this, null, _createAndBuyToken_decorators, { kind: "method", name: "createAndBuyToken", static: false, private: false, access: { has: obj => "createAndBuyToken" in obj, get: obj => obj.createAndBuyToken }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async createAndBuyToken(walletClient, parameters) {
            const metadata = await this.createTokenMetadata({
                name: parameters.name,
                symbol: parameters.symbol,
                description: parameters.description,
                imageUrl: parameters.imageUrl,
            });
            const mint = web3_js_1.Keypair.generate();
            const response = await fetch("https://pumpportal.fun/api/trade-local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    publicKey: walletClient.getAddress(),
                    action: "create",
                    tokenMetadata: {
                        name: metadata.metadata.name,
                        symbol: metadata.metadata.symbol,
                        uri: metadata.metadataUri,
                    },
                    mint: mint.publicKey.toBase58(),
                    denominatedInSol: "true",
                    amount: parameters.amountToBuyInSol,
                    slippage: parameters.slippage,
                    priorityFee: parameters.priorityFee,
                    pool: "pump",
                }),
            });
            if (response.status !== 200) {
                throw new Error(`Failed to create token: ${response.statusText}`);
            }
            const data = await response.arrayBuffer();
            const tx = web3_js_1.VersionedTransaction.deserialize(new Uint8Array(data));
            const instructions = await walletClient.decompileVersionedTransactionToInstructions(tx);
            const { hash } = await walletClient.sendTransaction({
                instructions,
                accountsToSign: [mint],
            });
            return {
                hash,
                createdToken: mint.publicKey.toBase58(),
                creator: walletClient.getAddress(),
                url: `https://pump.fun/coin/${mint.publicKey.toBase58()}`,
            };
        }
        async createTokenMetadata(create) {
            // Download imageUrl and create file
            const image = await fetch(create.imageUrl).then((res) => res.blob());
            const file = new File([image], "image.png", { type: "image/png" });
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", create.name);
            formData.append("symbol", create.symbol);
            formData.append("description", create.description);
            formData.append("showName", "true");
            if (create.twitter) {
                formData.append("twitter", create.twitter);
            }
            if (create.telegram) {
                formData.append("telegram", create.telegram);
            }
            if (create.website) {
                formData.append("website", create.website);
            }
            const request = await fetch("https://pump.fun/api/ipfs", {
                method: "POST",
                body: formData,
            });
            return request.json();
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.PumpService = PumpService;
