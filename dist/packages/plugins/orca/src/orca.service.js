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
exports.OrcaService = exports.FEE_TIERS = void 0;
const core_1 = require("@goat-sdk/core");
const closePosition_1 = require("./tools/closePosition");
const createCLMM_1 = require("./tools/createCLMM");
const createSingleSidedPool_1 = require("./tools/createSingleSidedPool");
const fetchPositionsByOwner_1 = require("./tools/fetchPositionsByOwner");
const openCenteredPosition_1 = require("./tools/openCenteredPosition");
const openSingleSidedPosition_1 = require("./tools/openSingleSidedPosition");
exports.FEE_TIERS = {
    0.01: 1,
    0.02: 2,
    0.04: 4,
    0.05: 8,
    0.16: 16,
    0.3: 64,
    0.65: 96,
    1.0: 128,
    2.0: 256,
};
let OrcaService = (() => {
    let _instanceExtraInitializers = [];
    let _closePosition_decorators;
    let _createCLMM_decorators;
    let _createSingleSidedPool_decorators;
    let _fetchPositionsByOwner_decorators;
    let _openCenteredPosition_decorators;
    let _openSingleSidedPosition_decorators;
    return class OrcaService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _closePosition_decorators = [(0, core_1.Tool)({
                    description: "Closes a Liquidity Position in an Orca Whirlpool.",
                })];
            _createCLMM_decorators = [(0, core_1.Tool)({
                    description: "Create a concentrated liquidity market maker (CLMM) pool on Orca. This function only initializes a new account with the pool state, but does not open a position with liquidity yet.",
                })];
            _createSingleSidedPool_decorators = [(0, core_1.Tool)({
                    description: "Create a single-sided liquidity pool on the Orca DEX. This function initializes a new pool with liquidity contributed from a single token, allowing users to define an initial price, a maximum price, and other parameters. The function ensures proper mint order and on-chain configuration for seamless execution. Ideal for setting up a pool with minimal price impact, it supports advanced features like adjustable fee tiers and precise initial price settings.",
                })];
            _fetchPositionsByOwner_decorators = [(0, core_1.Tool)({
                    description: "Fetches Liquidity Position by owner and returns if the positions are in range and the distance from the current price to the center price of the position in bps.",
                })];
            _openCenteredPosition_decorators = [(0, core_1.Tool)({
                    description: "Add liquidity to a CLMM by opening a centered position in an Orca Whirlpool, the most efficient liquidity pool on Solana.",
                })];
            _openSingleSidedPosition_decorators = [(0, core_1.Tool)({
                    description: "Add liquidity to a CLMM by opening a single-sided position in an Orca Whirlpool, the most efficient liquidity pool on Solana.",
                })];
            __esDecorate(this, null, _closePosition_decorators, { kind: "method", name: "closePosition", static: false, private: false, access: { has: obj => "closePosition" in obj, get: obj => obj.closePosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createCLMM_decorators, { kind: "method", name: "createCLMM", static: false, private: false, access: { has: obj => "createCLMM" in obj, get: obj => obj.createCLMM }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createSingleSidedPool_decorators, { kind: "method", name: "createSingleSidedPool", static: false, private: false, access: { has: obj => "createSingleSidedPool" in obj, get: obj => obj.createSingleSidedPool }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _fetchPositionsByOwner_decorators, { kind: "method", name: "fetchPositionsByOwner", static: false, private: false, access: { has: obj => "fetchPositionsByOwner" in obj, get: obj => obj.fetchPositionsByOwner }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _openCenteredPosition_decorators, { kind: "method", name: "openCenteredPosition", static: false, private: false, access: { has: obj => "openCenteredPosition" in obj, get: obj => obj.openCenteredPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _openSingleSidedPosition_decorators, { kind: "method", name: "openSingleSidedPosition", static: false, private: false, access: { has: obj => "openSingleSidedPosition" in obj, get: obj => obj.openSingleSidedPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async closePosition(walletClient, parameters) {
            return await (0, closePosition_1.closePosition)(walletClient, parameters);
        }
        async createCLMM(walletClient, parameters) {
            return await (0, createCLMM_1.createCLMM)(walletClient, parameters);
        }
        async createSingleSidedPool(walletClient, parameters) {
            return await (0, createSingleSidedPool_1.createSingleSidedPool)(walletClient, parameters);
        }
        async fetchPositionsByOwner(walletClient, parameters) {
            return await (0, fetchPositionsByOwner_1.fetchPositionsByOwner)(walletClient, parameters);
        }
        async openCenteredPosition(walletClient, parameters) {
            return await (0, openCenteredPosition_1.openCenteredPosition)(walletClient, parameters);
        }
        async openSingleSidedPosition(walletClient, parameters) {
            return await (0, openSingleSidedPosition_1.openSingleSidedPosition)(walletClient, parameters);
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.OrcaService = OrcaService;
