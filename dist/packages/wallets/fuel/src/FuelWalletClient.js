"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelWalletClient = void 0;
const core_1 = require("@goat-sdk/core");
const fuels_1 = require("fuels");
class FuelWalletClient extends core_1.WalletClientBase {
    params;
    provider;
    constructor(params) {
        super();
        this.params = params;
        this.provider = params.provider;
    }
    getChain() {
        return {
            type: "fuel",
        };
    }
    getProvider() {
        return this.provider;
    }
    async balanceOf(address) {
        const balance = await this.provider.getBalance(address, this.provider.getBaseAssetId());
        return {
            decimals: 9,
            symbol: "ETH",
            name: "ETH",
            value: (0, fuels_1.formatUnits)(balance),
            inBaseUnits: balance.toString(),
        };
    }
}
exports.FuelWalletClient = FuelWalletClient;
