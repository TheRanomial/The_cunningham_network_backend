import { ethers } from "ethers";
import { ToolConfig } from "./allTools.js";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  parseUnits,
  formatUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia, lineaSepolia } from "viem/chains";
import { bridge_abi } from "./bridge_abi.js";

const ERC20_ABI = parseAbi([
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function decimals() external view returns (uint8)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
]);

type Protocol = "layerZero" | "axelar";
type Chain =
  | "ethereum"
  | "polygon"
  | "bsc"
  | "arbitrum"
  | "avalanche"
  | "lineaSepolia"
  | "sepolia";

const chainRPCs: Record<string, string> = {
  sepolia:
    "https://eth-sepolia.g.alchemy.com/v2/vg6DD9GmduZ75YH8EMj0A5H8EwwZd61m",
  goerli: "https://rpc.goerli.mudit.blog/",
  mumbai: "https://rpc-mumbai.maticvigil.com",
  bscTestnet: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  arbitrumGoerli: "https://goerli-rollup.arbitrum.io/rpc",
  avalancheFuji: "https://api.avax-test.network/ext/bc/C/rpc",
  lineaSepolia: "https://rpc.linea.build/",
};

interface BridgeConfig {
  bridgeAddress: string;
  supportedChains: number[];
}

interface BridgeConfigs {
  layerZero: {
    ethereum: BridgeConfig;
    polygon?: BridgeConfig;
    bsc?: BridgeConfig;
    arbitrum?: BridgeConfig;
    avalanche?: BridgeConfig;
    sepolia?: BridgeConfig;
    goerli?: BridgeConfig;
    lineaSepolia?: BridgeConfig;
  };
  axelar: {
    ethereum: BridgeConfig;
    polygon?: BridgeConfig;
    bsc?: BridgeConfig;
    arbitrum?: BridgeConfig;
    avalanche?: BridgeConfig;
    sepolia?: BridgeConfig;
    goerli?: BridgeConfig;
    lineaSepolia?: BridgeConfig;
  };
}

interface CrossChainTransferArgs {
  sourceChain: string;
  destinationChain: string;
  tokenAddress: string;
  amount: string;
  recipientAddress: string;
  bridgeProtocol: string;
}

const bridgeTimes: Record<Protocol, { default: number; [key: string]: any }> = {
  layerZero: {
    default: 15 * 60,
    ethereum: {
      polygon: 10 * 60,
      bsc: 15 * 60,
      arbitrum: 5 * 60,
    },
  },
  axelar: {
    default: 20 * 60,
    ethereum: {
      polygon: 15 * 60,
      avalanche: 20 * 60,
    },
  },
};

const BRIDGE_ABI = parseAbi([
  "function bridge(address token, uint256 amount, uint256 destinationChainId, address recipient) external",
  "function estimateFees(uint256 destinationChainId, address token, uint256 amount) external view returns (uint256)",
  "function getBridgeStatus(bytes32 transferId) external view returns (uint8 status, uint256 timestamp)",
]);

const BRIDGE_CONFIGS: BridgeConfigs = {
  layerZero: {
    ethereum: {
      bridgeAddress: "0xb8901acB165ed027E32754E0FFe830802919727f",
      supportedChains: [1, 137, 56, 42161, 11155111, 5, 59144], // Includes Sepolia and Goerli
    },
    sepolia: {
      bridgeAddress: "0x4A5ace49081f836fF3D8f7044503610315c5f092", // Replace with actual bridge address
      supportedChains: [11155111, 5, 59144], // Sepolia <-> Goerli
    },
    lineaSepolia: {
      bridgeAddress: "0x93DcAdf238932e6e6a85852caC89cBd71798F463", // Replace with actual Linea Sepolia bridge address
      supportedChains: [11155111, 5, 59140, 59144], // Includes Linea Sepolia
    },
  },
  axelar: {
    ethereum: {
      bridgeAddress: "0xb8901acB165ed027E32754E0FFe830802919727f",
      supportedChains: [1, 137, 43114, 11155111, 5, 59144], // Includes Sepolia and Goerli
    },
    sepolia: {
      bridgeAddress: "0xc644cc19d2A9388b71dd1dEde07cFFC73237Dca8",
      supportedChains: [11155111, 5, 59144],
    },
    lineaSepolia: {
      bridgeAddress: "0x93DcAdf238932e6e6a85852caC89cBd71798F463", // Replace with actual Linea Sepolia bridge address
      supportedChains: [11155111, 5, 59144], // Includes Linea Sepolia
    },
  },
};

