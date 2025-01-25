import { Address } from "viem";
import { createViemPublicClient } from "../viem/createViemPublicClient.js";
import { ToolConfig } from "./allTools.js";

interface GetTransactionCountArgs {
  wallet: Address;
}

export const getTransactionCountTool: ToolConfig<GetTransactionCountArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_transaction_count",
      description:
        "Returns the number of Transactions an Account has broadcast / sent.",
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

async function getTransactionCount(wallet: Address) {
  const publicClient = createViemPublicClient();
  const count = await publicClient.getTransactionCount({ address: wallet });
  return count;
}
