"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONRpcPlugin = void 0;
exports.jsonrpc = jsonrpc;
const core_1 = require("@goat-sdk/core");
const jsonrpc_service_1 = require("./jsonrpc.service");
class JSONRpcPlugin extends core_1.PluginBase {
    constructor({ endpoint }) {
        super("jsonrpc", [new jsonrpc_service_1.JSONRpcService({ endpoint })]);
    }
    supportsChain = (chain) => true;
}
exports.JSONRpcPlugin = JSONRpcPlugin;
function jsonrpc({ endpoint }) {
    return new JSONRpcPlugin({ endpoint });
}
