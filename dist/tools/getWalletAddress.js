import { createViemWalletClient } from "../viem/createViemWalletClient.js";
export const getWalletAddressTool = {
    definition: {
        type: "function",
        function: {
            name: "get_wallet_address",
            description: "Get the connected wallet address",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    },
    handler: async () => {
        return await getWalletAddress();
    },
};
async function getWalletAddress() {
    const walletClient = createViemWalletClient();
    const [address] = await walletClient.getAddresses();
    return address;
}
