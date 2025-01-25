import { createViemWalletClient } from "../viem/createViemWalletClient.js";
export const getChainIDTool = {
    definition: {
        type: "function",
        function: {
            name: "get_chain_id",
            description: "Get the connected chain id",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    },
    handler: async () => {
        return await getChainId();
    },
};
async function getChainId() {
    const walletClient = createViemWalletClient();
    const chainId = await walletClient.getChainId();
    console.log(chainId);
    return chainId;
}
