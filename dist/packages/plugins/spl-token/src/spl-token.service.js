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
exports.SplTokenService = void 0;
const core_1 = require("@goat-sdk/core");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const tokens_1 = require("./tokens");
const doesAccountExist_1 = require("./utils/doesAccountExist");
const getTokenByMintAddress_1 = require("./utils/getTokenByMintAddress");
let SplTokenService = (() => {
    let _instanceExtraInitializers = [];
    let _getTokenInfoBySymbol_decorators;
    let _getTokenBalanceByMintAddress_decorators;
    let _transferTokenByMintAddress_decorators;
    let _convertToBaseUnit_decorators;
    return class SplTokenService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getTokenInfoBySymbol_decorators = [(0, core_1.Tool)({
                    description: "Get the SPL token info by its symbol, including the mint address, decimals, and name",
                })];
            _getTokenBalanceByMintAddress_decorators = [(0, core_1.Tool)({
                    description: "Get the balance of an SPL token by its mint address",
                })];
            _transferTokenByMintAddress_decorators = [(0, core_1.Tool)({
                    description: "Transfer an SPL token by its mint address",
                })];
            _convertToBaseUnit_decorators = [(0, core_1.Tool)({
                    description: "Convert an amount of an SPL token to its base unit",
                })];
            __esDecorate(this, null, _getTokenInfoBySymbol_decorators, { kind: "method", name: "getTokenInfoBySymbol", static: false, private: false, access: { has: obj => "getTokenInfoBySymbol" in obj, get: obj => obj.getTokenInfoBySymbol }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenBalanceByMintAddress_decorators, { kind: "method", name: "getTokenBalanceByMintAddress", static: false, private: false, access: { has: obj => "getTokenBalanceByMintAddress" in obj, get: obj => obj.getTokenBalanceByMintAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _transferTokenByMintAddress_decorators, { kind: "method", name: "transferTokenByMintAddress", static: false, private: false, access: { has: obj => "transferTokenByMintAddress" in obj, get: obj => obj.transferTokenByMintAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _convertToBaseUnit_decorators, { kind: "method", name: "convertToBaseUnit", static: false, private: false, access: { has: obj => "convertToBaseUnit" in obj, get: obj => obj.convertToBaseUnit }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        network = __runInitializers(this, _instanceExtraInitializers);
        tokens;
        constructor({ network = "mainnet", tokens = tokens_1.SPL_TOKENS } = {}) {
            this.network = network;
            this.tokens = tokens;
        }
        async getTokenInfoBySymbol(parameters) {
            const token = this.tokens.find((token) => [token.symbol, token.symbol.toLowerCase()].includes(parameters.symbol));
            return {
                symbol: token?.symbol,
                mintAddress: token?.mintAddresses[this.network],
                decimals: token?.decimals,
                name: token?.name,
            };
        }
        async getTokenBalanceByMintAddress(walletClient, parameters) {
            const { walletAddress, mintAddress } = parameters;
            try {
                const tokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(new web3_js_1.PublicKey(mintAddress), new web3_js_1.PublicKey(walletAddress));
                const accountExists = await (0, doesAccountExist_1.doesAccountExist)(walletClient.getConnection(), tokenAccount);
                if (!accountExists) {
                    return 0;
                }
                const balance = await walletClient.getConnection().getTokenAccountBalance(tokenAccount);
                return balance;
            }
            catch (error) {
                throw new Error(`Failed to get token balance: ${error}`);
            }
        }
        async transferTokenByMintAddress(walletClient, parameters) {
            const { to, mintAddress, amount } = parameters;
            const token = (0, getTokenByMintAddress_1.getTokenByMintAddress)(mintAddress, this.network);
            if (!token) {
                throw new Error(`Token with mint address ${mintAddress} not found`);
            }
            const tokenMintPublicKey = new web3_js_1.PublicKey(mintAddress);
            const fromPublicKey = new web3_js_1.PublicKey(walletClient.getAddress());
            const toPublicKey = new web3_js_1.PublicKey(to);
            const fromTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(tokenMintPublicKey, fromPublicKey);
            const toTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(tokenMintPublicKey, toPublicKey);
            const fromAccountExists = await (0, doesAccountExist_1.doesAccountExist)(walletClient.getConnection(), fromTokenAccount);
            const toAccountExists = await (0, doesAccountExist_1.doesAccountExist)(walletClient.getConnection(), toTokenAccount);
            if (!fromAccountExists) {
                throw new Error(`From account ${fromTokenAccount.toBase58()} does not exist`);
            }
            const instructions = [];
            if (!toAccountExists) {
                instructions.push((0, spl_token_1.createAssociatedTokenAccountInstruction)(fromPublicKey, toTokenAccount, toPublicKey, tokenMintPublicKey));
            }
            instructions.push((0, spl_token_1.createTransferCheckedInstruction)(fromTokenAccount, tokenMintPublicKey, toTokenAccount, fromPublicKey, BigInt(amount), token.decimals));
            return await walletClient.sendTransaction({ instructions });
        }
        async convertToBaseUnit(parameters) {
            const { amount, decimals } = parameters;
            const baseUnit = amount * 10 ** decimals;
            return baseUnit;
        }
    };
})();
exports.SplTokenService = SplTokenService;
