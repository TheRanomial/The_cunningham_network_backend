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
exports.RenzoService = void 0;
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
const ezeth_1 = require("./abi/ezeth");
const renzo_1 = require("./abi/renzo");
const ChainSpecifications_1 = require("./types/ChainSpecifications");
let RenzoService = (() => {
    let _instanceExtraInitializers = [];
    let _depositERC20_decorators;
    let _depositETH_decorators;
    let _getEzEthBalance_decorators;
    let _getRenzoDepositAddress_decorators;
    return class RenzoService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _depositERC20_decorators = [(0, core_1.Tool)({
                    name: "deposit_erc20_LST_into_renzo",
                    description: "Deposit ERC20 LST tokens into Renzo, approve the ERC20 contract to spend the tokens before calling this",
                })];
            _depositETH_decorators = [(0, core_1.Tool)({
                    name: "deposit_eth_into_renzo",
                    description: "Deposit ETH into Renzo",
                })];
            _getEzEthBalance_decorators = [(0, core_1.Tool)({
                    name: "check_ezeth_balance_in_renzo",
                    description: "Check the ezETH balance of an address",
                })];
            _getRenzoDepositAddress_decorators = [(0, core_1.Tool)({
                    name: "renzo_get_deposit_address",
                    description: "Get the Renzo deposit contract address for the current chain. Call this to get the address to send ETH to, not needed for ERC20 deposits.",
                })];
            __esDecorate(this, null, _depositERC20_decorators, { kind: "method", name: "depositERC20", static: false, private: false, access: { has: obj => "depositERC20" in obj, get: obj => obj.depositERC20 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _depositETH_decorators, { kind: "method", name: "depositETH", static: false, private: false, access: { has: obj => "depositETH" in obj, get: obj => obj.depositETH }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEzEthBalance_decorators, { kind: "method", name: "getEzEthBalance", static: false, private: false, access: { has: obj => "getEzEthBalance" in obj, get: obj => obj.getEzEthBalance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRenzoDepositAddress_decorators, { kind: "method", name: "getRenzoDepositAddress", static: false, private: false, access: { has: obj => "getRenzoDepositAddress" in obj, get: obj => obj.getRenzoDepositAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async depositERC20(walletClient, parameters) {
            try {
                const { renzoDepositAddress } = (0, ChainSpecifications_1.getRenzoAddresses)(walletClient.getChain().id);
                const depositToken = await walletClient.read({
                    address: renzoDepositAddress,
                    abi: renzo_1.RENZO_ABI,
                    functionName: "depositToken",
                });
                const depositTokenAddress = depositToken.value;
                if (parameters.tokenAddress.toLowerCase() !== depositTokenAddress.toLowerCase() // Now we can safely call toLowerCase()
                ) {
                    throw new Error(`Invalid token: ${parameters.tokenAddress}. Expected deposit token: ${depositTokenAddress}`);
                }
                const deadline = BigInt(Math.floor(Date.now() / 1000) + 300); // current time + 5 minutes
                const hash = await walletClient.sendTransaction({
                    to: renzoDepositAddress,
                    abi: renzo_1.RENZO_ABI,
                    functionName: "deposit",
                    args: [
                        parameters.amountIn,
                        parameters.minOut,
                        deadline, // Use the calculated deadline
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to deposit ERC20: ${error}`);
            }
        }
        async depositETH(walletClient, parameters) {
            try {
                const { renzoDepositAddress } = (0, ChainSpecifications_1.getRenzoAddresses)(walletClient.getChain().id);
                const minOut = (0, viem_1.parseUnits)(parameters.minOut, 18);
                const value = (0, viem_1.parseUnits)(parameters.value, 18);
                const deadline = BigInt(Math.floor(Date.now() / 1000) + 300); // 5 minutes from now
                const hash = await walletClient.sendTransaction({
                    to: renzoDepositAddress,
                    abi: renzo_1.RENZO_ABI,
                    functionName: "depositETH",
                    args: [minOut, deadline],
                    value,
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to deposit ETH: ${error}`);
            }
        }
        async getEzEthBalance(walletClient, parameters) {
            try {
                const { l2EzEthAddress } = (0, ChainSpecifications_1.getRenzoAddresses)(walletClient.getChain().id);
                const balanceResult = await walletClient.read({
                    address: l2EzEthAddress,
                    abi: ezeth_1.EZETH_ABI,
                    functionName: "balanceOf",
                    args: [parameters.address],
                });
                const balance = balanceResult.value;
                return balance.toString();
            }
            catch (error) {
                throw Error(`Failed to get ezETH balance: ${error}`);
            }
        }
        async getRenzoDepositAddress(walletClient, parameters) {
            try {
                const { renzoDepositAddress } = (0, ChainSpecifications_1.getRenzoAddresses)(walletClient.getChain().id);
                return renzoDepositAddress;
            }
            catch (error) {
                throw Error(`Failed to get Renzo deposit address: ${error}`);
            }
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.RenzoService = RenzoService;
