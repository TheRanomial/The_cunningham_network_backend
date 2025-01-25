"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opensea = exports.OpenseaPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const opensea_service_1 = require("./opensea.service");
class OpenseaPlugin extends core_1.PluginBase {
    constructor(apiKey) {
        super("opensea", [new opensea_service_1.OpenseaService(apiKey)]);
    }
    supportsChain = () => true;
}
exports.OpenseaPlugin = OpenseaPlugin;
const opensea = (apiKey) => new OpenseaPlugin(apiKey);
exports.opensea = opensea;
