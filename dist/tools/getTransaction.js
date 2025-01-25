import { createViemPublicClient } from "../viem/createViemPublicClient.js";
export const getTransactionTool = {
    definition: {
        type: "function",
        function: {
            name: "get_transaction_details",
            description: "Retrieve details about an Ethereum transaction using its transaction hash. The details include block hash, block number, sender, receiver, gas used, transaction value, and more.",
            parameters: {
                type: "object",
                properties: {
                    hash: {
                        type: "string",
                        pattern: "^0x[a-fA-F0-9]{40}$",
                        description: "The 64-character transaction hash (starting with 0x) to retrieve details for.",
                    },
                },
                required: ["hash"],
            },
        },
    },
    handler: async ({ hash }) => {
        return await getTransaction(hash);
    },
};
function extractTransactionDetails(transaction) {
    return {
        blockHash: transaction.blockHash,
        nonce: transaction.nonce,
        to: transaction.to,
        gasPrice: transaction.gasPrice,
    };
}
export async function getTransaction(hash) {
    const walletClient = createViemPublicClient();
    const transaction = await walletClient.getTransaction({ hash });
    return extractTransactionDetails(transaction);
}
