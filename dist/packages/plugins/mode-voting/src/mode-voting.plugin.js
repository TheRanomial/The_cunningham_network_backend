"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeVoting = exports.ModeVotingPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const mode_voting_service_1 = require("./mode-voting.service");
const SUPPORTED_CHAINS = [chains_1.mode];
class ModeVotingPlugin extends core_1.PluginBase {
    constructor() {
        super("mode-voting", [new mode_voting_service_1.ModeVotingService()]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.ModeVotingPlugin = ModeVotingPlugin;
const modeVoting = () => new ModeVotingPlugin();
exports.modeVoting = modeVoting;
