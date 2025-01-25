"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsPlugin = void 0;
exports.walletsPlugin = walletsPlugin;
const core_1 = require("@goat-sdk/core");
const wallets_service_1 = require("./wallets.service");
class WalletsPlugin extends core_1.PluginBase {
    constructor(client) {
        super("wallets", [new wallets_service_1.WalletsService(client)]);
    }
    supportsChain(chain) {
        return true;
    }
}
exports.WalletsPlugin = WalletsPlugin;
function walletsPlugin(client) {
    return () => {
        return new WalletsPlugin(client);
    };
}
