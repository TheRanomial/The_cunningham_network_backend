"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPositionsByOwner = fetchPositionsByOwner;
const anchor_1 = require("@coral-xyz/anchor");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const web3_js_1 = require("@solana/web3.js");
async function fetchPositionsByOwner(walletClient, parameters) {
    const vanityWallet = new anchor_1.Wallet(new web3_js_1.Keypair());
    const ctx = whirlpools_sdk_1.WhirlpoolContext.from(walletClient.getConnection(), vanityWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
    const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
    const owner = parameters.owner || walletClient.getAddress();
    const positions = await (0, whirlpools_sdk_1.getAllPositionAccountsByOwner)({
        ctx,
        owner: owner,
    });
    const positionDatas = [...positions.positions.entries(), ...positions.positionsWithTokenExtensions.entries()];
    const result = {};
    for (const [_, positionData] of positionDatas) {
        const positionMintAddress = positionData.positionMint;
        const whirlpoolAddress = positionData.whirlpool;
        const whirlpool = await client.getPool(whirlpoolAddress);
        const whirlpoolData = whirlpool.getData();
        const sqrtPrice = whirlpoolData.sqrtPrice;
        const currentTick = whirlpoolData.tickCurrentIndex;
        const mintA = whirlpool.getTokenAInfo();
        const mintB = whirlpool.getTokenBInfo();
        const currentPrice = whirlpools_sdk_1.PriceMath.sqrtPriceX64ToPrice(sqrtPrice, mintA.decimals, mintB.decimals);
        const lowerTick = positionData.tickLowerIndex;
        const upperTick = positionData.tickUpperIndex;
        const lowerPrice = whirlpools_sdk_1.PriceMath.tickIndexToPrice(lowerTick, mintA.decimals, mintB.decimals);
        const upperPrice = whirlpools_sdk_1.PriceMath.tickIndexToPrice(upperTick, mintA.decimals, mintB.decimals);
        const centerPosition = lowerPrice.add(upperPrice).div(2);
        const positionInRange = !!(currentTick > lowerTick && currentTick < upperTick);
        const distanceFromCenterBps = Math.ceil(currentPrice.sub(centerPosition).abs().div(centerPosition).mul(10000).toNumber());
        result[positionMintAddress.toString()] = {
            positionMintAddress: positionMintAddress.toString(),
            whirlpoolAddress: whirlpoolAddress.toString(),
            positionInRange,
            distanceFromCenterBps,
        };
    }
    return JSON.stringify(result);
}
