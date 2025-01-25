"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crossmintHeadlessCheckout = exports.CrossmintHeadlessCheckoutPlugin = void 0;
const common_sdk_base_1 = require("@crossmint/common-sdk-base");
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
const package_json_1 = __importDefault(require("../package.json"));
const parameters_1 = require("./parameters");
class CrossmintHeadlessCheckoutPlugin extends core_1.PluginBase {
    crossmint;
    callDataSchema;
    crossmintApiClient;
    constructor(crossmint, callDataSchema) {
        super("crossmint-headless-checkout", []);
        this.crossmint = crossmint;
        this.callDataSchema = callDataSchema;
        const validatedCrossmint = (0, common_sdk_base_1.createCrossmint)(crossmint, {
            usageOrigin: "server",
        });
        this.crossmintApiClient = new common_sdk_base_1.CrossmintApiClient(validatedCrossmint, {
            internalConfig: {
                sdkMetadata: {
                    name: "@goat-sdk/plugin-crossmint-headless-checkout",
                    version: package_json_1.default.version,
                },
            },
        });
    }
    supportsChain(chain) {
        return chain.type === "evm"; // TODO: Add support for more blockchains
    }
    async getTools(walletClient) {
        const superTools = await super.getTools(walletClient);
        return [
            ...superTools,
            (0, core_1.createTool)({
                name: "buy_token",
                description: "Buy a token such as an NFT, SFT or item tokenized by them, listed on any blockchain",
                parameters: (0, parameters_1.getCreateAndPayOrderParameters)(this.callDataSchema),
            }, async (params) => {
                const res = await this.crossmintApiClient.post("/api/2022-06-09/orders", {
                    body: JSON.stringify(params),
                    headers: {
                        "x-api-key": this.crossmint.apiKey,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    let errorMessage = `Failed to create buy order: ${res.status} ${res.statusText}`;
                    try {
                        const json = await res.json();
                        errorMessage += `\n\n${JSON.stringify(json, null, 2)}`;
                    }
                    catch (e) {
                        console.error("Failed to parse JSON response:", e);
                    }
                    throw new Error(errorMessage);
                }
                const { order } = (await res.json());
                console.log("Created order:", order.orderId);
                const serializedTransaction = order.payment.preparation != null && "serializedTransaction" in order.payment.preparation
                    ? order.payment.preparation.serializedTransaction
                    : undefined;
                if (!serializedTransaction) {
                    throw new Error(`No serialized transaction found for order, this item may not be available for purchase:\n\n ${JSON.stringify(order, null, 2)}`);
                }
                const transaction = (0, viem_1.parseTransaction)(serializedTransaction);
                if (transaction.to == null) {
                    throw new Error("Transaction to is null");
                }
                console.log("Paying order:", order.orderId);
                const sendRes = await walletClient.sendTransaction({
                    to: transaction.to,
                    value: transaction.value || 0n,
                    data: transaction.data,
                });
                return { order, txId: sendRes.hash };
            }),
        ];
    }
}
exports.CrossmintHeadlessCheckoutPlugin = CrossmintHeadlessCheckoutPlugin;
const crossmintHeadlessCheckout = (crossmint, callDataSchema) => {
    return new CrossmintHeadlessCheckoutPlugin(crossmint, callDataSchema);
};
exports.crossmintHeadlessCheckout = crossmintHeadlessCheckout;
