"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSOL = exports.SendSOLPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const core_2 = require("@goat-sdk/core");
const web3_js_1 = require("@solana/web3.js");
const web3_js_2 = require("@solana/web3.js");
const viem_1 = require("viem");
const zod_1 = require("zod");
class SendSOLPlugin extends core_1.PluginBase {
    constructor() {
        super("sendSOL", []);
    }
    supportsChain(chain) {
        return chain.type === "solana";
    }
    getTools(walletClient) {
        const sendTool = (0, core_2.createTool)({
            name: "send_SOL",
            description: "Send SOL to an address.",
            parameters: sendSOLParametersSchema,
        }, (parameters) => sendSOLMethod(walletClient, parameters));
        return [sendTool];
    }
}
exports.SendSOLPlugin = SendSOLPlugin;
const sendSOL = () => new SendSOLPlugin();
exports.sendSOL = sendSOL;
const sendSOLParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The address to send SOL to"),
    amount: zod_1.z.string().describe("The amount of SOL to send"),
});
async function sendSOLMethod(walletClient, parameters) {
    try {
        const { to, amount } = parameters;
        const senderAddress = walletClient.getAddress();
        const lamports = (0, viem_1.parseUnits)(amount, 9);
        const transferInstruction = web3_js_1.SystemProgram.transfer({
            fromPubkey: new web3_js_2.PublicKey(senderAddress),
            toPubkey: new web3_js_2.PublicKey(to),
            lamports,
        });
        const txResult = await walletClient.sendTransaction({
            instructions: [transferInstruction],
        });
        return txResult.hash;
    }
    catch (error) {
        throw new Error(`Failed to send SOL: ${error}`);
    }
}
