"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NansenPlugin = void 0;
exports.nansen = nansen;
const core_1 = require("@goat-sdk/core");
const nansen_service_1 = require("./nansen.service");
class NansenPlugin extends core_1.PluginBase {
    constructor({ apiKey }) {
        super("nansen", [new nansen_service_1.NansenService(apiKey)]);
    }
    supportsChain = () => true;
}
exports.NansenPlugin = NansenPlugin;
function nansen(options) {
    return new NansenPlugin(options);
}
