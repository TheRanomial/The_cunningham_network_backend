"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeteoraService = void 0;
const core_1 = require("@goat-sdk/core");
const dlmm_1 = __importStar(require("@meteora-ag/dlmm"));
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = require("bn.js");
let MeteoraService = (() => {
    let _instanceExtraInitializers = [];
    let _createDLMMPosition_decorators;
    return class MeteoraService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createDLMMPosition_decorators = [(0, core_1.Tool)({
                    description: "Create a position on the Meteora DEX",
                })];
            __esDecorate(this, null, _createDLMMPosition_decorators, { kind: "method", name: "createDLMMPosition", static: false, private: false, access: { has: obj => "createDLMMPosition" in obj, get: obj => obj.createDLMMPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async createDLMMPosition(walletClient, parameters) {
            const newPosition = new web3_js_1.Keypair();
            const user = new web3_js_1.PublicKey(walletClient.getAddress());
            const dlmmPool = await this.getDLMM(walletClient, parameters.poolAddress);
            const activeBin = await this.getActiveBin(dlmmPool);
            const activeBinPricePerToken = Number(activeBin.pricePerToken);
            const TOKEN_X_DECIMALS = dlmmPool.tokenX.decimal;
            const TOKEN_Y_DECIMALS = dlmmPool.tokenY.decimal;
            const minBinId = activeBin.binId - 34;
            const maxBinId = activeBin.binId + 34;
            const totalXAmount = new bn_js_1.BN(Number(parameters.amount) * 10 ** TOKEN_X_DECIMALS);
            const totalYAmount = new bn_js_1.BN(Math.floor(Number(parameters.amount) * activeBinPricePerToken * 10 ** TOKEN_Y_DECIMALS));
            const createPositionTx = await dlmmPool.initializePositionAndAddLiquidityByStrategy({
                positionPubKey: newPosition.publicKey,
                user: user,
                totalXAmount,
                totalYAmount,
                strategy: {
                    maxBinId,
                    minBinId,
                    strategyType: dlmm_1.StrategyType.SpotBalanced,
                },
            });
            try {
                const { hash } = await walletClient.sendTransaction({
                    instructions: createPositionTx.instructions,
                    accountsToSign: [newPosition],
                });
                return hash;
            }
            catch (error) {
                throw new Error(`Failed to create position: ${JSON.stringify(error)}`);
            }
        }
        async getDLMM(walletClient, poolAddress) {
            const dlmmPool = await dlmm_1.default.create(walletClient.getConnection(), new web3_js_1.PublicKey(poolAddress));
            return dlmmPool;
        }
        async getActiveBin(dlmmPool) {
            const activeBin = await dlmmPool.getActiveBin();
            return activeBin;
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.MeteoraService = MeteoraService;
