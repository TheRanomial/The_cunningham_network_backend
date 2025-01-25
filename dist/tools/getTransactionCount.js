import { createViemPublicClient } from "../viem/createViemPublicClient.js";
export const getTransactionCountTool = {
    definition: {
        type: "function",
        function: {
            name: "get_transaction_count",
            description: "Returns the number of Transactions an Account has broadcast / sent.",
            parameters: {
                type: "object",
                properties: {
                    wallet: {
                        type: "string",
                        pattern: "^0x[a-fA-F0-9]{40}$",
                        description: "The wallet address to get the transactions of",
                    },
                },
                required: ["wallet"],
            },
        },
    },
    handler: async ({ wallet }) => {
        return await getTransactionCount(wallet);
    },
};
async function getTransactionCount(wallet) {
    const publicClient = createViemPublicClient();
    const count = await publicClient.getTransactionCount({ address: wallet });
    return count;
}
