"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiWalletClient = void 0;
const core_1 = require("@goat-sdk/core");
class SuiWalletClient extends core_1.WalletClientBase {
    client;
    constructor(params) {
        super();
        this.client = params.client;
    }
    getChain() {
        return {
            type: "sui",
        };
    }
    getClient() {
        return this.client;
    }
    async balanceOf(address) {
        const balance = await this.client.getBalance({
            owner: address,
        });
        return {
            decimals: 9,
            symbol: "SUI",
            name: "Sui",
            value: balance.totalBalance,
            inBaseUnits: balance.totalBalance,
        };
    }
}
exports.SuiWalletClient = SuiWalletClient;
