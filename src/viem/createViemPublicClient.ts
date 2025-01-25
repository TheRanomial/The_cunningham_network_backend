import { createPublicClient, http } from "viem";
import { abstractTestnet, sepolia, mainnet, polygon } from "viem/chains";

export function createViemPublicClient() {
  return createPublicClient({
    chain: sepolia,
    transport: http(),
  });
}
