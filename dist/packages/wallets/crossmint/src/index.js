"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crossmint = crossmint;
const common_sdk_base_1 = require("@crossmint/common-sdk-base");
const plugins_1 = require("./plugins");
const wallets_plugin_1 = require("./plugins/wallets.plugin");
const wallets_1 = require("./wallets");
function crossmint(apiKey) {
    const apiClient = new common_sdk_base_1.CrossmintApiClient({
        apiKey,
    }, {
        internalConfig: {
            sdkMetadata: {
                name: "crossmint-sdk-base",
                version: "0.1.0",
            },
        },
    });
    return {
        custodial: (0, wallets_1.custodialFactory)(apiClient),
        smartwallet: (0, wallets_1.smartWalletFactory)(apiClient),
        faucet: (0, plugins_1.faucetPlugin)(apiClient),
        mint: (0, plugins_1.mintPlugin)(apiClient),
        wallets: (0, wallets_plugin_1.walletsPlugin)(apiClient),
    };
}
