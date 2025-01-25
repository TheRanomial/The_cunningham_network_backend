"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDLMMPositionParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class CreateDLMMPositionParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    poolAddress: zod_1.z.string().describe("The pool address"),
    amount: zod_1.z.string().describe("The amount of tokens to swap in the tokens base unit"),
})) {
}
exports.CreateDLMMPositionParameters = CreateDLMMPositionParameters;
