"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modespray = exports.ModeSprayPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const chains_1 = require("viem/chains");
const modespray_service_1 = require("./modespray.service");
const SUPPORTED_CHAINS = [chains_1.mode, chains_1.modeTestnet];
class ModeSprayPlugin extends core_1.PluginBase {
    constructor() {
        super("modespray", [new modespray_service_1.ModeSprayService()]);
    }
    supportsChain = (chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}
exports.ModeSprayPlugin = ModeSprayPlugin;
const modespray = () => new ModeSprayPlugin();
exports.modespray = modespray;
