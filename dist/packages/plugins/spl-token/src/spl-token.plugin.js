"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splToken = exports.SplTokenPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const spl_token_service_1 = require("./spl-token.service");
class SplTokenPlugin extends core_1.PluginBase {
    constructor(params) {
        super("splToken", [new spl_token_service_1.SplTokenService(params)]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.SplTokenPlugin = SplTokenPlugin;
const splToken = (params) => new SplTokenPlugin(params);
exports.splToken = splToken;
