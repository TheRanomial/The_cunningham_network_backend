"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFuelETH = exports.SendFuelETHPlugin = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
const sendFuelETHParametersSchema = zod_1.z.object({
    to: zod_1.z.string().describe("The address to send ETH to"),
    amount: zod_1.z.string().describe("The amount of ETH to send"),
});
class SendFuelETHPlugin extends core_1.PluginBase {
    constructor() {
        super("sendFuelETH", []);
    }
    supportsChain(chain) {
        return chain.type === "fuel";
    }
    getTools(walletClient) {
        const sendTool = (0, core_1.createTool)({
            name: "send_fuel_ETH",
            description: "Send ETH to a Fuel address",
            parameters: sendFuelETHParametersSchema,
        }, (parameters) => sendFuelETHMethod(walletClient, parameters));
        return [sendTool];
    }
}
exports.SendFuelETHPlugin = SendFuelETHPlugin;
async function sendFuelETHMethod(walletClient, parameters) {
    try {
        const { to, amount } = parameters;
        const tx = await walletClient.transfer(to, amount);
        return tx.hash;
    }
    catch (error) {
        throw new Error(`Failed to send ETH: ${error}`);
    }
}
const sendFuelETH = () => new SendFuelETHPlugin();
exports.sendFuelETH = sendFuelETH;
