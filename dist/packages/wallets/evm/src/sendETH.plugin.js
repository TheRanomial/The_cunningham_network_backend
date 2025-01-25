"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendETH = exports.SendETHPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
const allEVMChains = __importStar(require("viem/chains"));
const zod_1 = require("zod");
class SendETHPlugin extends core_1.PluginBase {
    constructor() {
        super("sendETH", []);
    }
    supportsChain = (chain) => chain.type === "evm";
    getTools(walletClient) {
        const sendTool = (0, core_1.createTool)({
            name: `send_${getChainToken(walletClient.getChain().id).symbol}`,
            description: `Send ${getChainToken(walletClient.getChain().id).symbol} to an address.`,
            parameters: sendETHParametersSchema,
        }, (parameters) => sendETHMethod(walletClient, parameters));
        return [sendTool];
    }
}
exports.SendETHPlugin = SendETHPlugin;
const sendETH = () => new SendETHPlugin();
exports.sendETH = sendETH;
const sendETHParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The address to send ETH to"),
    amount: zod_1.z.string().describe("The amount of ETH to send"),
});
async function sendETHMethod(walletClient, parameters) {
    try {
        const amount = (0, viem_1.parseEther)(parameters.amount);
        const tx = await walletClient.sendTransaction({
            to: parameters.to,
            value: amount,
        });
        return tx.hash;
    }
    catch (error) {
        throw new Error(`Failed to send ${getChainToken(walletClient.getChain().id)}: ${error}`);
    }
}
function getChainToken(chainId) {
    // Get all viem chains
    const allChains = Object.values(allEVMChains);
    // Find matching chain by ID
    const viemChain = allChains.find((c) => c.id === chainId);
    if (!viemChain) {
        throw new Error(`Unsupported EVM chain ID: ${chainId}`);
    }
    return {
        symbol: viemChain.nativeCurrency.symbol,
        name: viemChain.nativeCurrency.name,
        decimals: viemChain.nativeCurrency.decimals,
    };
}
