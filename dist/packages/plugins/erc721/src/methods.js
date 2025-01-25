"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceOf = balanceOf;
exports.transfer = transfer;
exports.totalSupply = totalSupply;
exports.approve = approve;
exports.transferFrom = transferFrom;
const abi_1 = require("./abi");
async function balanceOf(walletClient, token, parameters) {
    try {
        const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);
        const rawBalance = await walletClient.read({
            address: token.contractAddress,
            abi: abi_1.ERC721_ABI,
            functionName: "balanceOf",
            args: [resolvedWalletAddress],
        });
        return rawBalance.value.toString();
    }
    catch (error) {
        throw Error(`Failed to fetch balance: ${error}`);
    }
}
async function transfer(walletClient, token, parameters) {
    try {
        const resolvedRecipientAddress = await walletClient.resolveAddress(parameters.to);
        const hash = await walletClient.sendTransaction({
            to: token.contractAddress,
            abi: abi_1.ERC721_ABI,
            functionName: "safeTransferFrom",
            args: [await walletClient.getAddress(), resolvedRecipientAddress, parameters.tokenId],
        });
        return hash.hash;
    }
    catch (error) {
        throw Error(`Failed to transfer: ${error}`);
    }
}
async function totalSupply(walletClient, token) {
    try {
        const rawTotalSupply = await walletClient.read({
            address: token.contractAddress,
            abi: abi_1.ERC721_ABI,
            functionName: "totalSupply",
        });
        return rawTotalSupply.value.toString();
    }
    catch (error) {
        throw Error(`Failed to fetch total supply: ${error}`);
    }
}
async function approve(walletClient, token, parameters) {
    try {
        const resolvedSpenderAddress = await walletClient.resolveAddress(parameters.spender);
        const hash = await walletClient.sendTransaction({
            to: token.contractAddress,
            abi: abi_1.ERC721_ABI,
            functionName: "approve",
            args: [resolvedSpenderAddress, parameters.tokenId],
        });
        return hash.hash;
    }
    catch (error) {
        throw Error(`Failed to approve: ${error}`);
    }
}
async function transferFrom(walletClient, token, parameters) {
    try {
        const resolvedFromAddress = await walletClient.resolveAddress(parameters.from);
        const resolvedToAddress = await walletClient.resolveAddress(parameters.to);
        const hash = await walletClient.sendTransaction({
            to: token.contractAddress,
            abi: abi_1.ERC721_ABI,
            functionName: "safeTransferFrom",
            args: [resolvedFromAddress, resolvedToAddress, parameters.tokenId],
        });
        return hash.hash;
    }
    catch (error) {
        throw Error(`Failed to transfer from: ${error}`);
    }
}
