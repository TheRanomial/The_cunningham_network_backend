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
exports.ZilliqaService = void 0;
const core_1 = require("@goat-sdk/core");
const crypto_1 = require("@zilliqa-js/crypto");
const util_1 = require("@zilliqa-js/util");
const viem = __importStar(require("viem"));
let ZilliqaService = (() => {
    let _instanceExtraInitializers = [];
    let _convertToBech32_decorators;
    let _convertFromBech32_decorators;
    let _transferFromEvmAddress_decorators;
    let _transferFromZilliqaAddress_decorators;
    let _getZilliqaAddressBalance_decorators;
    return class ZilliqaService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _convertToBech32_decorators = [(0, core_1.Tool)({
                    description: "Convert addresses from hex to bech32 format",
                })];
            _convertFromBech32_decorators = [(0, core_1.Tool)({
                    description: "Convert addresses from bech32 to hex format",
                })];
            _transferFromEvmAddress_decorators = [(0, core_1.Tool)({
                    description: "Transfer ZIL from an EVM address to another EVM or Zilliqa address, in either hex or bech32 format.",
                })];
            _transferFromZilliqaAddress_decorators = [(0, core_1.Tool)({
                    description: "Transfer ZIL from a Zilliqa address to another EVM or Zilliqa address, in either hex or bech32 format.",
                })];
            _getZilliqaAddressBalance_decorators = [(0, core_1.Tool)({
                    description: "Return the balance of a bech32 address, or an EVM address. A bech32 address starts with 'zil'. An EVM address starts with '0x'",
                })];
            __esDecorate(this, null, _convertToBech32_decorators, { kind: "method", name: "convertToBech32", static: false, private: false, access: { has: obj => "convertToBech32" in obj, get: obj => obj.convertToBech32 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _convertFromBech32_decorators, { kind: "method", name: "convertFromBech32", static: false, private: false, access: { has: obj => "convertFromBech32" in obj, get: obj => obj.convertFromBech32 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _transferFromEvmAddress_decorators, { kind: "method", name: "transferFromEvmAddress", static: false, private: false, access: { has: obj => "transferFromEvmAddress" in obj, get: obj => obj.transferFromEvmAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _transferFromZilliqaAddress_decorators, { kind: "method", name: "transferFromZilliqaAddress", static: false, private: false, access: { has: obj => "transferFromZilliqaAddress" in obj, get: obj => obj.transferFromZilliqaAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getZilliqaAddressBalance_decorators, { kind: "method", name: "getZilliqaAddressBalance", static: false, private: false, access: { has: obj => "getZilliqaAddressBalance" in obj, get: obj => obj.getZilliqaAddressBalance }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async convertToBech32(zilliqa, address) {
            return (0, crypto_1.toBech32Address)(address.address);
        }
        async convertFromBech32(zilliqa, address) {
            return (0, crypto_1.fromBech32Address)(address.address);
        }
        async transferFromEvmAddress(zilliqa, transferParameters) {
            try {
                const hexToAddress = util_1.validation.isBech32(transferParameters.toAddress)
                    ? (0, crypto_1.fromBech32Address)(transferParameters.toAddress)
                    : transferParameters.toAddress;
                const summed = viem.getAddress(hexToAddress);
                const amount = viem.parseEther(transferParameters.amount);
                const tx = await zilliqa.getEVM().sendTransaction({
                    to: summed,
                    value: amount,
                });
                return tx.hash;
            }
            catch (error) {
                throw new Error(`Failed to send ZIL: ${error}`);
            }
        }
        async transferFromZilliqaAddress(zilliqa, transferParameters) {
            // Make sure the toaddress is formatted correctly.
            const hexToAddress = util_1.validation.isBech32(transferParameters.toAddress)
                ? (0, crypto_1.fromBech32Address)(transferParameters.toAddress)
                : transferParameters.toAddress;
            const summed = (0, crypto_1.toChecksumAddress)(hexToAddress);
            const api = zilliqa.getZilliqa();
            const chainId = zilliqa.getZilliqaChainId();
            const version = (chainId << 16) | 1;
            try {
                // Transfer costs are fixed for the Zilliqa native API - and gas estimation in Zilliqa native is
                // in any case something of a black art.
                // TODO: Programmable gas fees and limits.
                const tx = await api.blockchain.createTransaction(api.transactions.new({
                    toAddr: summed,
                    amount: util_1.units.toQa(transferParameters.amount, util_1.units.Units.Zil),
                    gasPrice: new util_1.BN("2000000000"),
                    gasLimit: new util_1.Long(50),
                    version: version,
                }));
                if (tx.isConfirmed()) {
                    return `the transfer succeeded with transaction id ${tx.id}`;
                }
                if (tx.isRejected()) {
                    return "the transfer failed and no ZIL was transferred";
                }
                return "the transfer timed out and probably did not succeed";
            }
            catch (e) {
                throw new Error(`an error occurred and the transfer probably did not succeed - ${e}`);
            }
        }
        async getZilliqaAddressBalance(zilliqa, address) {
            const result = await zilliqa.getZilliqa().blockchain.getBalance(address.address);
            let value = "0";
            let nonce = "0";
            let comment = null;
            if (result?.error) {
                if (result.error?.code === -5) {
                    // Just continue - account not created; the defaults are correct.
                    comment = "This account has not yet been created so its balance is 0";
                }
                else {
                    return `An error occurred - ${result.error?.message}`;
                }
            }
            else {
                const innerResult = result?.result;
                value = innerResult?.balance;
                nonce = innerResult?.nonce;
            }
            const bal = {
                value: util_1.units.fromQa(new util_1.BN(value), util_1.units.Units.Zil),
                decimals: 12,
                symbol: "ZIL",
                name: "Zil",
                inBaseUnits: value,
                nonce: nonce,
                comment: comment,
            };
            return bal;
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.ZilliqaService = ZilliqaService;
