"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClientBase = void 0;
const zod_1 = require("zod");
const ToolBase_1 = require("./ToolBase");
class WalletClientBase {
    getCoreTools() {
        return [
            (0, ToolBase_1.createTool)({
                name: "get_address",
                description: "Get the address of the wallet",
                parameters: zod_1.z.object({}),
            }, () => this.getAddress()),
            (0, ToolBase_1.createTool)({
                name: "get_chain",
                description: "Get the chain of the wallet",
                parameters: zod_1.z.object({}),
            }, () => this.getChain()),
            (0, ToolBase_1.createTool)({
                name: "get_balance",
                description: "Get the balance of the wallet",
                parameters: zod_1.z.object({ address: zod_1.z.string() }),
            }, (parameters) => this.balanceOf(parameters.address)),
            (0, ToolBase_1.createTool)({
                name: "sign_message",
                description: "Sign a message with the wallet",
                parameters: zod_1.z.object({ message: zod_1.z.string() }),
            }, (parameters) => this.signMessage(parameters.message)),
        ];
    }
}
exports.WalletClientBase = WalletClientBase;
