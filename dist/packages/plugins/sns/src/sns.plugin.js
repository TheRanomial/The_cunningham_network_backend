"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sns = exports.SNSPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const sns_service_1 = require("./sns.service");
class SNSPlugin extends core_1.PluginBase {
    constructor() {
        super("sns", [new sns_service_1.SNSService()]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.SNSPlugin = SNSPlugin;
const sns = () => new SNSPlugin();
exports.sns = sns;
