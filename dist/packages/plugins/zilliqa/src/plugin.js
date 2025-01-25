"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZilliqaPlugin = void 0;
exports.zilliqa = zilliqa;
const core_1 = require("@goat-sdk/core");
const zilliqa_service_1 = require("./zilliqa.service");
class ZilliqaPlugin extends core_1.PluginBase {
    constructor() {
        super("zilliqa", [new zilliqa_service_1.ZilliqaService()]);
    }
    supportsChain = (chain) => chain.type === "zilliqa";
}
exports.ZilliqaPlugin = ZilliqaPlugin;
function zilliqa() {
    return new ZilliqaPlugin();
}
