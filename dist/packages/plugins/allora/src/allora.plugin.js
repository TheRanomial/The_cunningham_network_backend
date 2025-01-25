"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlloraPlugin = void 0;
exports.allora = allora;
const core_1 = require("@goat-sdk/core");
const allora_service_1 = require("./allora.service");
class AlloraPlugin extends core_1.PluginBase {
    constructor(opts) {
        super("allora", [new allora_service_1.AlloraService(opts)]);
    }
    supportsChain = () => true;
}
exports.AlloraPlugin = AlloraPlugin;
function allora(options) {
    return new AlloraPlugin(options);
}