function isValidProtocol(protocol: string): protocol is Protocol {
  return Object.keys(BRIDGE_CONFIGS).includes(protocol);
}

function isValidChain(chain: string): chain is Chain {
  const allChains: Chain[] = [
    "ethereum",
    "polygon",
    "bsc",
    "arbitrum",
    "avalanche",
    "sepolia",
    "lineaSepolia",
  ];
  return allChains.includes(chain as Chain);
}

export const crossChainTransferTool: ToolConfig = {
  definition: {
    type: "function",
    function: {
      name: "cross_chain_transfer",
      description:
        "Transfer tokens across different blockchain networks using various bridge protocols",
      parameters: {
        type: "object",
        properties: {
          sourceChain: {
            type: "string",
            description:
              "Source blockchain network (e.g., 'ethereum', 'polygon')",
          },
          destinationChain: {
            type: "string",
            description: "Destination blockchain network",
          },
          tokenAddress: {
            type: "string",
            description: "Token contract address on source chain",
          },
          amount: {
            type: "string",
            description: "Amount of tokens to transfer (in wei)",
          },
          recipientAddress: {
            type: "string",
            description: "Recipient address on destination chain",
          },
          bridgeProtocol: {
            type: "string",
            description: "Bridge protocol to use (e.g., 'layerZero', 'axelar')",
          },
        },
        required: [
          "sourceChain",
          "destinationChain",
          "tokenAddress",
          "amount",
          "recipientAddress",
          "bridgeProtocol",
        ],
      },
    },
  },
  handler: async (args: CrossChainTransferArgs) => {
    try {
      if (!isValidProtocol(args.bridgeProtocol)) {
        console.error(`Unsupported bridge protocol: ${args.bridgeProtocol}`);
        throw new Error(`Unsupported bridge protocol: ${args.bridgeProtocol}`);
      }

      if (!isValidChain(args.sourceChain)) {
        console.error(`Unsupported source chain: ${args.sourceChain}`);
        throw new Error(`Unsupported source chain: ${args.sourceChain}`);
      }

      const bridgeConfig =
        BRIDGE_CONFIGS[args.bridgeProtocol][args.sourceChain];
      if (!bridgeConfig) {
        throw new Error(
          `Bridge protocol ${args.bridgeProtocol} not supported for ${args.sourceChain}`
        );
      }

      const chainIds: Record<
        Chain | "sepolia" | "goerli" | "mumbai" | "bscTestnet" | "lineaSepolia",
        number
      > = {
        ethereum: 1,
        sepolia: 11155111,
        goerli: 5,
        polygon: 137,
        mumbai: 80001,
        bsc: 56,
        bscTestnet: 97,
        arbitrum: 42161,
        avalanche: 43114,
        lineaSepolia: 59144,
      };

      if (!isValidChain(args.destinationChain)) {
        throw new Error(
          `Unsupported destination chain: ${args.destinationChain}`
        );
      }

      const destinationChainId = chainIds[args.destinationChain];

      // Validate that destination chain is supported
      if (!bridgeConfig.supportedChains.includes(destinationChainId)) {
        throw new Error(
          `Destination chain ${args.destinationChain} not supported for this bridge configuration`
        );
      }

      const account = privateKeyToAccount(
        "0xd82a39ab849fa5fa2b9c4f2acd7260a9af7c8e593155c4cca255e927700ab762"
      );

      const publicClient = createPublicClient({
        chain: args.sourceChain === "sepolia" ? sepolia : lineaSepolia,
        transport: http(chainRPCs[args.sourceChain]),
      });

      const walletClient = createWalletClient({
        account,
        chain: args.sourceChain === "sepolia" ? sepolia : lineaSepolia,
        transport: http(chainRPCs[args.sourceChain]),
      });

      // Get token decimals
      const decimals = await publicClient.readContract({
        address: args.tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "decimals",
      });

      const adjustedAmount = parseUnits(args.amount, decimals);

      // Check token balance
      const balance = await publicClient.readContract({
        address: args.tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [account.address],
      });

      if (balance < adjustedAmount) {
        throw new Error(
          `Insufficient token balance. Required: ${
            args.amount
          }, Available: ${formatUnits(balance, decimals)}`
        );
      }

      // Check allowance
      const currentAllowance = await publicClient.readContract({
        address: args.tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [account.address, bridgeConfig.bridgeAddress as `0x${string}`],
      });

      // Approve if necessary
      if (currentAllowance < adjustedAmount) {
        const { request: approveRequest } = await publicClient.simulateContract(
          {
            account,
            address: args.tokenAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [bridgeConfig.bridgeAddress as `0x${string}`, adjustedAmount],
          }
        );

        const approveHash = await walletClient.writeContract(approveRequest);

        // Wait for approval transaction
        const approveReceipt = await publicClient.waitForTransactionReceipt({
          hash: approveHash,
        });
      }

      // Add a small delay after approval
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Bridge transaction
      const { request: bridgeRequest } = await publicClient.simulateContract({
        account,
        address: bridgeConfig.bridgeAddress as `0x${string}`,
        abi: bridge_abi,
        functionName: "bridge",
        args: [
          args.tokenAddress as `0x${string}`,
          adjustedAmount,
          BigInt(chainIds[args.destinationChain]),
          args.recipientAddress as `0x${string}`,
        ],
      });

      const bridgeHash = await walletClient.writeContract(bridgeRequest);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: bridgeHash,
      });

      return {
        status: "success",
        transactionHash: receipt.transactionHash,
        bridgeProtocol: args.bridgeProtocol,
        sourceChain: args.sourceChain,
        destinationChain: args.destinationChain,
        amount: args.amount,
        estimatedTime: getBridgeTime(
          args.bridgeProtocol,
          args.sourceChain,
          args.destinationChain
        ),
        trackingUrl: generateTrackingUrl(
          args.bridgeProtocol,
          receipt.transactionHash
        ),
      };
    } catch (error) {
      console.error("Error during bridge transfer:", error);
      if (error instanceof Error) {
        throw new Error(`Bridge transfer failed: ${error.message}`);
      }
      throw new Error(`Bridge transfer failed: ${String(error)}`);
    }
  },
};

