"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RugCheckPlugin = void 0;
exports.rugcheck = rugcheck;
const core_1 = require("@goat-sdk/core");
const api_1 = require("./api");
const rugcheck_service_1 = require("./rugcheck.service");
class RugCheckPlugin extends core_1.PluginBase {
    constructor() {
        super("rugcheck", [new rugcheck_service_1.RugCheckService(new api_1.RugCheckApi())]);
    }
    supportsChain(chain) {
        return chain.type === "solana";
    }
}
exports.RugCheckPlugin = RugCheckPlugin;
/**
 * Factory function to create a new RugCheck plugin instance
 */
function rugcheck() {
    return new RugCheckPlugin();
}
