"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KimService = void 0;
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
const viem_2 = require("viem");
const erc20_1 = require("./abi/erc20");
const factory_1 = require("./abi/factory");
const pool_1 = require("./abi/pool");
const positionManager_1 = require("./abi/positionManager");
const swaprouter_1 = require("./abi/swaprouter");
const SWAP_ROUTER_ADDRESS = "0xAc48FcF1049668B285f3dC72483DF5Ae2162f7e8";
const POSITION_MANAGER_ADDRESS = "0x2e8614625226D26180aDf6530C3b1677d3D7cf10";
const FACTORY_ADDRESS = "0xB5F00c2C5f8821155D8ed27E31932CFD9DB3C5D5";
let KimService = (() => {
    let _instanceExtraInitializers = [];
    let _getSwapRouterAddress_decorators;
    let _swapExactInputSingleHop_decorators;
    let _swapExactOutputSingleHop_decorators;
    let _swapExactInputMultiHop_decorators;
    let _swapExactOutputMultiHop_decorators;
    let _mintPosition_decorators;
    let _increaseLiquidity_decorators;
    let _decreaseLiquidity_decorators;
    let _collect_decorators;
    let _burn_decorators;
    return class KimService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSwapRouterAddress_decorators = [(0, core_1.Tool)({
                    name: "kim_get_swap_router_address",
                    description: "Get the address of the swap router",
                })];
            _swapExactInputSingleHop_decorators = [(0, core_1.Tool)({
                    description: "Swap an exact amount of input tokens for an output token in a single hop. Have the token amounts in their base units. Don't need to approve the swap router for the output token. User will have sufficient balance of the input token. The swap router address is already provided in the function. Returns a transaction hash on success. Once you get a transaction hash, the swap is complete - do not call this function again.",
                })];
            _swapExactOutputSingleHop_decorators = [(0, core_1.Tool)({
                    name: "kim_swap_exact_output_single_hop",
                    description: "Swap an exact amount of output tokens for a single hop. Have the token amounts in their base units. Don't need to approve the swap router for the output token. User will have sufficient balance of the input token. The swap router address is already provided in the function. Returns a transaction hash on success. Once you get a transaction hash, the swap is complete - do not call this function again.",
                })];
            _swapExactInputMultiHop_decorators = [(0, core_1.Tool)({
                    name: "kim_swap_exact_input_multi_hop",
                    description: "Swap an exact amount of input tokens in multiple hops",
                })];
            _swapExactOutputMultiHop_decorators = [(0, core_1.Tool)({
                    name: "kim_swap_exact_output_multi_hop",
                    description: "Swap tokens to receive an exact amount of output tokens in multiple hops",
                })];
            _mintPosition_decorators = [(0, core_1.Tool)({
                    name: "kim_mint_position",
                    description: "Mint a new liquidity position in a pool. Returns a transaction hash on success. Once you get a transaction hash, the mint is complete - do not call this function again.",
                })];
            _increaseLiquidity_decorators = [(0, core_1.Tool)({
                    name: "kim_increase_liquidity",
                    description: "Increase liquidity in an existing position. Returns a transaction hash on success. Once you get a transaction hash, the increase is complete - do not call this function again.",
                })];
            _decreaseLiquidity_decorators = [(0, core_1.Tool)({
                    name: "kim_decrease_liquidity",
                    description: "Decrease liquidity in an existing position by specifying a percentage (0-100). Returns a transaction hash on success. Once you get a transaction hash, the decrease is complete - do not call this function again.",
                })];
            _collect_decorators = [(0, core_1.Tool)({
                    name: "kim_collect",
                    description: "Collect all available tokens from a liquidity position. Can be rewards or tokens removed from a liquidity position. So, should be called after decreasing liquidity as well as on its own.",
                })];
            _burn_decorators = [(0, core_1.Tool)({
                    name: "kim_burn",
                    description: "Burn a liquidity position NFT after all tokens have been collected.",
                })];
            __esDecorate(this, null, _getSwapRouterAddress_decorators, { kind: "method", name: "getSwapRouterAddress", static: false, private: false, access: { has: obj => "getSwapRouterAddress" in obj, get: obj => obj.getSwapRouterAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _swapExactInputSingleHop_decorators, { kind: "method", name: "swapExactInputSingleHop", static: false, private: false, access: { has: obj => "swapExactInputSingleHop" in obj, get: obj => obj.swapExactInputSingleHop }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _swapExactOutputSingleHop_decorators, { kind: "method", name: "swapExactOutputSingleHop", static: false, private: false, access: { has: obj => "swapExactOutputSingleHop" in obj, get: obj => obj.swapExactOutputSingleHop }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _swapExactInputMultiHop_decorators, { kind: "method", name: "swapExactInputMultiHop", static: false, private: false, access: { has: obj => "swapExactInputMultiHop" in obj, get: obj => obj.swapExactInputMultiHop }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _swapExactOutputMultiHop_decorators, { kind: "method", name: "swapExactOutputMultiHop", static: false, private: false, access: { has: obj => "swapExactOutputMultiHop" in obj, get: obj => obj.swapExactOutputMultiHop }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _mintPosition_decorators, { kind: "method", name: "mintPosition", static: false, private: false, access: { has: obj => "mintPosition" in obj, get: obj => obj.mintPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _increaseLiquidity_decorators, { kind: "method", name: "increaseLiquidity", static: false, private: false, access: { has: obj => "increaseLiquidity" in obj, get: obj => obj.increaseLiquidity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _decreaseLiquidity_decorators, { kind: "method", name: "decreaseLiquidity", static: false, private: false, access: { has: obj => "decreaseLiquidity" in obj, get: obj => obj.decreaseLiquidity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _collect_decorators, { kind: "method", name: "collect", static: false, private: false, access: { has: obj => "collect" in obj, get: obj => obj.collect }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _burn_decorators, { kind: "method", name: "burn", static: false, private: false, access: { has: obj => "burn" in obj, get: obj => obj.burn }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async getSwapRouterAddress(parameters) {
            return SWAP_ROUTER_ADDRESS;
        }
        async swapExactInputSingleHop(walletClient, parameters) {
            try {
                const approvalHash = await walletClient.sendTransaction({
                    to: parameters.tokenInAddress,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [SWAP_ROUTER_ADDRESS, parameters.amountIn],
                });
                const timestamp = Math.floor(Date.now() / 1000) + parameters.deadline;
                const hash = await walletClient.sendTransaction({
                    to: SWAP_ROUTER_ADDRESS,
                    abi: swaprouter_1.SWAP_ROUTER_ABI,
                    functionName: "exactInputSingle",
                    args: [
                        {
                            tokenIn: parameters.tokenInAddress,
                            tokenOut: parameters.tokenOutAddress,
                            recipient: walletClient.getAddress(),
                            deadline: timestamp,
                            amountIn: parameters.amountIn,
                            amountOutMinimum: parameters.amountOutMinimum,
                            limitSqrtPrice: parameters.limitSqrtPrice,
                        },
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to swap exact input single hop: ${error}`);
            }
        }
        async swapExactOutputSingleHop(walletClient, parameters) {
            try {
                const tokenIn = parameters.tokenInAddress;
                const tokenOut = parameters.tokenOutAddress;
                const amountOut = parameters.amountOut;
                const amountInMaximum = parameters.amountInMaximum;
                const limitSqrtPrice = parameters.limitSqrtPrice;
                const timestamp = Math.floor(Date.now() / 1000) + parameters.deadline;
                const approvalHash = await walletClient.sendTransaction({
                    to: parameters.tokenInAddress,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [SWAP_ROUTER_ADDRESS, amountInMaximum],
                });
                const hash = await walletClient.sendTransaction({
                    to: SWAP_ROUTER_ADDRESS,
                    abi: swaprouter_1.SWAP_ROUTER_ABI,
                    functionName: "exactOutputSingle",
                    args: [
                        {
                            tokenIn: tokenIn,
                            tokenOut: tokenOut,
                            recipient: walletClient.getAddress(),
                            deadline: timestamp,
                            amountOut: amountOut,
                            amountInMaximum: amountInMaximum,
                            limitSqrtPrice: limitSqrtPrice,
                        },
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to swap exact output single hop: ${error}`);
            }
        }
        async swapExactInputMultiHop(walletClient, parameters) {
            try {
                const recipient = await walletClient.resolveAddress(parameters.recipient);
                // Get first and last token decimals
                const tokenInDecimals = Number(await walletClient.read({
                    address: parameters.path.tokenIn,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "decimals",
                }));
                const tokenOutDecimals = Number(await walletClient.read({
                    address: parameters.path.tokenOut,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "decimals",
                }));
                // Encode the path
                const encodedPath = (0, viem_2.encodeAbiParameters)([{ type: "address[]" }, { type: "uint24[]" }], [
                    [
                        parameters.path.tokenIn,
                        ...parameters.path.intermediateTokens.map((t) => t),
                        parameters.path.tokenOut,
                    ],
                    parameters.path.fees,
                ]);
                const hash = await walletClient.sendTransaction({
                    to: SWAP_ROUTER_ADDRESS,
                    abi: swaprouter_1.SWAP_ROUTER_ABI,
                    functionName: "exactInput",
                    args: [
                        encodedPath,
                        recipient,
                        parameters.deadline,
                        (0, viem_1.parseUnits)(parameters.amountIn, tokenInDecimals),
                        (0, viem_1.parseUnits)(parameters.amountOutMinimum, tokenOutDecimals),
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to swap: ${error}`);
            }
        }
        async swapExactOutputMultiHop(walletClient, parameters) {
            try {
                const recipient = await walletClient.resolveAddress(parameters.recipient);
                // Get first and last token decimals
                const tokenInDecimals = Number(await walletClient.read({
                    address: parameters.path.tokenIn,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "decimals",
                }));
                const tokenOutDecimals = Number(await walletClient.read({
                    address: parameters.path.tokenOut,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "decimals",
                }));
                // Encode the path
                const encodedPath = (0, viem_2.encodeAbiParameters)([{ type: "address[]" }, { type: "uint24[]" }], [
                    [
                        parameters.path.tokenIn,
                        ...parameters.path.intermediateTokens.map((t) => t),
                        parameters.path.tokenOut,
                    ],
                    parameters.path.fees,
                ]);
                const hash = await walletClient.sendTransaction({
                    to: SWAP_ROUTER_ADDRESS,
                    abi: swaprouter_1.SWAP_ROUTER_ABI,
                    functionName: "exactOutput",
                    args: [
                        encodedPath,
                        recipient,
                        parameters.deadline,
                        (0, viem_1.parseUnits)(parameters.amountOut, tokenOutDecimals),
                        (0, viem_1.parseUnits)(parameters.amountInMaximum, tokenInDecimals),
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to swap: ${error}`);
            }
        }
        async mintPosition(walletClient, parameters) {
            try {
                const tickSpacing = 60;
                // First determine token order
                const isOrderMatched = parameters.token0Address.toLowerCase() < parameters.token1Address.toLowerCase();
                // Set tokens and amounts in correct order
                const [token0, token1] = isOrderMatched
                    ? [parameters.token0Address, parameters.token1Address]
                    : [parameters.token1Address, parameters.token0Address];
                const [amount0Raw, amount1Raw] = isOrderMatched
                    ? [parameters.amount0Desired, parameters.amount1Desired]
                    : [parameters.amount1Desired, parameters.amount0Desired];
                const poolAddressResult = await walletClient.read({
                    address: FACTORY_ADDRESS,
                    abi: factory_1.KIM_FACTORY_ABI,
                    functionName: "poolByPair",
                    args: [token0, token1],
                });
                const poolAddress = poolAddressResult.value;
                const globalState = await walletClient.read({
                    address: poolAddress,
                    abi: pool_1.POOL_ABI,
                    functionName: "globalState",
                });
                // biome-ignore lint/suspicious/noExplicitAny: value is any
                const globalStateArray = globalState.value;
                const currentTick = Number.parseInt(globalStateArray[1].toString());
                // Calculate nearest tick that's divisible by spacing
                const nearestTick = Math.floor(currentTick / tickSpacing) * tickSpacing;
                // Use provided ticks if they exist and are valid numbers
                const tickLower = nearestTick - tickSpacing * 10; // 600 ticks below
                const tickUpper = nearestTick + tickSpacing * 10; // 600 ticks above
                const approvalHash0 = await walletClient.sendTransaction({
                    to: token0,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [POSITION_MANAGER_ADDRESS, amount0Raw],
                });
                const approvalHash1 = await walletClient.sendTransaction({
                    to: token1,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [POSITION_MANAGER_ADDRESS, amount1Raw],
                });
                // Add timestamp calculation
                const timestamp = Math.floor(Date.now() / 1000) + parameters.deadline;
                const hash = await walletClient.sendTransaction({
                    to: POSITION_MANAGER_ADDRESS,
                    abi: positionManager_1.POSITION_MANAGER_ABI,
                    functionName: "mint",
                    args: [
                        {
                            token0,
                            token1,
                            tickLower: tickLower,
                            tickUpper: tickUpper,
                            amount0Desired: amount0Raw,
                            amount1Desired: amount1Raw,
                            amount0Min: 0,
                            amount1Min: 0,
                            recipient: walletClient.getAddress(),
                            deadline: timestamp,
                        },
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to mint position: ${error}`);
            }
        }
        async increaseLiquidity(walletClient, parameters) {
            try {
                // Set tokens and amounts in correct order
                const isOrderMatched = parameters.token0Address.toLowerCase() < parameters.token1Address.toLowerCase();
                const [token0, token1] = isOrderMatched
                    ? [parameters.token0Address, parameters.token1Address]
                    : [parameters.token1Address, parameters.token0Address];
                const [amount0Raw, amount1Raw] = isOrderMatched
                    ? [parameters.amount0Desired, parameters.amount1Desired]
                    : [parameters.amount1Desired, parameters.amount0Desired];
                const approvalHash0 = await walletClient.sendTransaction({
                    to: token0,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [POSITION_MANAGER_ADDRESS, amount0Raw],
                });
                const approvalHash1 = await walletClient.sendTransaction({
                    to: token1,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [POSITION_MANAGER_ADDRESS, amount1Raw],
                });
                // Calculate deadline as current time + deadline seconds
                const timestamp = Math.floor(Date.now() / 1000) + 60; // 60 seconds from now
                const hash = await walletClient.sendTransaction({
                    to: POSITION_MANAGER_ADDRESS,
                    abi: positionManager_1.POSITION_MANAGER_ABI,
                    functionName: "increaseLiquidity",
                    args: [
                        {
                            tokenId: parameters.tokenId,
                            amount0Desired: amount0Raw,
                            amount1Desired: amount1Raw,
                            amount0Min: 0n,
                            amount1Min: 0n,
                            deadline: timestamp,
                        },
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to increase liquidity: ${error}`);
            }
        }
        async decreaseLiquidity(walletClient, parameters) {
            try {
                // Get position info
                const positionResult = await walletClient.read({
                    address: POSITION_MANAGER_ADDRESS,
                    abi: positionManager_1.POSITION_MANAGER_ABI,
                    functionName: "positions",
                    args: [parameters.tokenId],
                });
                // biome-ignore lint/suspicious/noExplicitAny: value is any
                const position = positionResult.value;
                const currentLiquidity = position[6];
                const liquidityToRemove = (currentLiquidity * BigInt(parameters.percentage)) / BigInt(100);
                // Set min amounts to 0 for now
                const amount0Min = 0n;
                const amount1Min = 0n;
                const timestamp = Math.floor(Date.now() / 1000) + 60;
                const hash = await walletClient.sendTransaction({
                    to: POSITION_MANAGER_ADDRESS,
                    abi: positionManager_1.POSITION_MANAGER_ABI,
                    functionName: "decreaseLiquidity",
                    args: [
                        {
                            tokenId: parameters.tokenId,
                            liquidity: liquidityToRemove,
                            amount0Min: amount0Min,
                            amount1Min: amount1Min,
                            deadline: timestamp,
                        },
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to decrease liquidity: ${error}`);
            }
        }
        async collect(walletClient, parameters) {
            try {
                const recipient = walletClient.getAddress();
                // Use max uint128 to collect all available tokens
                const maxUint128 = BigInt(2 ** 128) - BigInt(1);
                const hash = await walletClient.sendTransaction({
                    to: POSITION_MANAGER_ADDRESS,
                    abi: positionManager_1.POSITION_MANAGER_ABI,
                    functionName: "collect",
                    args: [
                        {
                            tokenId: parameters.tokenId,
                            recipient,
                            amount0Max: maxUint128,
                            amount1Max: maxUint128,
                        },
                    ],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to collect: ${error}`);
            }
        }
        async burn(walletClient, parameters) {
            try {
                const hash = await walletClient.sendTransaction({
                    to: POSITION_MANAGER_ADDRESS,
                    abi: positionManager_1.POSITION_MANAGER_ABI,
                    functionName: "burn",
                    args: [parameters.tokenId],
                });
                return hash.hash;
            }
            catch (error) {
                throw new Error(`Failed to burn position: ${error}`);
            }
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.KimService = KimService;
