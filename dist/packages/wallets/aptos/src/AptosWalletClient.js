"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptosWalletClient = void 0;
exports.aptos = aptos;
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
class AptosWalletClient extends core_1.WalletClientBase {
    aptosAccount;
    aptosClient;
    constructor(params) {
        super();
        this.aptosAccount = params.aptosAccount;
        this.aptosClient = params.aptosClient;
    }
    getAddress() {
        return this.aptosAccount.accountAddress.toStringLong();
    }
    getChain() {
        return {
            type: "aptos",
        };
    }
    async signMessage(message) {
        const signature = this.aptosAccount.sign(message).toString();
        return {
            signature,
        };
    }
    async sendTransaction({ transactionData }) {
        const transaction = await this.aptosClient.transaction.build.simple({
            sender: this.aptosAccount.accountAddress,
            data: transactionData,
        });
        const response = await this.aptosClient
            .signAndSubmitTransaction({
            signer: this.aptosAccount,
            transaction,
        })
            .then((tx) => this.aptosClient.waitForTransaction({ transactionHash: tx.hash }));
        return {
            hash: response.hash,
        };
    }
    async read({ viewFunctionData, ledgerVersionArg }) {
        const value = await this.aptosClient.view({
            payload: viewFunctionData,
            options: ledgerVersionArg,
        });
        return {
            value,
        };
    }
    async balanceOf(address) {
        const balance = await this.aptosClient.getAccountAPTAmount({
            accountAddress: address,
        });
        return {
            decimals: 8,
            symbol: "APT",
            name: "Aptos",
            value: (0, viem_1.formatUnits)(BigInt(balance), 8),
            inBaseUnits: balance.toString(),
        };
    }
}
exports.AptosWalletClient = AptosWalletClient;
function aptos({ aptosAccount, aptosClient }) {
    return new AptosWalletClient({ aptosAccount, aptosClient });
}
