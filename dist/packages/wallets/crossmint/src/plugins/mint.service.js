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
exports.CrossmintMintService = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("../chains");
let CrossmintMintService = (() => {
    let _instanceExtraInitializers = [];
    let _createCollection_decorators;
    let _getAllCollections_decorators;
    let _mintNFT_decorators;
    return class CrossmintMintService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createCollection_decorators = [(0, core_1.Tool)({
                    description: "Create a new collection and return the id of the collection",
                })];
            _getAllCollections_decorators = [(0, core_1.Tool)({
                    description: "Get all collections created by the user",
                })];
            _mintNFT_decorators = [(0, core_1.Tool)({
                    description: "Mint an NFT to a recipient from a collection and return the transaction hash. Requires a collection ID of an already deployed collection.",
                })];
            __esDecorate(this, null, _createCollection_decorators, { kind: "method", name: "createCollection", static: false, private: false, access: { has: obj => "createCollection" in obj, get: obj => obj.createCollection }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAllCollections_decorators, { kind: "method", name: "getAllCollections", static: false, private: false, access: { has: obj => "getAllCollections" in obj, get: obj => obj.getAllCollections }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _mintNFT_decorators, { kind: "method", name: "mintNFT", static: false, private: false, access: { has: obj => "mintNFT" in obj, get: obj => obj.mintNFT }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        client = __runInitializers(this, _instanceExtraInitializers);
        constructor(client) {
            this.client = client;
        }
        async createCollection(walletClient, parameters) {
            // TODO: add chain as a parameter
            const response = await fetch(`${this.client.baseUrl}/api/2022-06-09/collections/`, {
                method: "POST",
                body: JSON.stringify({
                    ...parameters,
                    chain: (0, chains_1.getCrossmintChainString)(walletClient.getChain()),
                }),
                headers: {
                    ...this.client.authHeaders,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result.error) {
                throw new Error(result.message);
            }
            const { id, actionId } = result;
            const action = await this.waitForAction(actionId);
            const chain = (0, chains_1.getCrossmintChainString)(walletClient.getChain());
            return {
                collectionId: id,
                chain,
                contractAddress: action.data.collection.contractAddress,
            };
        }
        async getAllCollections(walletClient, parameters) {
            const response = await fetch(`${this.client.baseUrl}/api/2022-06-09/collections/`, {
                headers: {
                    ...this.client.authHeaders,
                    "Content-Type": "application/json",
                },
            });
            return await response.json();
        }
        async mintNFT(walletClient, parameters) {
            let recipient;
            // TODO: add chain as a parameter
            if (parameters.recipientType === "email") {
                recipient = `email:${parameters.recipient}:${(0, chains_1.getCrossmintChainString)(walletClient.getChain())}`;
            }
            else {
                recipient = `${(0, chains_1.getCrossmintChainString)(walletClient.getChain())}:${parameters.recipient}`;
            }
            const response = await fetch(`${this.client.baseUrl}/api/2022-06-09/collections/${parameters.collectionId}/nfts`, {
                method: "POST",
                body: JSON.stringify({
                    recipient,
                    metadata: parameters.metadata,
                }),
                headers: {
                    ...this.client.authHeaders,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result.error) {
                throw new Error(result.message);
            }
            const { id, actionId, onChain } = result;
            const action = await this.waitForAction(actionId);
            return {
                id: id,
                collectionId: parameters.collectionId,
                contractAddress: onChain.contractAddress,
                chain: action.data.chain,
            };
        }
        async waitForAction(actionId) {
            let attempts = 0;
            while (true) {
                attempts++;
                const response = await fetch(`${this.client.baseUrl}/api/2022-06-09/actions/${actionId}`, {
                    headers: {
                        ...this.client.authHeaders,
                        "Content-Type": "application/json",
                    },
                });
                const body = await response.json();
                if (response.status === 200 && body.status === "succeeded") {
                    return body;
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (attempts >= 60) {
                    throw new Error(`Timed out waiting for action ${actionId} after ${attempts} attempts`);
                }
            }
        }
    };
})();
exports.CrossmintMintService = CrossmintMintService;
