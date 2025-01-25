"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSUIPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const transactions_1 = require("@mysten/sui/transactions");
const zod_1 = require("zod");
const sendSUIParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The recipient's address"),
    amount: zod_1.z.number().describe("The amount of SUI to send"),
});
const sendSUIMethod = async (walletClient, parameters) => {
    const { to, amount } = parameters;
    const tx = new transactions_1.Transaction();
    const [coin] = tx.splitCoins(tx.gas, [amount]);
    tx.transferObjects([coin], to);
    return walletClient.sendTransaction({
        transaction: tx,
    });
};
class SendSUIPlugin extends core_1.PluginBase {
    constructor() {
        super("sendSUI", []);
    }
    supportsChain = (chain) => chain.type === "sui";
    getTools(walletClient) {
        const sendTool = (0, core_1.createTool)({
            name: "send_sui",
            description: "Send SUI to an address.",
            parameters: sendSUIParametersSchema,
        }, 
        // Implement the method
        (parameters) => sendSUIMethod(walletClient, parameters));
        return [sendTool];
    }
}
exports.SendSUIPlugin = SendSUIPlugin;
