"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoParameters = exports.GetTokenReportParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class GetTokenReportParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    mint: zod_1.z.string().describe("The token mint address to generate the report for"),
})) {
}
exports.GetTokenReportParameters = GetTokenReportParameters;
class NoParameters extends (0, core_1.createToolParameters)(zod_1.z.object({})) {
}
exports.NoParameters = NoParameters;
