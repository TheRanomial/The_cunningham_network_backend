import { Address } from "viem";
import { createViemWalletClient } from "../viem/createViemWalletClient.js";
import { ToolConfig } from "./allTools.js";

interface GetWalletAddressArgs {}

export const getChainIDTool: ToolConfig<GetWalletAddressArgs> = {
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
  return chainId;
}
