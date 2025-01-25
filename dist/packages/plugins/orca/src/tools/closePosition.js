"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closePosition = closePosition;
const anchor_1 = require("@coral-xyz/anchor");
const common_sdk_1 = require("@orca-so/common-sdk");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const web3_js_1 = require("@solana/web3.js");
async function closePosition(walletClient, parameters) {
    const vanityWallet = new anchor_1.Wallet(new web3_js_1.Keypair());
    const ctx = whirlpools_sdk_1.WhirlpoolContext.from(walletClient.getConnection(), vanityWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
    const walletAddress = new web3_js_1.PublicKey(walletClient.getAddress());
    const positionMintAddress = new web3_js_1.PublicKey(parameters.positionMintAddress);
    const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
    const positionAddress = whirlpools_sdk_1.PDAUtil.getPosition(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, positionMintAddress);
    const position = await client.getPosition(positionAddress.publicKey);
    const whirlpoolAddress = position.getData().whirlpool;
    const whirlpool = await client.getPool(whirlpoolAddress);
    const txBuilder = await whirlpool.closePosition(positionAddress.publicKey, common_sdk_1.Percentage.fromFraction(1, 100), walletAddress, walletAddress, walletAddress);
    const txPayload = await txBuilder[0].build();
    const txPayloadDecompiled = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message);
    const instructions = txPayloadDecompiled.instructions;
    const signers = txPayload.signers;
    try {
        const { hash } = await walletClient.sendTransaction({
            instructions: instructions,
            accountsToSign: signers,
        });
        return hash;
    }
    catch (error) {
        throw new Error(`Failed to close position: ${JSON.stringify(error)}`);
    }
}
