"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tensor = exports.TensorPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const tensor_service_1 = require("./tensor.service");
class TensorPlugin extends core_1.PluginBase {
    constructor(params) {
        super("tensor", [new tensor_service_1.TensorService(params.apiKey)]);
    }
    supportsChain = (chain) => chain.type === "solana";
}
exports.TensorPlugin = TensorPlugin;
const tensor = (apiKey) => new TensorPlugin({ apiKey });
exports.tensor = tensor;
