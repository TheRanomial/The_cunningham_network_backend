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
exports.SolanaNftsService = void 0;
const core_1 = require("@goat-sdk/core");
const mpl_bubblegum_1 = require("@metaplex-foundation/mpl-bubblegum");
const mpl_bubblegum_2 = require("@metaplex-foundation/mpl-bubblegum");
const mpl_bubblegum_3 = require("@metaplex-foundation/mpl-bubblegum");
const umi_1 = require("@metaplex-foundation/umi");
const umi_bundle_defaults_1 = require("@metaplex-foundation/umi-bundle-defaults");
const umi_web3js_adapters_1 = require("@metaplex-foundation/umi-web3js-adapters");
let SolanaNftsService = (() => {
    let _instanceExtraInitializers = [];
    let _transferNFT_decorators;
    return class SolanaNftsService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _transferNFT_decorators = [(0, core_1.Tool)({
                    description: "Send an NFT from your wallet to another address",
                })];
            __esDecorate(this, null, _transferNFT_decorators, { kind: "method", name: "transferNFT", static: false, private: false, access: { has: obj => "transferNFT" in obj, get: obj => obj.transferNFT }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async transferNFT(walletClient, parameters) {
            const { recipientAddress, assetId } = parameters;
            const umi = (0, umi_bundle_defaults_1.createUmi)(walletClient.getConnection());
            const bubbleGumUni = umi.use((0, mpl_bubblegum_3.mplBubblegum)());
            const assetWithProof = await (0, mpl_bubblegum_2.getAssetWithProof)(umi, (0, umi_1.publicKey)(assetId), {
                truncateCanopy: true,
            });
            const instructions = (0, mpl_bubblegum_1.transfer)(bubbleGumUni, {
                ...assetWithProof,
                leafOwner: (0, umi_1.publicKey)(walletClient.getAddress()),
                newLeafOwner: (0, umi_1.publicKey)(recipientAddress),
            }).getInstructions();
            const result = await walletClient.sendTransaction({
                instructions: instructions.map(umi_web3js_adapters_1.toWeb3JsInstruction),
            });
            return result.hash;
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.SolanaNftsService = SolanaNftsService;
