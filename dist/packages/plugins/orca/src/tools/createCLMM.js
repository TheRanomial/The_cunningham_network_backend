"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCLMM = createCLMM;
const anchor_1 = require("@coral-xyz/anchor");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = require("decimal.js");
const orca_service_1 = require("../orca.service");
async function createCLMM(walletClient, parameters) {
    let whirlpoolsConfigAddress;
    if (walletClient.getConnection().rpcEndpoint.includes("mainnet")) {
        whirlpoolsConfigAddress = new web3_js_1.PublicKey("2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ");
    }
    else if (walletClient.getConnection().rpcEndpoint.includes("devnet")) {
        whirlpoolsConfigAddress = new web3_js_1.PublicKey("FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR");
    }
    else {
        throw new Error("Unsupported network");
    }
    const vanityWallet = new anchor_1.Wallet(new web3_js_1.Keypair());
    const ctx = whirlpools_sdk_1.WhirlpoolContext.from(walletClient.getConnection(), vanityWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
    const fetcher = ctx.fetcher;
    const walletAddress = new web3_js_1.PublicKey(walletClient.getAddress());
    const mintDeploy = new web3_js_1.PublicKey(parameters.mintDeploy);
    const mintPair = new web3_js_1.PublicKey(parameters.mintPair);
    let initialPrice = new decimal_js_1.Decimal(parameters.initialPrice);
    const feeTier = Number(parameters.feeTier);
    const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
    const correctTokenOrder = whirlpools_sdk_1.PoolUtil.orderMints(mintDeploy, mintPair).map((addr) => addr.toString());
    const isCorrectMintOrder = correctTokenOrder[0] === mintDeploy.toString();
    let mintA;
    let mintB;
    if (!isCorrectMintOrder) {
        [mintA, mintB] = [mintPair, mintDeploy];
        initialPrice = new decimal_js_1.Decimal(1 / initialPrice.toNumber());
    }
    else {
        [mintA, mintB] = [mintDeploy, mintPair];
    }
    const mintAAccount = await fetcher.getMintInfo(mintA);
    const mintBAccount = await fetcher.getMintInfo(mintB);
    if (mintAAccount === null || mintBAccount === null) {
        throw Error("Mint account not found");
    }
    const tickSpacing = orca_service_1.FEE_TIERS[feeTier];
    const initialTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(initialPrice, mintAAccount.decimals, mintBAccount.decimals, tickSpacing);
    const { poolKey, tx: txBuilder } = await client.createPool(whirlpoolsConfigAddress, mintA, mintB, tickSpacing, initialTick, walletAddress);
    const txPayload = await txBuilder.build();
    const txPayloadDecompiled = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message);
    const instructions = txPayloadDecompiled.instructions;
    const signers = txPayload.signers;
    try {
        const { hash } = await walletClient.sendTransaction({
            instructions: instructions,
            accountsToSign: signers,
        });
        return JSON.stringify({
            transactionId: hash,
            whirlpoolAddress: poolKey.toString(),
        });
    }
    catch (error) {
        throw new Error(`Failed to create pool: ${JSON.stringify(error)}`);
    }
}
