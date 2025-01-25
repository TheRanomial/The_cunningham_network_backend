"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCHR = exports.SendCHRPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const core_2 = require("@goat-sdk/core");
const zod_1 = require("zod");
class SendCHRPlugin extends core_1.PluginBase {
    constructor() {
        super("sendCHR", []);
    }
    supportsChain(chain) {
        return chain.type === "chromia";
    }
    getTools(walletClient) {
        const sendTool = (0, core_2.createTool)({
            name: "send_CHR",
            description: "Send a Chromia asset to an address",
            parameters: sendCHRParametersSchema,
        }, (parameters) => sendCHRMethod(walletClient, parameters));
        return [sendTool];
    }
}
exports.SendCHRPlugin = SendCHRPlugin;
const sendCHR = () => new SendCHRPlugin();
exports.sendCHR = sendCHR;
const sendCHRParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The address to send the Chromia asset to"),
    amount: zod_1.z.string().describe("The amount of the Chromia asset to send"),
});
async function sendCHRMethod(walletClient, parameters) {
    try {
        const { to, amount } = parameters;
        const { assetId, connection } = walletClient.params;
        const { receipt } = await walletClient.sendTransaction({
            to,
            assetId,
            amount,
        });
        return `https://explorer.chromia.com/${walletClient.networkName}/${connection.blockchainRid.toString("hex")}/transaction/${receipt.transactionRid.toString("hex")}`;
    }
    catch (error) {
        console.error("Debug - Error Details:", error);
        return `Error sending the Chromia asset. Ensure the recipient address, asset ID, and amount are correct. Details: ${error}`;
    }
}
