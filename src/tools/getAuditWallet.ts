import { Address } from "viem";
import { createViemPublicClient } from "../viem/createViemPublicClient.js";
import { ToolConfig } from "./allTools.js";

interface WalletSecurityAuditArgs {
  walletAddress: Address;
}

export const walletSecurityAuditTool: ToolConfig<WalletSecurityAuditArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_audit",
      description:
        "Audit a wallet for suspicious activity and vulnerabilities.",
      parameters: {
        type: "object",
        properties: {
          walletAddress: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to audit.",
          },
        },
        required: ["walletAddress"],
      },
    },
  },
  handler: async ({ walletAddress }) => {
    try {
      const auditReport = await auditWallet(walletAddress);

      return auditReport;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Wallet security audit failed: ${error.message}`);
      } else {
        throw new Error("Wallet security audit failed: Unknown error");
      }
    }
  },
};

async function auditWallet(walletAddress: string) {
  const client = createViemPublicClient();

  const transactions = await fetchTransactionHistory(client, walletAddress);
  const blacklistedInteractions = scanForBlacklistedContracts(transactions);
  const largeTransactions = detectLargeTransactions(transactions);
  const recommendations = generateSecurityRecommendations(
    blacklistedInteractions,
    largeTransactions
  );

  return {
    walletAddress,
    blacklistedInteractions,
    largeTransactions,
    recommendations,
  };
}

async function fetchTransactionHistory(
  client: ReturnType<typeof createViemPublicClient>,
  walletAddress: string
) {
  const transactions = await client.getLogs({
    address: walletAddress as Address,
    fromBlock: 0n,
    toBlock: "latest",
  });
  return transactions.map((tx) => ({
    hash: tx.transactionHash,
    blockHash: tx.blockHash,
  }));
}

function scanForBlacklistedContracts(transactions: any[]) {
  const blacklist = [
    "0x1234...blacklistedAddress1",
    "0x5678...blacklistedAddress2",
  ];
  return transactions.filter((tx) => blacklist.includes(tx.to));
}

function detectLargeTransactions(transactions: any[]) {
  const threshold = BigInt(10 ** 18);
  return transactions.filter((tx) => BigInt(tx.value) > threshold);
}

function generateSecurityRecommendations(
  blacklistedInteractions: any[],
  largeTransactions: any[]
) {
  const recommendations = [];
  if (blacklistedInteractions.length > 0) {
    recommendations.push("Avoid interacting with known malicious contracts.");
  }
  if (largeTransactions.length > 0) {
    recommendations.push("Review large transactions to ensure legitimacy.");
  }
  if (recommendations.length === 0) {
    recommendations.push(
      "No issues detected. Consider using a hardware wallet for added security."
    );
  }
  return recommendations;
}
