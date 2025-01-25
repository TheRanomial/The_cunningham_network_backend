import { createViemWalletClient } from "../viem/createViemWalletClient.js";
import { ToolConfig } from "./allTools.js";
import { Chain, avalanche, mainnet, polygon } from "viem/chains";

interface SwitchChainArgs {
  chain: string;
}

export const switchChainTool: ToolConfig<SwitchChainArgs> = {
  definition: {
    type: "function",
    function: {
      name: "switch_target_chain",
      description: "Switch the target chain in a wallet.",
      parameters: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            description: "The name of the chain to switch/add to",
          },
        },
        required: ["chain"],
      },
    },
  },
  handler: async ({ chain }) => {
    return await switchTargetChain(chain);
  },
};

async function switchTargetChain(chain: string) {
  const chainMap: Record<string, Chain> = {
    avalanche,
    ethereum: mainnet,
    polygon,
  };

  const targetChain = chainMap[chain.toLowerCase()];
  if (!targetChain) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  const walletClient = createViemWalletClient();

  try {
    await walletClient.addChain({ chain: targetChain });
    return `Added chain ${targetChain.name} successfully`;
  } catch (error: any) {
    throw new Error(`Failed to switch to chain ${chain}: ${error.message}`);
  }
}
