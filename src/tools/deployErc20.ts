import { ToolConfig } from "./allTools.js";
import { createViemWalletClient } from "../viem/createViemWalletClient.js";
import { createViemPublicClient } from "../viem/createViemPublicClient.js";
import { erc20_abi } from "./erc20_abi.js";
import { erc20_bytecode } from "./erc20_bytecode.js";

export const deployErc20Tool: ToolConfig = {
  definition: {
    type: "function",
    function: {
      name: "deploy_erc20",
      description: "Deploy a new ERC20 token contract",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the token",
          },
          symbol: {
            type: "string",
            description: "The symbol of the token",
          },
          initialSupply: {
            type: "string",
            description:
              'Initial supply in natural language (e.g., "one million", "half a billion", "10k", "1.5M tokens"). Interpret the amount and format it into a number amount and then convert it into wei. Defaults to 1 billion tokens if not specified.',
          },
        },
        required: ["name", "symbol"],
      },
    },
  },
  handler: async (args: {
    name: string;
    symbol: string;
    initialSupply?: string;
  }) => {
    try {
      const baseNumber = parseFloat(args.initialSupply || "100000");

      const publicClient = createViemPublicClient();
      const walletClient = createViemWalletClient();

      const hash = await walletClient.deployContract({
        account: walletClient.account,
        abi: erc20_abi,
        bytecode: erc20_bytecode,
        args: [args.name, args.symbol, baseNumber],
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      return `${args.name} (${args.symbol}) token deployed successfully at: ${receipt.contractAddress}`;
    } catch (error: any) {
      console.error(
        "An error occurred during contract deployment:",
        error.message || error
      );
      throw new Error(
        `Failed to deploy ${args.name} (${args.symbol}) token. Please check the logs for details.`
      );
    }
  },
};
