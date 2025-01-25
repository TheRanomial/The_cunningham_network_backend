"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploySuperTokenWrapperParameters = exports.GetTotalFlowRateParameters = exports.GetMemberFlowRateParameters = exports.GetUnitsParameters = exports.UpdateMemberUnitsParameters = exports.GetFlowrateParameters = exports.FlowParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
class FlowParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    token: zod_1.z.string().describe("The address of the Super Token to get the flow of"),
    receiver: zod_1.z.string().describe("The address of the receiver of the flow"),
    flowrate: zod_1.z.string().describe("The flowrate of the flow"),
})) {
}
exports.FlowParameters = FlowParameters;
class GetFlowrateParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    token: zod_1.z.string().describe("The address of the Super Token to get the flow of"),
    sender: zod_1.z.string().describe("The address of the sender of the flow"),
    receiver: zod_1.z.string().describe("The address of the receiver of the flow"),
})) {
}
exports.GetFlowrateParameters = GetFlowrateParameters;
class UpdateMemberUnitsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    poolAddress: zod_1.z.string().describe("The address of the Pool contract"),
    memberAddr: zod_1.z.string().describe("The address of the member to update units for"),
    newUnits: zod_1.z.number().describe("The new units amount for the member"),
})) {
}
exports.UpdateMemberUnitsParameters = UpdateMemberUnitsParameters;
class GetUnitsParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    poolAddress: zod_1.z.string().describe("The address of the Pool contract"),
    memberAddr: zod_1.z.string().describe("The address of the member to get units for"),
})) {
}
exports.GetUnitsParameters = GetUnitsParameters;
class GetMemberFlowRateParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    poolAddress: zod_1.z.string().describe("The address of the Pool contract"),
    memberAddr: zod_1.z.string().describe("The address of the member to get flow rate for"),
})) {
}
exports.GetMemberFlowRateParameters = GetMemberFlowRateParameters;
class GetTotalFlowRateParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    poolAddress: zod_1.z.string().describe("The address of the Pool contract"),
})) {
}
exports.GetTotalFlowRateParameters = GetTotalFlowRateParameters;
class DeploySuperTokenWrapperParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    underlyingToken: zod_1.z.string().describe("The address of the contract to deploy the Super Token Wrapper for"),
    underlyingDecimals: zod_1.z.number().describe("The decimals of the underlying token"),
    upgradability: zod_1.z.enum(["0", "1", "2"]).describe("The upgradability of the Super Token Wrapper"),
    name: zod_1.z.string().describe("The name of the Super Token Wrapper"),
    symbol: zod_1.z.string().describe("The symbol of the Super Token Wrapper"),
})) {
}
exports.DeploySuperTokenWrapperParameters = DeploySuperTokenWrapperParameters;
