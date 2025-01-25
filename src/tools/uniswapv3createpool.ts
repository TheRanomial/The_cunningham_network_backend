import { ToolConfig } from "./allTools.js";
import { createViemWalletClient } from "../viem/createViemWalletClient.js";

const FACTORY_ADDRESS = "0xBb75bDc794cC6f3f584EFe05bC4C019f366C8aA7";
export const pool_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
    ],
    name: "createPool",
    outputs: [
      {
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allPools",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPools",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const uniswapV3CreatePoolTool: ToolConfig = {
  definition: {
    type: "function",
    function: {
      name: "create_uniswap_v3_pool",
      description: "Create a new Uniswap V3 liquidity pool between two tokens",
      parameters: {
        type: "object",
        properties: {
          tokenA: {
            type: "string",
            description: "Address of the first token",
            pattern: "^0x[a-fA-F0-9]{40}$",
          },
          tokenB: {
            type: "string",
            description: "Address of the second token",
            pattern: "^0x[a-fA-F0-9]{40}$",
          },
          fee: {
            type: "string",
            description:
              'Fee tier in basis points (e.g., "500" for 0.05%, "3000" for 0.3%, "10000" for 1%)',
          },
        },
        required: ["tokenA", "tokenB", "fee"],
      },
    },
  },
  handler: async (args: { tokenA: string; tokenB: string; fee: string }) => {
    const walletClient = createViemWalletClient();

    const hash = await walletClient.writeContract({
      address: FACTORY_ADDRESS,
      abi: pool_abi,
      functionName: "createPool",
      args: [
        args.tokenA as `0x${string}`,
        args.tokenB as `0x${string}`,
        Number(args.fee),
      ],
    });

    return hash;
  },
};
