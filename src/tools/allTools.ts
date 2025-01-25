import { approveTokenAllowanceTool } from "./approveTokenAllowance.js";
import { crossChainTransferTool } from "./crossChainBridge.js";
import { deployErc20Tool } from "./deployErc20.js";
import { walletSecurityAuditTool } from "./getAuditWallet.js";
import { getBalanceTool } from "./getBalance.js";
import { getChainIDTool } from "./getChain.js";
import { getContractBytecodeTool } from "./getContractByteCode.js";
import { getTokenBalanceTool } from "./getTokenBalance.js";
import { getTransactionCountTool } from "./getTransactionCount.js";
import { getTransactionReceiptTool } from "./getTransactionReceipt.js";
import { getWalletAddressTool } from "./getWalletAddress.js";
import { mintNftTool } from "./mintnft.js";
import { GetNftCollectionTool } from "./opensea/getNftCollection.js";
import { readContractTool } from "./readContract.js";
import { sendTransactionTool } from "./sendTransaction.js";
import { uniswapV3CreatePoolTool } from "./uniswapv3createpool.js";
import { writeContractTool } from "./writeContract.js";

export interface ToolConfig<T = any> {
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  //READ
  get_balance: getBalanceTool,
  get_wallet_address: getWalletAddressTool,
  get_transaction_receipt: getTransactionReceiptTool,
  get_transaction_count: getTransactionCountTool,
  get_contract_bytecode: getContractBytecodeTool,
  get_token_balance: getTokenBalanceTool,
  read_contract: readContractTool,
  get_audit: walletSecurityAuditTool,
  get_nft_cllection: GetNftCollectionTool,
  //-----

  //WRITE
  send_transaction: sendTransactionTool,
  deploy_erc20: deployErc20Tool,
  write_contract: writeContractTool,
  mint_nft: mintNftTool,
  create_uniswap_v3_pool: uniswapV3CreatePoolTool,
  approve_token_allowance: approveTokenAllowanceTool,
  cross_chain_transfer: crossChainTransferTool,
  get_chain_id: getChainIDTool,
  //----
};
