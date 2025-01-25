"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAPT = exports.SendAPTPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const core_2 = require("@goat-sdk/core");
const viem_1 = require("viem");
const zod_1 = require("zod");
class SendAPTPlugin extends core_1.PluginBase {
    constructor() {
        super("sendAPT", []);
    }
    supportsChain(chain) {
        return chain.type === "aptos";
    }
    getTools(walletClient) {
        const sendTool = (0, core_2.createTool)({
            name: "send_APT",
            description: "Send APT to an address.",
            parameters: sendAPTParametersSchema,
        }, (parameters) => sendAPTMethod(walletClient, parameters));
        return [sendTool];
    }
}
exports.SendAPTPlugin = SendAPTPlugin;
const sendAPT = () => new SendAPTPlugin();
exports.sendAPT = sendAPT;
const sendAPTParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The address to send APT to"),
    amount: zod_1.z.string().describe("The amount of APT to send"),
});
async function sendAPTMethod(walletClient, parameters) {
    try {
        const { to, amount } = parameters;
        const octas = (0, viem_1.parseUnits)(amount, 8);
        const tx = await walletClient.sendTransaction({
            transactionData: {
                function: "0x1::coin::transfer",
                functionArguments: [to, octas],
                typeArguments: ["0x1::aptos_coin::AptosCoin"],
            },
        });
        return tx.hash;
    }
    catch (error) {
        throw new Error(`Failed to send SOL: ${error}`);
    }
}
