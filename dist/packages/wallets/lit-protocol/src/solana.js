"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitSolanaWallet = void 0;
exports.createSolanaWallet = createSolanaWallet;
const wrapped_keys_1 = require("@lit-protocol/wrapped-keys");
const web3_js_1 = require("@solana/web3.js");
const wallet_solana_1 = require("@goat-sdk/wallet-solana");
const viem_1 = require("viem");
const { signMessageWithEncryptedKey, signTransactionWithEncryptedKey } = wrapped_keys_1.api;
class LitSolanaWallet extends wallet_solana_1.SolanaWalletClient {
    litNodeClient;
    pkpSessionSigs;
    wrappedKeyMetadata;
    chain;
    constructor(options) {
        super({ connection: options.connection });
        const { litNodeClient, pkpSessionSigs, wrappedKeyMetadata, chain } = options;
        this.litNodeClient = litNodeClient;
        this.pkpSessionSigs = pkpSessionSigs;
        this.wrappedKeyMetadata = wrappedKeyMetadata;
        this.chain = chain;
    }
    getAddress() {
        return this.wrappedKeyMetadata.publicKey;
    }
    async signMessage(message) {
        const signature = await signMessageWithEncryptedKey({
            pkpSessionSigs: this.pkpSessionSigs,
            network: "solana",
            id: this.wrappedKeyMetadata.id,
            messageToSign: message,
            litNodeClient: this.litNodeClient,
        });
        return { signature };
    }
    async sendTransaction({ instructions }) {
        const latestBlockhash = await this.connection.getLatestBlockhash("confirmed");
        const tx = new web3_js_1.Transaction();
        tx.recentBlockhash = latestBlockhash.blockhash;
        tx.feePayer = new web3_js_1.PublicKey(this.wrappedKeyMetadata.publicKey);
        tx.add(...instructions);
        const serializedTransaction = tx
            .serialize({
            requireAllSignatures: false,
            verifySignatures: false,
        })
            .toString("base64");
        const litTransaction = {
            serializedTransaction,
            chain: this.chain,
        };
        const signedTransaction = await signTransactionWithEncryptedKey({
            litNodeClient: this.litNodeClient,
            pkpSessionSigs: this.pkpSessionSigs,
            network: "solana",
            id: this.wrappedKeyMetadata.id,
            unsignedTransaction: litTransaction,
            broadcast: true,
        });
        return {
            hash: signedTransaction,
        };
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
}
exports.LitSolanaWallet = LitSolanaWallet;
function createSolanaWallet(options) {
    return new LitSolanaWallet(options);
}
