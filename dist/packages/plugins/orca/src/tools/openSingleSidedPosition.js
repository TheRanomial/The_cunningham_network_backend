"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openSingleSidedPosition = openSingleSidedPosition;
const anchor_1 = require("@coral-xyz/anchor");
const common_sdk_1 = require("@orca-so/common-sdk");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = require("decimal.js");
async function openSingleSidedPosition(walletClient, parameters) {
    const vanityWallet = new anchor_1.Wallet(new web3_js_1.Keypair());
    const ctx = whirlpools_sdk_1.WhirlpoolContext.from(walletClient.getConnection(), vanityWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
    const walletAddress = new web3_js_1.PublicKey(walletClient.getAddress());
    const whirlpoolAddress = new web3_js_1.PublicKey(parameters.whirlpoolAddress);
    const distanceFromCurrentPriceBps = Number(parameters.distanceFromCurrentPriceBps);
    const widthBps = Number(parameters.widthBps);
    const inputTokenMint = new web3_js_1.PublicKey(parameters.inputTokenMint);
    const inputAmount = new decimal_js_1.Decimal(parameters.inputAmount);
    const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
    const whirlpool = await client.getPool(whirlpoolAddress);
    const whirlpoolData = whirlpool.getData();
    const mintInfoA = whirlpool.getTokenAInfo();
    const mintInfoB = whirlpool.getTokenBInfo();
    const price = whirlpools_sdk_1.PriceMath.sqrtPriceX64ToPrice(whirlpoolData.sqrtPrice, mintInfoA.decimals, mintInfoB.decimals);
    const isTokenA = inputTokenMint.equals(mintInfoA.mint);
    let lowerBoundPrice;
    let upperBoundPrice;
    let lowerTick;
    let upperTick;
    if (isTokenA) {
        lowerBoundPrice = price.mul(1 + distanceFromCurrentPriceBps / 10000);
        upperBoundPrice = lowerBoundPrice.mul(1 + widthBps / 10000);
        upperTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(upperBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
        lowerTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(lowerBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
    }
    else {
        lowerBoundPrice = price.mul(1 - distanceFromCurrentPriceBps / 10000);
        upperBoundPrice = lowerBoundPrice.mul(1 - widthBps / 10000);
        lowerTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(upperBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
        upperTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(lowerBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
    }
    const txBuilderTickArrays = await whirlpool.initTickArrayForTicks([lowerTick, upperTick], walletAddress);
    let instructions = [];
    let signers = [];
    if (txBuilderTickArrays !== null) {
        const txPayloadTickArrays = await txBuilderTickArrays.build();
        const txPayloadTickArraysDecompiled = web3_js_1.TransactionMessage.decompile(txPayloadTickArrays.transaction.message);
        const instructionsTickArrays = txPayloadTickArraysDecompiled.instructions;
        instructions = instructions.concat(instructionsTickArrays);
        signers = signers.concat(txPayloadTickArrays.signers);
    }
    const tokenExtensionCtx = {
        ...whirlpools_sdk_1.NO_TOKEN_EXTENSION_CONTEXT,
        tokenMintWithProgramA: mintInfoA,
        tokenMintWithProgramB: mintInfoB,
    };
    const increaseLiquiditQuote = (0, whirlpools_sdk_1.increaseLiquidityQuoteByInputToken)(inputTokenMint, inputAmount, lowerTick, upperTick, common_sdk_1.Percentage.fromFraction(1, 100), whirlpool, tokenExtensionCtx);
    const { positionMint, tx: txBuilder } = await whirlpool.openPositionWithMetadata(lowerTick, upperTick, increaseLiquiditQuote, walletAddress, walletAddress, undefined, spl_token_1.TOKEN_2022_PROGRAM_ID);
    const txPayload = await txBuilder.build();
    const txPayloadDecompiled = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message);
    instructions = instructions.concat(txPayloadDecompiled.instructions);
    signers = signers.concat(txPayload.signers);
    try {
        const { hash } = await walletClient.sendTransaction({
            instructions: instructions,
            accountsToSign: signers,
        });
        return JSON.stringify({
            transactionId: hash,
            positionMint: positionMint.toString(),
        });
    }
    catch (error) {
        throw new Error(`Failed to create position: ${JSON.stringify(error)}`);
    }
}
