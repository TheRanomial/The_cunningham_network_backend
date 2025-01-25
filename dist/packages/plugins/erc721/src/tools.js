"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTools = getTools;
const methods_1 = require("./methods");
const parameters_1 = require("./parameters");
const core_1 = require("@goat-sdk/core");
function getTools(walletClient, tokenList) {
    const tools = [];
    for (const token of tokenList) {
        const balanceTool = (0, core_1.createTool)({
            name: `get_${token.symbol}_balance`,
            description: `This {{tool}} gets the number of NFTs owned for ${token.symbol}`,
            parameters: parameters_1.getBalanceParametersSchema,
        }, (parameters) => (0, methods_1.balanceOf)(walletClient, token, parameters));
        const transferTool = (0, core_1.createTool)({
            name: `transfer_${token.symbol}`,
            description: `This {{tool}} transfers a ${token.symbol} NFT to the specified address`,
            parameters: parameters_1.transferParametersSchema,
        }, (parameters) => (0, methods_1.transfer)(walletClient, token, parameters));
        const totalSupplyTool = (0, core_1.createTool)({
            name: `get_${token.symbol}_total_supply`,
            description: `This {{tool}} gets the total supply of ${token.symbol} NFTs`,
            parameters: parameters_1.totalSupplyParametersSchema,
        }, (parameters) => (0, methods_1.totalSupply)(walletClient, token));
        const approveTool = (0, core_1.createTool)({
            name: `approve_${token.symbol}`,
            description: `This {{tool}} approves an address to transfer a specific ${token.symbol} NFT`,
            parameters: parameters_1.approveParametersSchema,
        }, (parameters) => (0, methods_1.approve)(walletClient, token, parameters));
        const transferFromTool = (0, core_1.createTool)({
            name: `transfer_${token.symbol}_from`,
            description: `This {{tool}} transfers a ${token.symbol} NFT from one address to another`,
            parameters: parameters_1.transferFromParametersSchema,
        }, (parameters) => (0, methods_1.transferFrom)(walletClient, token, parameters));
        tools.push(balanceTool, transferTool, totalSupplyTool, approveTool, transferFromTool);
    }
    return tools;
}
