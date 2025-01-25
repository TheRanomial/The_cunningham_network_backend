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
exports.BankService = void 0;
const core_1 = require("@goat-sdk/core");
const chain_registry_1 = require("chain-registry");
const query_1 = require("cosmjs-types/cosmos/bank/v1beta1/query");
let BankService = (() => {
    let _instanceExtraInitializers = [];
    let _tokenBalance_decorators;
    let _demonMetada_decorators;
    let _supplyOf_decorators;
    let _sendToken_decorators;
    return class BankService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _tokenBalance_decorators = [(0, core_1.Tool)({
                    description: "Gets the balance of a token denom in base units. Convert to decimal units before returning.",
                })];
            _demonMetada_decorators = [(0, core_1.Tool)({
                    description: "Get the metadata of a token with the specified symbol.",
                })];
            _supplyOf_decorators = [(0, core_1.Tool)({
                    description: "Get the total supply of a token with the specified symbol.",
                })];
            _sendToken_decorators = [(0, core_1.Tool)({
                    description: "Sends an amount of a Token of a specified symbol to a receivers address.",
                })];
            __esDecorate(this, null, _tokenBalance_decorators, { kind: "method", name: "tokenBalance", static: false, private: false, access: { has: obj => "tokenBalance" in obj, get: obj => obj.tokenBalance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _demonMetada_decorators, { kind: "method", name: "demonMetada", static: false, private: false, access: { has: obj => "demonMetada" in obj, get: obj => obj.demonMetada }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _supplyOf_decorators, { kind: "method", name: "supplyOf", static: false, private: false, access: { has: obj => "supplyOf" in obj, get: obj => obj.supplyOf }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendToken_decorators, { kind: "method", name: "sendToken", static: false, private: false, access: { has: obj => "sendToken" in obj, get: obj => obj.sendToken }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async tokenBalance(walletClient, parameters) {
            try {
                const t = await this.getChainInfo(walletClient);
                const _d = t.asset?.assets.find((a) => a.symbol === parameters.symbol);
                if (!_d)
                    throw new Error("the Requested Token is unavailabe on the network");
                const data = query_1.QueryBalanceRequest.encode({ address: parameters.address, denom: _d?.base }).finish();
                const message = { typeUrl: "/cosmos.bank.v1beta1.Query/Balance", value: data };
                const rawBalance = await walletClient.read({ message });
                const decode = query_1.QueryBalanceResponse.decode(rawBalance.value.value);
                if (!decode?.balance)
                    throw new Error("the requested balance is unavailable");
                const ex = t.asset?.assets.find((a) => a.base === decode.balance?.denom);
                const xp = ex?.denom_units.find((d) => d.denom === ex?.display)?.exponent ?? 0;
                const bal = await this.convertFromBaseUnit(Number(decode.balance.amount), xp);
                return bal.toString();
            }
            catch (error) {
                throw Error(`Failed to fetch balance: ${error}`);
            }
        }
        async demonMetada(walletClient, parameters) {
            try {
                const _d = (await this.getChainInfo(walletClient)).asset?.assets.find((a) => a.symbol === parameters.symbol);
                if (!_d)
                    throw new Error("the Requested Token is unavailabe on the network");
                const data = query_1.QueryDenomMetadataRequest.encode({ denom: _d?.base }).finish();
                const message = { typeUrl: "/cosmos.bank.v1beta1.Query/DenomMetadata", value: data };
                const metadata = await walletClient.read({ message });
                const decode = query_1.QueryDenomMetadataResponse.decode(metadata.value.value);
                if (!decode.metadata)
                    throw new Error("the requested metadata is unavailable");
                return `${decode.metadata.display}-${decode.metadata.name}-${decode.metadata.description}
            -${decode.metadata.symbol}`;
            }
            catch (error) {
                throw Error(`Failed to fetch denom metadata: ${error}`);
            }
        }
        async supplyOf(walletClient, parameters) {
            try {
                const t = await this.getChainInfo(walletClient);
                const _d = t.asset?.assets.find((a) => a.symbol === parameters.symbol);
                if (!_d)
                    throw new Error("the Requested Token is unavailabe on the network");
                const data = query_1.QuerySupplyOfRequest.encode({ denom: _d?.base }).finish();
                const message = { typeUrl: "/cosmos.bank.v1beta1.Query/SupplyOf", value: data };
                const supplyof = await walletClient.read({ message });
                const decode = query_1.QuerySupplyOfResponse.decode(supplyof.value.value);
                if (!decode.amount)
                    throw new Error("the requested token data is unavailable");
                const ex = t.asset?.assets.find((a) => a.base === decode.amount?.denom);
                const xp = ex?.denom_units.find((d) => d.denom === ex?.display)?.exponent ?? 0;
                const total = await this.convertFromBaseUnit(Number(decode.amount.amount), xp);
                return `$${total.toString()}_${decode.amount.denom}`;
            }
            catch (error) {
                throw Error(`Failed to fetch total supply: ${error}`);
            }
        }
        async sendToken(walletClient, parameters) {
            try {
                const t = await this.getChainInfo(walletClient);
                const _d = t.asset?.assets.find((a) => a.symbol === parameters.amount.symbol);
                if (!_d)
                    throw new Error("the Requested Token is unavailabe on the network");
                const ex = t.asset?.assets.find((a) => a.base === _d?.base);
                const xp = ex?.denom_units.find((d) => d.denom === ex?.display)?.exponent ?? 0;
                const amount = await this.convertToBaseUnit(Number(parameters.amount.amount), xp);
                const hash = await walletClient.sendTransaction({
                    message: {
                        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                        value: {
                            fromAddress: walletClient.getAddress(),
                            toAddress: parameters.toAddress,
                            amount: [{ denom: _d?.base, amount: amount.toString() }],
                        },
                    },
                });
                if (!hash.value.transactionHash)
                    throw new Error("transaction was incomplete");
                return hash.value.transactionHash;
            }
            catch (error) {
                throw Error(`Failed to send token: ${error}`);
            }
        }
        async getChainInfo(walletClient) {
            const id = await walletClient.getChainId();
            const chain = chain_registry_1.chains.find((ch) => ch.chain_id === id);
            if (!chain)
                throw new Error("Network data is unavailable");
            const asset = chain_registry_1.assets.find((ast) => ast.chain_name === chain?.chain_name);
            return {
                chain: chain,
                asset: asset,
            };
        }
        async convertToBaseUnit(amount, decimals) {
            const baseUnit = amount * 10 ** decimals;
            return Number(baseUnit);
        }
        async convertFromBaseUnit(amount, decimals) {
            const decimalUnit = amount / 10 ** decimals;
            return Number(decimalUnit);
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.BankService = BankService;
