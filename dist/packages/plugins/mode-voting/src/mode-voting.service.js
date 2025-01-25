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
exports.ModeVotingService = void 0;
const core_1 = require("@goat-sdk/core");
const clock_1 = require("./abi/clock");
const gaugeVoter_1 = require("./abi/gaugeVoter");
const votingEscrow_1 = require("./abi/votingEscrow");
// Contract addresses for different voter types
const VOTER_ADDRESSES = {
    veMODE: "0x71439Ae82068E19ea90e4F506c74936aE170Cf58",
    veBPT: "0x2aA8A5C1Af4EA11A1f1F10f3b73cfB30419F77Fb",
};
const CLOCK_ADDRESSES = {
    veMODE: "0x66CC481755f8a9d415e75d29C17B0E3eF2Af70bD",
    veBPT: "0x6d1D6277fBB117d77782a85120796BCb08cAae8a",
};
const VOTING_ESCROW_ADDRESSES = {
    veMODE: "0xff8AB822b8A853b01F9a9E9465321d6Fe77c9D2F",
    veBPT: "0x9c2eFe2a1FBfb601125Bb07a3D5bC6EC91F91e01",
};
const ESCROW_CURVE_ADDRESSES = {
    veMODE: "0x69E57EE7782701DdA44b170Df5b1244C6F02e89b",
    veBPT: "0xf597bcF98E79A3B4c92FA70Eb0c6C47DA0f84Fba",
};
let ModeVotingService = (() => {
    let _instanceExtraInitializers = [];
    let _getAllGauges_decorators;
    let _getGaugeInfo_decorators;
    let _voteOnGauges_decorators;
    let _changeVotes_decorators;
    let _getVotingPower_decorators;
    return class ModeVotingService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getAllGauges_decorators = [(0, core_1.Tool)({
                    name: "get_all_gauges_mode",
                    description: "Get a list of all available voting gauges on Mode Network. Use veMODE for MODE token gauges or veBPT for Balancer Pool Token gauges.",
                })];
            _getGaugeInfo_decorators = [(0, core_1.Tool)({
                    name: "get_gauge_info_mode",
                    description: "Get detailed information about a specific gauge",
                })];
            _voteOnGauges_decorators = [(0, core_1.Tool)({
                    name: "vote_on_gauges_mode",
                    description: "Vote on multiple gauges using your veNFT voting power. The sum of weights must equal 100.",
                })];
            _changeVotes_decorators = [(0, core_1.Tool)({
                    name: "change_votes_mode",
                    description: "Change existing votes for a veNFT. Must reset existing votes first.",
                })];
            _getVotingPower_decorators = [(0, core_1.Tool)({
                    name: "get_voting_power_mode",
                    description: "Get the current voting power for a specific veNFT token ID",
                })];
            __esDecorate(this, null, _getAllGauges_decorators, { kind: "method", name: "getAllGauges", static: false, private: false, access: { has: obj => "getAllGauges" in obj, get: obj => obj.getAllGauges }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getGaugeInfo_decorators, { kind: "method", name: "getGaugeInfo", static: false, private: false, access: { has: obj => "getGaugeInfo" in obj, get: obj => obj.getGaugeInfo }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _voteOnGauges_decorators, { kind: "method", name: "voteOnGauges", static: false, private: false, access: { has: obj => "voteOnGauges" in obj, get: obj => obj.voteOnGauges }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _changeVotes_decorators, { kind: "method", name: "changeVotes", static: false, private: false, access: { has: obj => "changeVotes" in obj, get: obj => obj.changeVotes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getVotingPower_decorators, { kind: "method", name: "getVotingPower", static: false, private: false, access: { has: obj => "getVotingPower" in obj, get: obj => obj.getVotingPower }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async getAllGauges(walletClient, parameters) {
            try {
                const voterAddress = VOTER_ADDRESSES[parameters.voterType];
                const gaugesResult = await walletClient.read({
                    address: voterAddress,
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "getAllGauges",
                    args: [],
                });
                const gauges = gaugesResult.value;
                return {
                    voterType: parameters.voterType,
                    gauges: gauges,
                };
            }
            catch (error) {
                throw Error(`Failed to get gauges for ${parameters.voterType}: ${error}`);
            }
        }
        async getGaugeInfo(walletClient, parameters) {
            try {
                const gaugeDataResult = await walletClient.read({
                    address: VOTER_ADDRESSES[parameters.voterType],
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "getGauge",
                    args: [parameters.gaugeAddress],
                });
                const gaugeData = gaugeDataResult.value;
                const votesResult = await walletClient.read({
                    address: VOTER_ADDRESSES[parameters.voterType],
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "gaugeVotes",
                    args: [parameters.gaugeAddress],
                });
                const votes = votesResult.value;
                const gaugeInfo = {
                    address: parameters.gaugeAddress,
                    active: gaugeData.active,
                    created: Number(gaugeData.created),
                    metadataURI: gaugeData.metadataURI,
                    totalVotes: votes.toString(),
                };
                return gaugeInfo;
            }
            catch (error) {
                throw Error(`Failed to get gauge info: ${error}`);
            }
        }
        async voteOnGauges(walletClient, parameters) {
            try {
                // Check if voting is active
                const clockAddress = CLOCK_ADDRESSES[parameters.voterType];
                const votingActiveResult = await walletClient.read({
                    address: clockAddress,
                    abi: clock_1.CLOCK_ABI,
                    functionName: "votingActive",
                    args: [],
                });
                const isVotingActive = votingActiveResult.value;
                if (!isVotingActive) {
                    throw new Error("Voting is not currently active");
                }
                // Verify NFT ownership and get voting power
                const voterAddress = VOTER_ADDRESSES[parameters.voterType];
                const escrowAddress = VOTING_ESCROW_ADDRESSES[parameters.voterType];
                const isApprovedResult = await walletClient.read({
                    address: escrowAddress,
                    abi: votingEscrow_1.VOTING_ESCROW_ABI,
                    functionName: "isApprovedOrOwner",
                    args: [walletClient.getAddress(), parameters.tokenId],
                });
                const isApproved = isApprovedResult.value;
                if (!isApproved) {
                    throw new Error("Not approved or owner of the NFT");
                }
                // Validate gauges and prepare vote data
                const votes = parameters.votes.map((vote) => ({
                    gauge: vote.gauge,
                    weight: BigInt(vote.weight),
                }));
                // Sum of weights validation
                const totalWeight = votes.reduce((sum, vote) => sum + BigInt(vote.weight), 0n);
                if (totalWeight !== 100n) {
                    throw new Error("Total vote weight must equal 100");
                }
                // Execute vote transaction
                const txHash = await walletClient.sendTransaction({
                    to: voterAddress,
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "vote",
                    args: [parameters.tokenId, votes],
                });
                return `Successfully voted with NFT ${parameters.tokenId}. Transaction: ${txHash.hash}`;
            }
            catch (error) {
                throw Error(`Failed to vote on gauges: ${error}`);
            }
        }
        async changeVotes(walletClient, parameters) {
            try {
                const voterAddress = VOTER_ADDRESSES[parameters.voterType];
                // First reset existing votes
                const resetTx = await walletClient.sendTransaction({
                    to: voterAddress,
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "reset",
                    args: [parameters.tokenId],
                });
                // Verify votes have been reset by checking usedVotingPower
                const votingPowerResult = await walletClient.read({
                    address: voterAddress,
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "usedVotingPower",
                    args: [parameters.tokenId],
                });
                const usedVotingPower = votingPowerResult.value;
                if (usedVotingPower !== 0n) {
                    throw new Error("Failed to reset votes - voting power not cleared");
                }
                // Now submit new votes
                const votes = parameters.votes.map((vote) => ({
                    gauge: vote.gauge,
                    weight: BigInt(vote.weight),
                }));
                // Sum of weights validation
                const totalWeight = votes.reduce((sum, vote) => sum + BigInt(vote.weight), 0n);
                if (totalWeight !== 100n) {
                    throw new Error("Total vote weight must equal 100");
                }
                // Execute new vote transaction
                const voteTx = await walletClient.sendTransaction({
                    to: voterAddress,
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "vote",
                    args: [parameters.tokenId, votes],
                });
                return `Successfully changed votes for NFT ${parameters.tokenId}. Reset tx: ${resetTx.hash}, Vote tx: ${voteTx.hash}`;
            }
            catch (error) {
                throw Error(`Failed to change votes: ${error}`);
            }
        }
        async getVotingPower(walletClient, parameters) {
            try {
                const escrowAddress = VOTING_ESCROW_ADDRESSES[parameters.voterType];
                const votingPowerResult = await walletClient.read({
                    address: escrowAddress,
                    abi: votingEscrow_1.VOTING_ESCROW_ABI,
                    functionName: "votingPowerAt",
                    args: [parameters.tokenId, BigInt(Math.floor(Date.now() / 1000))],
                });
                const votingPower = votingPowerResult.value;
                const voterAddress = VOTER_ADDRESSES[parameters.voterType];
                const usedVotingPowerResult = await walletClient.read({
                    address: voterAddress,
                    abi: gaugeVoter_1.GAUGE_VOTER_ABI,
                    functionName: "usedVotingPower",
                    args: [parameters.tokenId],
                });
                const usedVotingPower = usedVotingPowerResult.value;
                const DECIMALS = BigInt(10 ** 18);
                return {
                    totalVotingPower: (votingPower / DECIMALS).toString(),
                    usedVotingPower: (usedVotingPower / DECIMALS).toString(),
                    remainingVotingPower: ((votingPower - usedVotingPower) / DECIMALS).toString(),
                };
            }
            catch (error) {
                throw Error(`Failed to get voting power: ${error}`);
            }
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.ModeVotingService = ModeVotingService;
