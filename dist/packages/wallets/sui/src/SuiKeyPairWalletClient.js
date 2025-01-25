"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiKeyPairWalletClient = void 0;
const SuiWalletClient_1 = require("./SuiWalletClient");
class SuiKeyPairWalletClient extends SuiWalletClient_1.SuiWalletClient {
    keypair;
    constructor(params) {
        super({ client: params.client });
        this.keypair = params.keypair;
    }
    /**
     * Send a transaction to the Sui network.
     * This method can handle any type of Sui transaction, including:
     * - Token transfers
     * - Smart contract interactions
     * - Object management
     * - Custom transaction blocks
     */
    async sendTransaction(transaction) {
        const result = await this.client.signAndExecuteTransaction({
            transaction: transaction.transaction,
            signer: this.keypair,
        });
        await this.client.waitForTransaction({
            digest: result.digest,
        });
        return { hash: result.digest };
    }
    async read(query) {
        // Use dynamic field or object read based on the query
        const result = await this.client.getObject({
            id: query.objectId,
            options: {
                showContent: true,
            },
        });
        return {
            value: result.data,
        };
    }
    getAddress() {
        return this.keypair.getPublicKey().toSuiAddress();
    }
    async signMessage(message) {
        const signatureArray = await this.keypair.sign(new TextEncoder().encode(message));
        const signature = Buffer.from(signatureArray).toString("base64");
        return { signature };
    }
}
exports.SuiKeyPairWalletClient = SuiKeyPairWalletClient;
