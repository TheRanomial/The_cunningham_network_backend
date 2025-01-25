"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVotingPowerParameters = exports.ChangeVotesParameters = exports.VoteOnGaugesParameters = exports.GetGaugeInfoParameters = exports.GetAllGaugesParameters = void 0;
const core_1 = require("@goat-sdk/core");
const zod_1 = require("zod");
// For getting all gauges
class GetAllGaugesParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    voterType: zod_1.z.enum(["veMODE", "veBPT"]).describe("Type of voter contract to query (veMODE or veBPT)"),
})) {
}
exports.GetAllGaugesParameters = GetAllGaugesParameters;
// For getting specific gauge info
class GetGaugeInfoParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    voterType: zod_1.z.enum(["veMODE", "veBPT"]).describe("Type of voter contract to query (veMODE or veBPT)"),
    gaugeAddress: zod_1.z.string().describe("Address of the gauge to query"),
})) {
}
exports.GetGaugeInfoParameters = GetGaugeInfoParameters;
// Add this new parameter class
class VoteOnGaugesParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    voterType: zod_1.z.enum(["veMODE", "veBPT"]).describe("Type of voter contract to query (veMODE or veBPT)"),
    tokenId: zod_1.z.string().describe("The NFT token ID representing your voting power"),
    votes: zod_1.z
        .array(zod_1.z.object({
        gauge: zod_1.z.string().describe("Address of the gauge to vote on"),
        weight: zod_1.z.string().describe("Weight percentage for this gauge (0-100)"),
    }))
        .min(1)
        .describe("Array of gauge addresses and their corresponding vote weights"),
})) {
}
exports.VoteOnGaugesParameters = VoteOnGaugesParameters;
class ChangeVotesParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    voterType: zod_1.z.enum(["veMODE", "veBPT"]).describe("Type of voter contract to query (veMODE or veBPT)"),
    tokenId: zod_1.z.string().describe("The NFT token ID to change votes for"),
    votes: zod_1.z
        .array(zod_1.z.object({
        gauge: zod_1.z.string().describe("Address of the gauge to vote on"),
        weight: zod_1.z.string().describe("New weight percentage for this gauge (0-100)"),
    }))
        .min(1)
        .describe("Array of gauge addresses and their new vote weights"),
})) {
}
exports.ChangeVotesParameters = ChangeVotesParameters;
class GetVotingPowerParameters extends (0, core_1.createToolParameters)(zod_1.z.object({
    voterType: zod_1.z.enum(["veMODE", "veBPT"]).describe("Type of voter contract to query (veMODE or veBPT)"),
    tokenId: zod_1.z.string().describe("The NFT token ID to check voting power for"),
})) {
}
exports.GetVotingPowerParameters = GetVotingPowerParameters;
