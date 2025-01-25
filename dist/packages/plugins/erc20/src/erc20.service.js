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
exports.Erc20Service = void 0;
const core_1 = require("@goat-sdk/core");
const abi_1 = require("./abi");
let Erc20Service = (() => {
    let _instanceExtraInitializers = [];
    let _getTokenInfoBySymbol_decorators;
    let _getTokenBalance_decorators;
    let _transfer_decorators;
    let _getTokenTotalSupply_decorators;
    let _getTokenAllowance_decorators;
    let _approve_decorators;
    let _revokeApproval_decorators;
    let _transferFrom_decorators;
    let _convertToBaseUnit_decorators;
    let _convertFromBaseUnit_decorators;
    return class Erc20Service {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getTokenInfoBySymbol_decorators = [(0, core_1.Tool)({
                    description: "Get the ERC20 token info by its symbol, including the contract address, decimals, and name",
                })];
            _getTokenBalance_decorators = [(0, core_1.Tool)({
                    description: "Get the balance of an ERC20 token in base units. Convert to decimal units before returning.",
                })];
            _transfer_decorators = [(0, core_1.Tool)({
                    description: "Transfer an amount of an ERC20 token to an address",
                })];
            _getTokenTotalSupply_decorators = [(0, core_1.Tool)({
                    description: "Get the total supply of an ERC20 token",
                })];
            _getTokenAllowance_decorators = [(0, core_1.Tool)({
                    description: "Get the allowance of an ERC20 token",
                })];
            _approve_decorators = [(0, core_1.Tool)({
                    description: "Approve an amount of an ERC20 token to an address",
                })];
            _revokeApproval_decorators = [(0, core_1.Tool)({
                    description: "Revoke approval for an ERC20 token to an address",
                })];
            _transferFrom_decorators = [(0, core_1.Tool)({
                    description: "Transfer an amount of an ERC20 token from an address to another address",
                })];
            _convertToBaseUnit_decorators = [(0, core_1.Tool)({
                    description: "Convert an amount of an ERC20 token to its base unit",
                })];
            _convertFromBaseUnit_decorators = [(0, core_1.Tool)({
                    description: "Convert an amount of an ERC20 token from its base unit to its decimal unit",
                })];
            __esDecorate(this, null, _getTokenInfoBySymbol_decorators, { kind: "method", name: "getTokenInfoBySymbol", static: false, private: false, access: { has: obj => "getTokenInfoBySymbol" in obj, get: obj => obj.getTokenInfoBySymbol }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenBalance_decorators, { kind: "method", name: "getTokenBalance", static: false, private: false, access: { has: obj => "getTokenBalance" in obj, get: obj => obj.getTokenBalance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _transfer_decorators, { kind: "method", name: "transfer", static: false, private: false, access: { has: obj => "transfer" in obj, get: obj => obj.transfer }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenTotalSupply_decorators, { kind: "method", name: "getTokenTotalSupply", static: false, private: false, access: { has: obj => "getTokenTotalSupply" in obj, get: obj => obj.getTokenTotalSupply }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenAllowance_decorators, { kind: "method", name: "getTokenAllowance", static: false, private: false, access: { has: obj => "getTokenAllowance" in obj, get: obj => obj.getTokenAllowance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _approve_decorators, { kind: "method", name: "approve", static: false, private: false, access: { has: obj => "approve" in obj, get: obj => obj.approve }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _revokeApproval_decorators, { kind: "method", name: "revokeApproval", static: false, private: false, access: { has: obj => "revokeApproval" in obj, get: obj => obj.revokeApproval }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _transferFrom_decorators, { kind: "method", name: "transferFrom", static: false, private: false, access: { has: obj => "transferFrom" in obj, get: obj => obj.transferFrom }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _convertToBaseUnit_decorators, { kind: "method", name: "convertToBaseUnit", static: false, private: false, access: { has: obj => "convertToBaseUnit" in obj, get: obj => obj.convertToBaseUnit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _convertFromBaseUnit_decorators, { kind: "method", name: "convertFromBaseUnit", static: false, private: false, access: { has: obj => "convertFromBaseUnit" in obj, get: obj => obj.convertFromBaseUnit }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        tokens = __runInitializers(this, _instanceExtraInitializers);
        constructor({ tokens } = {}) {
            this.tokens = tokens ?? [];
        }
        async getTokenInfoBySymbol(walletClient, parameters) {
            const token = this.tokens.find((token) => [token.symbol, token.symbol.toLowerCase()].includes(parameters.symbol));
            if (!token) {
                throw Error(`Token with symbol ${parameters.symbol} not found`);
            }
            const chain = walletClient.getChain();
            const contractAddress = token.chains[chain.id]?.contractAddress;
            if (!contractAddress) {
                throw Error(`Token with symbol ${parameters.symbol} not found on chain ${chain.id}`);
            }
            return {
                symbol: token?.symbol,
                contractAddress,
                decimals: token?.decimals,
                name: token?.name,
            };
        }
        async getTokenBalance(walletClient, parameters) {
            try {
                const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);
                const rawBalance = await walletClient.read({
                    address: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "balanceOf",
                    args: [resolvedWalletAddress],
                });
                return Number(rawBalance.value);
            }
            catch (error) {
                throw Error(`Failed to fetch balance: ${error}`);
            }
        }
        async transfer(walletClient, parameters) {
            try {
                const to = await walletClient.resolveAddress(parameters.to);
                const hash = await walletClient.sendTransaction({
                    to: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "transfer",
                    args: [to, parameters.amount],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to transfer: ${error}`);
            }
        }
        async getTokenTotalSupply(walletClient, parameters) {
            try {
                const rawTotalSupply = await walletClient.read({
                    address: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "totalSupply",
                });
                return rawTotalSupply.value;
            }
            catch (error) {
                throw Error(`Failed to fetch total supply: ${error}`);
            }
        }
        async getTokenAllowance(walletClient, parameters) {
            try {
                const owner = await walletClient.resolveAddress(parameters.owner);
                const spender = await walletClient.resolveAddress(parameters.spender);
                const rawAllowance = await walletClient.read({
                    address: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "allowance",
                    args: [owner, spender],
                });
                return Number(rawAllowance.value);
            }
            catch (error) {
                throw Error(`Failed to fetch allowance: ${error}`);
            }
        }
        async approve(walletClient, parameters) {
            try {
                const spender = await walletClient.resolveAddress(parameters.spender);
                const hash = await walletClient.sendTransaction({
                    to: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "approve",
                    args: [spender, parameters.amount],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to approve: ${error}`);
            }
        }
        async revokeApproval(walletClient, parameters) {
            try {
                const spender = await walletClient.resolveAddress(parameters.spender);
                const hash = await walletClient.sendTransaction({
                    to: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "approve",
                    args: [spender, 0],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to revoke approval: ${error}`);
            }
        }
        async transferFrom(walletClient, parameters) {
            try {
                const from = await walletClient.resolveAddress(parameters.from);
                const to = await walletClient.resolveAddress(parameters.to);
                const hash = await walletClient.sendTransaction({
                    to: parameters.tokenAddress,
                    abi: abi_1.ERC20_ABI,
                    functionName: "transferFrom",
                    args: [from, to, parameters.amount],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to transfer from: ${error}`);
            }
        }
        async convertToBaseUnit(parameters) {
            const { amount, decimals } = parameters;
            const baseUnit = amount * 10 ** decimals;
            return Number(baseUnit);
        }
        async convertFromBaseUnit(parameters) {
            const { amount, decimals } = parameters;
            const decimalUnit = amount / 10 ** decimals;
            return Number(decimalUnit);
        }
    };
})();
exports.Erc20Service = Erc20Service;
