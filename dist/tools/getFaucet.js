import "dotenv/config";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
export const getFaucetTool = {
    definition: {
        type: "function",
        function: {
            name: "get_faucet",
            description: "Get test ETH for base sepolia network",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    },
    handler: async () => {
        return await getFaucet();
    },
};
const CDP_API_KEY_NAME = "organizations/a7188a3c-6946-4ca2-abc5-26d7efed4994/apiKeys/90df3816-cb83-4589-aad6-257d8e4a7f56";
const CDP_API_KEY_SECRET = "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIGZzBDcqp1+/WSqdIBkrRwhVWxm9eAHos9HwuTThEFuzoAoGCCqGSM49\nAwEHoUQDQgAEE9guLpjRggf7Zv6wz1SVWyDEjyTqeoeeKGorDTg2IWYr3WDQVBtx\n2WlJLFNTqVX3QUwdDEv/5u+h4aPKqT4TBw==\n-----END EC PRIVATE KEY-----\n";
// Make sure these environment variables are properly set in your .env file
const API_KEY_NAME = process.env.CDP_API_KEY_NAME;
const PRIVATE_KEY = process.env.CDP_API_KEY_SECRET?.replace("\\n", "\n");
const mnemonic = process.env.MNEMONIC ||
    "amazing dentist donate version exotic sudden aspect lobster sphere hold jeans peanut";
async function getFaucet() {
    try {
        if (!API_KEY_NAME || !PRIVATE_KEY) {
            throw new Error("Missing API key or private key. Please check your environment variables.");
        }
        Coinbase.configure({
            apiKeyName: API_KEY_NAME,
            privateKey: PRIVATE_KEY,
        });
        let importedWallet = await Wallet.import({
            mnemonicPhrase: mnemonic,
            network_id: "",
        });
        const faucetTransaction = await importedWallet.faucet();
        console.log("Faucet transaction details:", faucetTransaction);
        return faucetTransaction;
    }
    catch (error) {
        console.error("Detailed error:", error);
        throw error;
    }
}
