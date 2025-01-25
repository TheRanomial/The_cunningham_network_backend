"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaWalletClient = void 0;
const core_1 = require("@goat-sdk/core");
const web3_js_1 = require("@solana/web3.js");
const viem_1 = require("viem");
class SolanaWalletClient extends core_1.WalletClientBase {
    connection;
    constructor(params) {
        super();
        this.connection = params.connection;
    }
    getChain() {
        return {
            type: "solana",
        };
    }
    getConnection() {
        return this.connection;
    }
    async balanceOf(address) {
        const pubkey = new web3_js_1.PublicKey(address);
        const balance = await this.connection.getBalance(pubkey);
        return {
            decimals: 9,
            symbol: "SOL",
            name: "Solana",
            value: (0, viem_1.formatUnits)(BigInt(balance), 9),
            inBaseUnits: balance.toString(),
        };
    }
    async decompileVersionedTransactionToInstructions(versionedTransaction) {
        const lookupTableAddresses = versionedTransaction.message.addressTableLookups.map((lookup) => lookup.accountKey);
        const addressLookupTableAccounts = await Promise.all(lookupTableAddresses.map((address) => this.connection.getAddressLookupTable(address).then((lookupTable) => lookupTable.value)));
        const nonNullAddressLookupTableAccounts = addressLookupTableAccounts.filter((lookupTable) => lookupTable != null);
        const decompileArgs = {
            addressLookupTableAccounts: nonNullAddressLookupTableAccounts,
        };
        return web3_js_1.TransactionMessage.decompile(versionedTransaction.message, decompileArgs).instructions;
    }
    async getAddressLookupTableAccounts(keys) {
        const addressLookupTableAccountInfos = await this.connection.getMultipleAccountsInfo(keys.map((key) => new web3_js_1.PublicKey(key)));
        return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
            const addressLookupTableAddress = keys[index];
            if (accountInfo) {
                const addressLookupTableAccount = new web3_js_1.AddressLookupTableAccount({
                    key: new web3_js_1.PublicKey(addressLookupTableAddress),
                    state: web3_js_1.AddressLookupTableAccount.deserialize(accountInfo.data),
                });
                acc.push(addressLookupTableAccount);
            }
            return acc;
        }, new Array());
    }
}
exports.SolanaWalletClient = SolanaWalletClient;
