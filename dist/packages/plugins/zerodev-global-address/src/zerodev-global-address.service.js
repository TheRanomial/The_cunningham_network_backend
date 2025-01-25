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
exports.ZeroDevGlobalAddressService = void 0;
const core_1 = require("@goat-sdk/core");
const global_address_1 = require("@zerodev/global-address");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
let ZeroDevGlobalAddressService = (() => {
    let _instanceExtraInitializers = [];
    let _createGlobalAddressConfig_decorators;
    return class ZeroDevGlobalAddressService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createGlobalAddressConfig_decorators = [(0, core_1.Tool)({
                    description: `Creates a global address that can receive tokens from multiple chains.
    A global address allows you to receive tokens on any supported chain and have them automatically bridged to your destination chain.
    
    Example prompts:
    - "Create a global address" (uses default settings: Optimism as destination chain)
    - "Create a global address on base" (specifies base as destination chain)
    - "Create a global address for wallet 0x123...abc" (specifies owner address)
    - "Create a global address on arbitrum with 30% slippage"
    `,
                })];
            __esDecorate(this, null, _createGlobalAddressConfig_decorators, { kind: "method", name: "createGlobalAddressConfig", static: false, private: false, access: { has: obj => "createGlobalAddressConfig" in obj, get: obj => obj.createGlobalAddressConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        defaultSlippage = __runInitializers(this, _instanceExtraInitializers);
        constructor(defaultSlippage = 5000) {
            this.defaultSlippage = defaultSlippage;
        }
        getChainName(chainId) {
            switch (chainId) {
                case chains_1.mainnet.id:
                    return "Ethereum Mainnet";
                case chains_1.optimism.id:
                    return "Optimism";
                case chains_1.arbitrum.id:
                    return "Arbitrum";
                case chains_1.base.id:
                    return "Base";
                case chains_1.scroll.id:
                    return "Scroll";
                case chains_1.mode.id:
                    return "Mode";
                default:
                    return "Unknown Chain";
            }
        }
        formatTokenAmount(hexAmount, decimals) {
            if (!hexAmount)
                return "0";
            const amount = BigInt(hexAmount);
            const amountStr = amount.toString();
            const padded = amountStr.padStart(decimals + 1, "0");
            const decimalIndex = padded.length - decimals;
            const formattedAmount = `${padded.slice(0, decimalIndex)}.${padded.slice(decimalIndex)}`;
            return formattedAmount.replace(/\.?0+$/, "");
        }
        formatLogsToString(globalAddress, formattedFees) {
            let logs = `Global Address: ${globalAddress}\n\nEstimated Fees by Chain:\n`;
            for (const chainFee of formattedFees) {
                logs += `\nChain: ${chainFee.chainName} (${chainFee.chainId}):\n`;
                for (const token of chainFee.tokens) {
                    logs += `\n${token.name} (${token.symbol}):\n`;
                    logs += `  Min Deposit: ${token.minDeposit}\n`;
                    logs += `  Fee: ${token.fee}\n`;
                    logs += `  Decimals: ${token.decimals}\n`;
                }
            }
            return logs;
        }
        async createGlobalAddressConfig(params) {
            const { owner, destinationChain = chains_1.optimism, slippage = this.defaultSlippage } = params;
            if (!owner) {
                throw new Error("Owner address is required");
            }
            const allSrcTokens = this.getSourceTokens();
            const srcTokens = allSrcTokens.filter((token) => token.chain.id !== destinationChain.id);
            const actions = this.createActionConfig(owner);
            try {
                const { globalAddress, estimatedFees } = await (0, global_address_1.createGlobalAddress)({
                    destChain: destinationChain,
                    owner,
                    slippage,
                    actions,
                    srcTokens,
                });
                const formattedFees = this.formatEstimatedFees(estimatedFees);
                const logs = this.formatLogsToString(globalAddress, formattedFees);
                const targetChain_name = `destination chain: ${this.getChainName(destinationChain.id)} (${destinationChain.id})`;
                return {
                    globalAddress,
                    formattedFees,
                    rawEstimatedFees: estimatedFees,
                    logs,
                    targetChain_name,
                };
            }
            catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
        // Helper methods made private
        getSourceTokens() {
            return [
                // Ethereum Mainnet
                { tokenType: "NATIVE", chain: chains_1.mainnet },
                { tokenType: "ERC20", chain: chains_1.mainnet },
                // Base
                { tokenType: "NATIVE", chain: chains_1.base },
                { tokenType: "ERC20", chain: chains_1.base },
                // Optimism
                { tokenType: "NATIVE", chain: chains_1.optimism },
                { tokenType: "ERC20", chain: chains_1.optimism },
                // Arbitrum
                { tokenType: "NATIVE", chain: chains_1.arbitrum },
                { tokenType: "ERC20", chain: chains_1.arbitrum },
                // Scroll
                { tokenType: "NATIVE", chain: chains_1.scroll },
                { tokenType: "ERC20", chain: chains_1.scroll },
                // Mode
                { tokenType: "NATIVE", chain: chains_1.mode },
                { tokenType: "ERC20", chain: chains_1.mode },
            ];
        }
        createERC20TransferCall(owner) {
            return (0, global_address_1.createCall)({
                target: global_address_1.FLEX.TOKEN_ADDRESS,
                value: 0n,
                abi: viem_1.erc20Abi,
                functionName: "transfer",
                args: [owner, global_address_1.FLEX.AMOUNT],
            });
        }
        createNativeTransferCall(owner) {
            return (0, global_address_1.createCall)({
                target: owner,
                value: global_address_1.FLEX.NATIVE_AMOUNT,
            });
        }
        createActionConfig(owner) {
            return {
                ERC20: {
                    action: [this.createERC20TransferCall(owner)],
                    fallBack: [],
                },
                NATIVE: {
                    action: [this.createNativeTransferCall(owner)],
                    fallBack: [],
                },
                USDC: {
                    action: [this.createERC20TransferCall(owner)],
                    fallBack: [],
                },
                WRAPPED_NATIVE: {
                    action: [this.createERC20TransferCall(owner)],
                    fallBack: [],
                },
            };
        }
        formatEstimatedFees(estimatedFees) {
            return estimatedFees.map((fee) => {
                if (typeof fee === "bigint") {
                    return {
                        chainName: this.getChainName(Number(fee)),
                        chainId: Number(fee),
                        tokens: [],
                    };
                }
                return {
                    chainName: this.getChainName(fee.chainId),
                    chainId: fee.chainId,
                    tokens: fee.data.map((tokenFee) => ({
                        name: tokenFee.name,
                        symbol: tokenFee.token,
                        minDeposit: this.formatTokenAmount(tokenFee.minDeposit, tokenFee.decimal),
                        fee: this.formatTokenAmount(tokenFee.fee, tokenFee.decimal),
                        decimals: tokenFee.decimal,
                    })),
                };
            });
        }
    };
})();
exports.ZeroDevGlobalAddressService = ZeroDevGlobalAddressService;
