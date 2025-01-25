"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelKeypairWalletClient = void 0;
exports.fuel = fuel;
const fuels_1 = require("fuels");
const FuelWalletClient_1 = require("./FuelWalletClient");
class FuelKeypairWalletClient extends FuelWalletClient_1.FuelWalletClient {
    params;
    wallet;
    constructor(params) {
        const { privateKey, provider } = params;
        super({ provider });
        this.params = params;
        this.wallet = fuels_1.Wallet.fromPrivateKey(privateKey, provider);
    }
    getAddress() {
        return this.wallet.address.toB256();
    }
    async signMessage(message) {
        const signature = (await this.wallet.signMessage(message)).toString();
        return {
            signature,
        };
    }
    async transfer(to, amount) {
        const amountInWei = fuels_1.bn.parseUnits(amount);
        const tx = await this.wallet.transfer(to, amountInWei);
        const { id } = await tx.waitForResult();
        return {
            hash: id,
        };
    }
    async sendTransaction(transaction) {
        const tx = await this.wallet.sendTransaction(transaction);
        const { id } = await tx.waitForResult();
        return {
            hash: id,
        };
    }
}
exports.FuelKeypairWalletClient = FuelKeypairWalletClient;
function fuel({ privateKey, provider }) {
    return new FuelKeypairWalletClient({ privateKey, provider });
}
