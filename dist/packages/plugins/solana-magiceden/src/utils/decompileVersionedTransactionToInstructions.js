"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompileVersionedTransactionToInstructions = decompileVersionedTransactionToInstructions;
const web3_js_1 = require("@solana/web3.js");
async function decompileVersionedTransactionToInstructions(connection, versionedTransaction) {
    const lookupTableAddresses = versionedTransaction.message.addressTableLookups.map((lookup) => lookup.accountKey);
    const addressLookupTableAccounts = await Promise.all(lookupTableAddresses.map((address) => connection.getAddressLookupTable(address).then((lookupTable) => lookupTable.value)));
    const nonNullAddressLookupTableAccounts = addressLookupTableAccounts.filter((lookupTable) => lookupTable != null);
    const decompileArgs = {
        addressLookupTableAccounts: nonNullAddressLookupTableAccounts,
    };
    return web3_js_1.TransactionMessage.decompile(versionedTransaction.message, decompileArgs).instructions;
}
