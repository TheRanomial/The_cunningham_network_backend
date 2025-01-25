"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeGovernance = exports.ModeGovernancePlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const mode_governance_service_1 = require("./mode-governance.service");
const SUPPORTED_CHAINS = [chains_1.mode];
class ModeGovernancePlugin extends core_1.PluginBase {
    constructor() {
        super("mode-governance", [new mode_governance_service_1.ModeGovernanceService()]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.ModeGovernancePlugin = ModeGovernancePlugin;
const modeGovernance = () => new ModeGovernancePlugin();
exports.modeGovernance = modeGovernance;
