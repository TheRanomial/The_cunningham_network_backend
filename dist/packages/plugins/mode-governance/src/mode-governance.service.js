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
exports.ModeGovernanceService = void 0;
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
const abi_1 = require("./abi");
const constants_1 = require("./constants");
let ModeGovernanceService = (() => {
    let _instanceExtraInitializers = [];
    let _stakeTokensForModeGovernance_decorators;
    let _getModeGovernanceStakeInfo_decorators;
    let _getModeGovernanceVotingPower_decorators;
    return class ModeGovernanceService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _stakeTokensForModeGovernance_decorators = [(0, core_1.Tool)({
                    description: "Stake MODE or BPT tokens in the Mode governance system. Requires MODE or BPT tokens to be approved first.",
                })];
            _getModeGovernanceStakeInfo_decorators = [(0, core_1.Tool)({
                    description: "Get Mode governance staking information including lock period and voting power",
                })];
            _getModeGovernanceVotingPower_decorators = [(0, core_1.Tool)({
                    description: "Get the Mode governance voting power for any address. Use 'veMode' or 'veBPT' to check voting power.",
                })];
            __esDecorate(this, null, _stakeTokensForModeGovernance_decorators, { kind: "method", name: "stakeTokensForModeGovernance", static: false, private: false, access: { has: obj => "stakeTokensForModeGovernance" in obj, get: obj => obj.stakeTokensForModeGovernance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getModeGovernanceStakeInfo_decorators, { kind: "method", name: "getModeGovernanceStakeInfo", static: false, private: false, access: { has: obj => "getModeGovernanceStakeInfo" in obj, get: obj => obj.getModeGovernanceStakeInfo }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getModeGovernanceVotingPower_decorators, { kind: "method", name: "getModeGovernanceVotingPower", static: false, private: false, access: { has: obj => "getModeGovernanceVotingPower" in obj, get: obj => obj.getModeGovernanceVotingPower }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async stakeTokensForModeGovernance(walletClient, parameters) {
            const escrowAddress = parameters.tokenType === "MODE" ? constants_1.MODE_VOTING_ESCROW : constants_1.BPT_VOTING_ESCROW;
            const stakeHash = await walletClient.sendTransaction({
                to: escrowAddress,
                abi: abi_1.VOTING_ESCROW_ABI,
                functionName: "createLock",
                args: [(0, viem_1.parseUnits)(parameters.amount, 18)],
            });
            return stakeHash.hash;
        }
        async getModeGovernanceStakeInfo(walletClient, parameters) {
            const escrowAddress = parameters.tokenType === "MODE" ? constants_1.MODE_VOTING_ESCROW : constants_1.BPT_VOTING_ESCROW;
            const userAddress = await walletClient.getAddress();
            const tokenIds = (await walletClient.read({
                address: escrowAddress,
                abi: abi_1.VOTING_ESCROW_ABI,
                functionName: "ownedTokens",
                args: [userAddress],
            }));
            if (tokenIds.length === 0) {
                return {
                    stakedAmount: "0",
                    startTime: 0,
                    votingPower: "0",
                    isVoting: false,
                };
            }
            const tokenId = tokenIds[0];
            const [amount, start] = (await walletClient.read({
                address: escrowAddress,
                abi: abi_1.VOTING_ESCROW_ABI,
                functionName: "locked",
                args: [tokenId],
            }));
            const votingPower = (await walletClient.read({
                address: escrowAddress,
                abi: abi_1.VOTING_ESCROW_ABI,
                functionName: "votingPower",
                args: [tokenId],
            }));
            const isVoting = (await walletClient.read({
                address: escrowAddress,
                abi: abi_1.VOTING_ESCROW_ABI,
                functionName: "isVoting",
                args: [tokenId],
            }));
            return {
                stakedAmount: (0, viem_1.formatUnits)(amount, 18),
                startTime: Number(start),
                votingPower: (0, viem_1.formatUnits)(votingPower, 18),
                isVoting,
            };
        }
        async getModeGovernanceVotingPower(walletClient, parameters) {
            const userAddress = parameters.address || (await walletClient.getAddress());
            switch (parameters.tokenType) {
                case "MODE":
                case "veMode":
                    return (0, viem_1.formatUnits)((await walletClient.read({
                        address: constants_1.MODE_VOTING_ESCROW,
                        abi: abi_1.VOTING_ESCROW_ABI,
                        functionName: "votingPowerForAccount",
                        args: [userAddress],
                    })), 18);
                case "BPT":
                case "veBPT":
                    return (0, viem_1.formatUnits)((await walletClient.read({
                        address: constants_1.BPT_VOTING_ESCROW,
                        abi: abi_1.VOTING_ESCROW_ABI,
                        functionName: "votingPowerForAccount",
                        args: [userAddress],
                    })), 18);
                default:
                    throw new Error("Invalid token type");
            }
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.ModeGovernanceService = ModeGovernanceService;
