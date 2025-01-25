"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANKPlugin = void 0;
exports.cosmosbank = cosmosbank;
const core_1 = require("@goat-sdk/core");
const bank_service_1 = require("./bank.service");
class BANKPlugin extends core_1.PluginBase {
    constructor() {
        super("cosmosbank", [new bank_service_1.BankService()]);
    }
    supportsChain = (chain) => chain.type === "cosmos";
}
exports.BANKPlugin = BANKPlugin;
async function cosmosbank() {
    return new BANKPlugin();
}
