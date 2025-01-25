"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Plugin = void 0;
exports.erc20 = erc20;
const core_1 = require("@goat-sdk/core");
const erc20_service_1 = require("./erc20.service");
class ERC20Plugin extends core_1.PluginBase {
    constructor({ tokens }) {
        super("erc20", [new erc20_service_1.Erc20Service({ tokens })]);
    }
    supportsChain = (chain) => chain.type === "evm";
}
exports.ERC20Plugin = ERC20Plugin;
function erc20({ tokens }) {
    return new ERC20Plugin({ tokens });
}
