"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jupiter = exports.JupiterPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const jupiter_service_1 = require("./jupiter.service");
class JupiterPlugin extends core_1.PluginBase {
    constructor() {
        super("jupiter", [new jupiter_service_1.JupiterService()]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.JupiterPlugin = JupiterPlugin;
const jupiter = () => new JupiterPlugin();
exports.jupiter = jupiter;