function getBridgeTime(
  protocol: Protocol,
  sourceChain: Chain,
  destChain: Chain
): number {
  const protocolTimes = bridgeTimes[protocol];

  if (typeof protocolTimes[sourceChain] === "object") {
    const sourceChainTimes = protocolTimes[sourceChain] as Record<
      string,
      number
    >;
    return sourceChainTimes[destChain] ?? protocolTimes.default;
  }

  return protocolTimes.default;
}

function generateTrackingUrl(protocol: string, txHash: string): string {
  const trackingUrls: Record<Protocol, string> = {
    layerZero: `https://layerzeroscan.com/tx/${txHash}`,
    axelar: `https://axelarscan.io/transfer/${txHash}`,
  };
  return isValidProtocol(protocol) ? trackingUrls[protocol] : "";
}

// Rest of the code remains the same...
/*interface MonitorTransferArgs {
  transferId: string;
  bridgeProtocol: string;
}

// Add monitoring tool for cross-chain transfers
export const monitorCrossChainTransferTool: ToolConfig = {
  definition: {
    type: "function",
    function: {
      name: "monitor_cross_chain_transfer",
      description: "Monitor the status of a cross-chain token transfer",
      parameters: {
        type: "object",
        properties: {
          transferId: {
            type: "string",
            description: "Transfer ID or transaction hash",
          },
          bridgeProtocol: {
            type: "string",
            description: "Bridge protocol used for transfer",
          },
        },
        required: ["transferId", "bridgeProtocol"],
      },
    },
  },
  handler: async (args: MonitorTransferArgs) => {
    try {
      const provider = new ethers.JsonRpcProvider(chainRPCs[]);

      if (!isValidProtocol(args.bridgeProtocol)) {
        throw new Error(`Unsupported bridge protocol: ${args.bridgeProtocol}`);
      }

      // Cast to Protocol type after validation
      const protocol = args.bridgeProtocol as Protocol;

      // Access the bridge configuration safely
      const bridgeConfig = BRIDGE_CONFIGS[protocol].ethereum;
      if (!bridgeConfig) {
        throw new Error(
          `Bridge configuration not found for protocol: ${protocol}`
        );
      }

      const bridgeContract = new ethers.Contract(
        bridgeConfig.bridgeAddress,
        BRIDGE_ABI,
        provider
      );

      const [status, timestamp] = await bridgeContract.getBridgeStatus(
        args.transferId
      );

      return {
        status: translateStatus(status),
        timestamp: new Date(timestamp * 1000).toISOString(),
        trackingUrl: generateTrackingUrl(protocol, args.transferId),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to monitor transfer: ${error.message}`);
      } else {
        throw new Error(`Failed to monitor transfer: ${String(error)}`);
      }
    }
  },
};
// Helper function to translate status codes
function translateStatus(status: number): string {
  const statusMap: { [key: number]: string } = {
    0: "Pending",
    1: "Processing",
    2: "Completed",
    3: "Failed",
  };
  return statusMap[status] || "Unknown";
}*/
