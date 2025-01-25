"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustodialSolanaWalletClient = void 0;
exports.custodialFactory = custodialFactory;
const wallet_solana_1 = require("@goat-sdk/wallet-solana");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const viem_1 = require("viem");
const CrossmintWalletsAPI_1 = require("./CrossmintWalletsAPI");
function getLocator(params) {
    if ("address" in params)
        return params.address;
    if ("email" in params)
        return `email:${params.email}:solana-custodial-wallet`;
    if ("phone" in params)
        return `phone:${params.phone}:solana-custodial-wallet`;
    return `userId:${params.userId}:solana-custodial-wallet`;
}
class CustodialSolanaWalletClient extends wallet_solana_1.SolanaWalletClient {
    #locator;
    #client;
    #address;
    constructor(address, crossmintClient, options) {
        super({ connection: options.connection });
        this.#locator = getLocator(options);
        this.#address = address;
        this.#client = crossmintClient;
    }
    getAddress() {
        return this.#address;
    }
    async signMessage(message) {
        try {
            const { id } = await this.#client.signMessageForCustodialWallet(this.#locator, message);
            while (true) {
                const latestSignature = await this.#client.checkSignatureStatus(id, this.#address);
                if (latestSignature.status === "success") {
                    if (!latestSignature.outputSignature) {
                        throw new Error("Signature is undefined");
                    }
                    return {
                        signature: latestSignature.outputSignature,
                    };
                }
                if (latestSignature.status === "failed") {
                    throw new Error("Signature failed");
                }
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
            }
        }
        catch (error) {
            throw new Error(`Failed to sign message: ${error}`);
        }
    }
    async sendTransaction({ instructions, addressLookupTableAddresses = [] }) {
        const publicKey = new web3_js_1.PublicKey("11111111111111111111111111111112");
        const message = new web3_js_1.TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: "11111111111111111111111111111111",
            instructions,
        }).compileToV0Message(await this.getAddressLookupTableAccounts(addressLookupTableAddresses));
        const transaction = new web3_js_1.VersionedTransaction(message);
        const serializedVersionedTransaction = transaction.serialize();
        const encodedVersionedTransaction = bs58_1.default.encode(serializedVersionedTransaction);
        const { id: transactionId } = await this.#client.createTransactionForCustodialWallet(this.#locator, encodedVersionedTransaction);
        while (true) {
            const latestTransaction = await this.#client.checkTransactionStatus(this.#locator, transactionId);
            if (latestTransaction.status === "success") {
                return {
                    hash: latestTransaction.onChain?.txId ?? "",
                };
            }
            if (latestTransaction.status === "failed") {
                throw new Error(`Transaction failed: ${latestTransaction.onChain?.txId}`);
            }
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
        }
    }
    async balanceOf(address) {
        const pubkey = new web3_js_1.PublicKey(address);
        const balance = await this.connection.getBalance(pubkey);
        return {
            value: (0, viem_1.formatUnits)(BigInt(balance), 9),
            inBaseUnits: balance.toString(),
            decimals: 9,
            symbol: "SOL",
            name: "Solana",
        };
    }
}
exports.CustodialSolanaWalletClient = CustodialSolanaWalletClient;
function custodialFactory(crossmintClient) {
    const walletsApi = new CrossmintWalletsAPI_1.CrossmintWalletsAPI(crossmintClient);
    return async function custodial(options) {
        const { address } = await walletsApi.getWallet(getLocator(options));
        return new CustodialSolanaWalletClient(address, walletsApi, options);
    };
}
