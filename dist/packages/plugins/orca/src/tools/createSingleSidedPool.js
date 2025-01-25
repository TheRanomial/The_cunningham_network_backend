"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleSidedPool = createSingleSidedPool;
const anchor_1 = require("@coral-xyz/anchor");
const common_sdk_1 = require("@orca-so/common-sdk");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const instructions_1 = require("@orca-so/whirlpools-sdk/dist/instructions");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = require("decimal.js");
const orca_service_1 = require("../orca.service");
async function createSingleSidedPool(walletClient, parameters) {
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
    const depositTokenAmount = new anchor_1.BN(Number(parameters.depositTokenAmount));
    const depositTokenMint = new web3_js_1.PublicKey(parameters.depositTokenMint);
    const otherTokenMint = new web3_js_1.PublicKey(parameters.otherTokenMint);
    let initialPrice = new decimal_js_1.Decimal(Number(parameters.startPrice));
    let maxPrice = new decimal_js_1.Decimal(Number(parameters.maxPrice));
    const feeTier = Number(parameters.feeTier);
    const correctTokenOrder = whirlpools_sdk_1.PoolUtil.orderMints(otherTokenMint, depositTokenMint).map((addr) => addr.toString());
    const isCorrectMintOrder = correctTokenOrder[0] === depositTokenMint.toString();
    let mintA;
    let mintB;
    if (isCorrectMintOrder) {
        [mintA, mintB] = [depositTokenMint, otherTokenMint];
    }
    else {
        [mintA, mintB] = [otherTokenMint, depositTokenMint];
        initialPrice = new decimal_js_1.Decimal(1 / initialPrice.toNumber());
        maxPrice = new decimal_js_1.Decimal(1 / maxPrice.toNumber());
    }
    const mintAAccount = await fetcher.getMintInfo(mintA);
    const mintBAccount = await fetcher.getMintInfo(mintB);
    if (mintAAccount === null || mintBAccount === null)
        throw Error("Mint account not found");
    const tickSpacing = orca_service_1.FEE_TIERS[feeTier];
    const tickIndex = whirlpools_sdk_1.PriceMath.priceToTickIndex(initialPrice, mintAAccount.decimals, mintBAccount.decimals);
    const initialTick = whirlpools_sdk_1.TickUtil.getInitializableTickIndex(tickIndex, tickSpacing);
    const tokenExtensionCtx = {
        ...whirlpools_sdk_1.NO_TOKEN_EXTENSION_CONTEXT,
        tokenMintWithProgramA: mintAAccount,
        tokenMintWithProgramB: mintBAccount,
    };
    const feeTierKey = whirlpools_sdk_1.PDAUtil.getFeeTier(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, whirlpoolsConfigAddress, tickSpacing).publicKey;
    const initSqrtPrice = whirlpools_sdk_1.PriceMath.tickIndexToSqrtPriceX64(initialTick);
    const tokenVaultAKeypair = web3_js_1.Keypair.generate();
    const tokenVaultBKeypair = web3_js_1.Keypair.generate();
    const whirlpoolPda = whirlpools_sdk_1.PDAUtil.getWhirlpool(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, whirlpoolsConfigAddress, mintA, mintB, orca_service_1.FEE_TIERS[feeTier]);
    const tokenBadgeA = whirlpools_sdk_1.PDAUtil.getTokenBadge(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, whirlpoolsConfigAddress, mintA).publicKey;
    const tokenBadgeB = whirlpools_sdk_1.PDAUtil.getTokenBadge(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, whirlpoolsConfigAddress, mintB).publicKey;
    const baseParamsPool = {
        initSqrtPrice,
        whirlpoolsConfig: whirlpoolsConfigAddress,
        whirlpoolPda,
        tokenMintA: mintA,
        tokenMintB: mintB,
        tokenVaultAKeypair,
        tokenVaultBKeypair,
        feeTierKey,
        tickSpacing: tickSpacing,
        funder: walletAddress,
    };
    const initPoolIx = !whirlpools_sdk_1.TokenExtensionUtil.isV2IxRequiredPool(tokenExtensionCtx)
        ? whirlpools_sdk_1.WhirlpoolIx.initializePoolIx(ctx.program, baseParamsPool)
        : whirlpools_sdk_1.WhirlpoolIx.initializePoolV2Ix(ctx.program, {
            ...baseParamsPool,
            tokenProgramA: tokenExtensionCtx.tokenMintWithProgramA.tokenProgram,
            tokenProgramB: tokenExtensionCtx.tokenMintWithProgramB.tokenProgram,
            tokenBadgeA,
            tokenBadgeB,
        });
    const initialTickArrayStartTick = whirlpools_sdk_1.TickUtil.getStartTickIndex(initialTick, tickSpacing);
    const initialTickArrayPda = whirlpools_sdk_1.PDAUtil.getTickArray(ctx.program.programId, whirlpoolPda.publicKey, initialTickArrayStartTick);
    const txBuilder = new common_sdk_1.TransactionBuilder(ctx.provider.connection, ctx.provider.wallet, ctx.txBuilderOpts);
    txBuilder.addInstruction(initPoolIx);
    txBuilder.addInstruction((0, instructions_1.initTickArrayIx)(ctx.program, {
        startTick: initialTickArrayStartTick,
        tickArrayPda: initialTickArrayPda,
        whirlpool: whirlpoolPda.publicKey,
        funder: walletAddress,
    }));
    let tickLowerIndex;
    let tickUpperIndex;
    if (isCorrectMintOrder) {
        tickLowerIndex = initialTick;
        tickUpperIndex = whirlpools_sdk_1.PriceMath.priceToTickIndex(maxPrice, mintAAccount.decimals, mintBAccount.decimals);
    }
    else {
        tickLowerIndex = whirlpools_sdk_1.PriceMath.priceToTickIndex(maxPrice, mintAAccount.decimals, mintBAccount.decimals);
        tickUpperIndex = initialTick;
    }
    const tickLowerInitializableIndex = whirlpools_sdk_1.TickUtil.getInitializableTickIndex(tickLowerIndex, tickSpacing);
    const tickUpperInitializableIndex = whirlpools_sdk_1.TickUtil.getInitializableTickIndex(tickUpperIndex, tickSpacing);
    if (!whirlpools_sdk_1.TickUtil.checkTickInBounds(tickLowerInitializableIndex) ||
        !whirlpools_sdk_1.TickUtil.checkTickInBounds(tickUpperInitializableIndex))
        throw Error("Prices out of bounds");
    const increasLiquidityQuoteParam = {
        inputTokenAmount: depositTokenAmount,
        inputTokenMint: depositTokenMint,
        tokenMintA: mintA,
        tokenMintB: mintB,
        tickCurrentIndex: initialTick,
        sqrtPrice: initSqrtPrice,
        tickLowerIndex: tickLowerInitializableIndex,
        tickUpperIndex: tickUpperInitializableIndex,
        tokenExtensionCtx: tokenExtensionCtx,
        slippageTolerance: common_sdk_1.Percentage.fromFraction(0, 100),
    };
    const liquidityInput = (0, whirlpools_sdk_1.increaseLiquidityQuoteByInputTokenWithParams)(increasLiquidityQuoteParam);
    const { liquidityAmount: liquidity, tokenMaxA, tokenMaxB } = liquidityInput;
    const positionMintKeypair = web3_js_1.Keypair.generate();
    const positionMintPubkey = positionMintKeypair.publicKey;
    const positionPda = whirlpools_sdk_1.PDAUtil.getPosition(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, positionMintPubkey);
    const positionTokenAccountAddress = (0, spl_token_1.getAssociatedTokenAddressSync)(positionMintPubkey, walletAddress, ctx.accountResolverOpts.allowPDAOwnerAddress, spl_token_1.TOKEN_2022_PROGRAM_ID);
    const params = {
        funder: walletAddress,
        owner: walletAddress,
        positionPda,
        positionTokenAccount: positionTokenAccountAddress,
        whirlpool: whirlpoolPda.publicKey,
        tickLowerIndex: tickLowerInitializableIndex,
        tickUpperIndex: tickUpperInitializableIndex,
    };
    const positionIx = (0, instructions_1.openPositionWithTokenExtensionsIx)(ctx.program, {
        ...params,
        positionMint: positionMintPubkey,
        withTokenMetadataExtension: true,
    });
    txBuilder.addInstruction(positionIx);
    txBuilder.addSigner(positionMintKeypair);
    const [ataA, ataB] = await (0, common_sdk_1.resolveOrCreateATAs)(ctx.connection, walletAddress, [
        { tokenMint: mintA, wrappedSolAmountIn: tokenMaxA },
        { tokenMint: mintB, wrappedSolAmountIn: tokenMaxB },
    ], () => ctx.fetcher.getAccountRentExempt(), walletAddress, undefined, ctx.accountResolverOpts.allowPDAOwnerAddress, "ata");
    const { address: tokenOwnerAccountA, ...tokenOwnerAccountAIx } = ataA;
    const { address: tokenOwnerAccountB, ...tokenOwnerAccountBIx } = ataB;
    txBuilder.addInstruction(tokenOwnerAccountAIx);
    txBuilder.addInstruction(tokenOwnerAccountBIx);
    const tickArrayLowerStartIndex = whirlpools_sdk_1.TickUtil.getStartTickIndex(tickLowerInitializableIndex, tickSpacing);
    const tickArrayUpperStartIndex = whirlpools_sdk_1.TickUtil.getStartTickIndex(tickUpperInitializableIndex, tickSpacing);
    const tickArrayLowerPda = whirlpools_sdk_1.PDAUtil.getTickArray(ctx.program.programId, whirlpoolPda.publicKey, tickArrayLowerStartIndex);
    const tickArrayUpperPda = whirlpools_sdk_1.PDAUtil.getTickArray(ctx.program.programId, whirlpoolPda.publicKey, tickArrayUpperStartIndex);
    if (tickArrayUpperStartIndex !== tickArrayLowerStartIndex) {
        if (isCorrectMintOrder) {
            txBuilder.addInstruction((0, instructions_1.initTickArrayIx)(ctx.program, {
                startTick: tickArrayUpperStartIndex,
                tickArrayPda: tickArrayUpperPda,
                whirlpool: whirlpoolPda.publicKey,
                funder: walletAddress,
            }));
        }
        else {
            txBuilder.addInstruction((0, instructions_1.initTickArrayIx)(ctx.program, {
                startTick: tickArrayLowerStartIndex,
                tickArrayPda: tickArrayLowerPda,
                whirlpool: whirlpoolPda.publicKey,
                funder: walletAddress,
            }));
        }
    }
    const baseParamsLiquidity = {
        liquidityAmount: liquidity,
        tokenMaxA,
        tokenMaxB,
        whirlpool: whirlpoolPda.publicKey,
        positionAuthority: walletAddress,
        position: positionPda.publicKey,
        positionTokenAccount: positionTokenAccountAddress,
        tokenOwnerAccountA,
        tokenOwnerAccountB,
        tokenVaultA: tokenVaultAKeypair.publicKey,
        tokenVaultB: tokenVaultBKeypair.publicKey,
        tickArrayLower: tickArrayLowerPda.publicKey,
        tickArrayUpper: tickArrayUpperPda.publicKey,
    };
    const liquidityIx = !whirlpools_sdk_1.TokenExtensionUtil.isV2IxRequiredPool(tokenExtensionCtx)
        ? (0, instructions_1.increaseLiquidityIx)(ctx.program, baseParamsLiquidity)
        : (0, instructions_1.increaseLiquidityV2Ix)(ctx.program, {
            ...baseParamsLiquidity,
            tokenMintA: mintA,
            tokenMintB: mintB,
            tokenProgramA: tokenExtensionCtx.tokenMintWithProgramA.tokenProgram,
            tokenProgramB: tokenExtensionCtx.tokenMintWithProgramB.tokenProgram,
        });
    txBuilder.addInstruction(liquidityIx);
    const txPayload = await txBuilder.build();
    const instructions = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message).instructions;
    try {
        const { hash } = await walletClient.sendTransaction({
            instructions: instructions,
            accountsToSign: [positionMintKeypair, tokenVaultAKeypair, tokenVaultBKeypair],
        });
        return hash;
    }
    catch (error) {
        throw new Error(`Failed to create pool: ${JSON.stringify(error)}`);
    }
}
