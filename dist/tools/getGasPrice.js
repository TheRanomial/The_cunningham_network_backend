import { createViemPublicClient } from "../viem/createViemPublicClient.js";
export const gasPriceOptimizationTool = {
    definition: {
        type: "function",
        function: {
            name: "optimize_gas_price",
            description: "Fetch real-time gas prices and recommend an optimized gas price based on user-defined ceiling.",
            parameters: {
                type: "object",
                properties: {
                    userCeiling: {
                        type: "string",
                        description: "The maximum gas price (in Gwei) the user is willing to pay.",
                    },
                },
                required: ["userCeiling"],
            },
        },
    },
    handler: async ({ userCeiling }) => {
        try {
            const userCeilingInWei = BigInt(parseInt(userCeiling) * 10 ** 9);
            const gasPrices = await fetchGasPrices();
            const optimizedGasPrice = getOptimizedGasPrice(gasPrices, userCeilingInWei);
            return {
                low: formatGasPrice(gasPrices.low),
                average: formatGasPrice(gasPrices.average),
                high: formatGasPrice(gasPrices.high),
                optimized: formatGasPrice(optimizedGasPrice),
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to optimize gas price: ${error.message}`);
            }
            else {
                throw new Error("Failed to optimize gas price: Unknown error");
            }
        }
    },
};
async function fetchGasPrices() {
    const client = createViemPublicClient();
    const gasPriceInWei = await client.getGasPrice();
    return {
        low: (gasPriceInWei * 90n) / 100n,
        average: gasPriceInWei,
        high: (gasPriceInWei * 110n) / 100n,
    };
}
function getOptimizedGasPrice(prices, userCeiling) {
    return prices.average < userCeiling ? prices.average : userCeiling;
}
function formatGasPrice(priceInWei) {
    return (priceInWei / BigInt(10 ** 9)).toString();
}
