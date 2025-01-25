"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONRpcBodySchema = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class JSONRpcBodySchema extends (0, core_1.createToolParameters)(zod_1.z.object({
    method: zod_1.z.string().describe("A string containing the name of the method to be invoked"),
    params: zod_1.z
        .array(zod_1.z.string())
        .describe("A structured value that holds the parameter value to be used during the invokation of the method"),
    id: zod_1.z.number().describe("An identifier established by the client that must contain a string number or null"),
    jsonrpc: zod_1.z
        .string()
        .describe("A string that specifies the version of the JSON-RPC protocol must be exactly {{'2.0'}}"),
})) {
}
exports.JSONRpcBodySchema = JSONRpcBodySchema;
