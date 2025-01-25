"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveSNSDomainParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class ResolveSNSDomainParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    domain: zod_1.z.string(),
})) {
}
exports.ResolveSNSDomainParameters = ResolveSNSDomainParameters;
