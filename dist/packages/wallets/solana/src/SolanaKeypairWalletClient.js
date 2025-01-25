"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solana = exports.SolanaKeypairWalletClient = void 0;
const web3_js_1 = require("@solana/web3.js");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const SolanaWalletClient_1 = require("./SolanaWalletClient");
class SolanaKeypairWalletClient extends SolanaWalletClient_1.SolanaWalletClient {
    #keypair;
    constructor(params) {
        const { keypair, connection } = params;
        super({ connection });
        this.#keypair = keypair;
    }
    getAddress() {
        return this.#keypair.publicKey.toBase58();
    }
    async signMessage(message) {
        const messageBytes = Buffer.from(message);
        const signature = tweetnacl_1.default.sign.detached(messageBytes, this.#keypair.secretKey);
        return {
            signature: Buffer.from(signature).toString("hex"),
        };
    }
    async sendTransaction({ instructions, addressLookupTableAddresses = [], accountsToSign = [] }) {
        const latestBlockhash = await this.connection.getLatestBlockhash();
        const message = new web3_js_1.TransactionMessage({
            payerKey: this.#keypair.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions,
        }).compileToV0Message(await this.getAddressLookupTableAccounts(addressLookupTableAddresses));
        const transaction = new web3_js_1.VersionedTransaction(message);
        transaction.sign([this.#keypair, ...accountsToSign]);
        const hash = await this.connection.sendTransaction(transaction, {
            maxRetries: 10,
            preflightCommitment: "confirmed",
        });
        await this.connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: hash,
        }, "confirmed");
        return {
            hash,
        };
    }
}
exports.SolanaKeypairWalletClient = SolanaKeypairWalletClient;
const solana = (params) => new SolanaKeypairWalletClient(params);
exports.solana = solana;
