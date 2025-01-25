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
exports.IroncladService = void 0;
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
const borrower_1 = require("./abi/borrower");
const erc20_1 = require("./abi/erc20");
const hinthelper_1 = require("./abi/hinthelper");
const icVault_1 = require("./abi/icVault");
const lendingPool_1 = require("./abi/lendingPool");
const protocolDataProvider_1 = require("./abi/protocolDataProvider");
const troveManager_1 = require("./abi/troveManager");
const vaultAddresses_1 = require("./vaultAddresses");
const LENDING_POOL_ADDRESS = "0xB702cE183b4E1Faa574834715E5D4a6378D0eEd3";
const PROTOCOL_DATA_PROVIDER_ADDRESS = "0x29563f73De731Ae555093deb795ba4D1E584e42E";
const IUSD_ADDRESS = "0xA70266C8F8Cf33647dcFEE763961aFf418D9E1E4";
const BORROWER_ADDRESS = "0x9571873B4Df31D317d4ED4FE4689915A2F3fF7d4";
const TROVE_MANAGER_ADDRESS = "0x829746b34F624fdB03171AA4cF4D2675B0F2A2e6";
const HINT_HELPERS_ADDRESS = "0xBdAA7033f0A109A9777ee42a82799642a877Fc4b";
let IroncladService = (() => {
    let _instanceExtraInitializers = [];
    let _loopDeposit_decorators;
    let _loopWithdraw_decorators;
    let _monitorLoopPosition_decorators;
    let _borrowIUSD_decorators;
    let _repayIUSD_decorators;
    let _monitorPosition_decorators;
    let _calculateMaxWithdrawableAmount_decorators;
    let _getIcVault_decorators;
    let _getBorrowerAddress_decorators;
    let _getLendingPoolAddress_decorators;
    return class IroncladService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _loopDeposit_decorators = [(0, core_1.Tool)({
                    name: "loop_deposit_ironclad",
                    description: "Perform a looped deposit (recursive borrowing) on Ironclad. Send the amount of the asset (in base units) you want to deposit as the initial amount.",
                })];
            _loopWithdraw_decorators = [(0, core_1.Tool)({
                    name: "loop_withdraw_ironclad",
                    description: "Withdraw a looped position on Ironclad",
                })];
            _monitorLoopPosition_decorators = [(0, core_1.Tool)({
                    name: "monitor_loop_position_ironclad",
                    description: "Monitor health of a looped position on Ironclad",
                })];
            _borrowIUSD_decorators = [(0, core_1.Tool)({
                    name: "borrow_iusd_ironclad",
                    description: "Deposit collateral and borrow iUSD against it",
                })];
            _repayIUSD_decorators = [(0, core_1.Tool)({
                    name: "repay_iusd_ironclad",
                    description: "Repay all iUSD and close the Trove position",
                })];
            _monitorPosition_decorators = [(0, core_1.Tool)({
                    name: "monitor_position_ironclad",
                    description: "Monitor health of a Trove position",
                })];
            _calculateMaxWithdrawableAmount_decorators = [(0, core_1.Tool)({
                    name: "calculate_max_withdrawable_ironclad",
                    description: "Calculate maximum withdrawable amount while maintaining health factor",
                })];
            _getIcVault_decorators = [(0, core_1.Tool)({
                    name: "get_ic_vault_ironclad",
                    description: "Get the corresponding ic-vault address for a token. Use this before approving tokens for deposit.",
                })];
            _getBorrowerAddress_decorators = [(0, core_1.Tool)({
                    name: "get_borrower_address_ironclad",
                    description: "Get the Borrower contract address. Use this before approving ic-tokens to deposit into Borrow contract to get iUSD.",
                })];
            _getLendingPoolAddress_decorators = [(0, core_1.Tool)({
                    name: "get_lending_pool_address_ironclad",
                    description: "Get the Lending Pool contract address. Use this address to approve tokens for looped deposit.",
                })];
            __esDecorate(this, null, _loopDeposit_decorators, { kind: "method", name: "loopDeposit", static: false, private: false, access: { has: obj => "loopDeposit" in obj, get: obj => obj.loopDeposit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _loopWithdraw_decorators, { kind: "method", name: "loopWithdraw", static: false, private: false, access: { has: obj => "loopWithdraw" in obj, get: obj => obj.loopWithdraw }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _monitorLoopPosition_decorators, { kind: "method", name: "monitorLoopPosition", static: false, private: false, access: { has: obj => "monitorLoopPosition" in obj, get: obj => obj.monitorLoopPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _borrowIUSD_decorators, { kind: "method", name: "borrowIUSD", static: false, private: false, access: { has: obj => "borrowIUSD" in obj, get: obj => obj.borrowIUSD }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _repayIUSD_decorators, { kind: "method", name: "repayIUSD", static: false, private: false, access: { has: obj => "repayIUSD" in obj, get: obj => obj.repayIUSD }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _monitorPosition_decorators, { kind: "method", name: "monitorPosition", static: false, private: false, access: { has: obj => "monitorPosition" in obj, get: obj => obj.monitorPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _calculateMaxWithdrawableAmount_decorators, { kind: "method", name: "calculateMaxWithdrawableAmount", static: false, private: false, access: { has: obj => "calculateMaxWithdrawableAmount" in obj, get: obj => obj.calculateMaxWithdrawableAmount }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getIcVault_decorators, { kind: "method", name: "getIcVault", static: false, private: false, access: { has: obj => "getIcVault" in obj, get: obj => obj.getIcVault }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getBorrowerAddress_decorators, { kind: "method", name: "getBorrowerAddress", static: false, private: false, access: { has: obj => "getBorrowerAddress" in obj, get: obj => obj.getBorrowerAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getLendingPoolAddress_decorators, { kind: "method", name: "getLendingPoolAddress", static: false, private: false, access: { has: obj => "getLendingPoolAddress" in obj, get: obj => obj.getLendingPoolAddress }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async loopDeposit(walletClient, parameters) {
            try {
                const position = {
                    borrowedAmounts: [],
                    totalDeposited: "0",
                    totalBorrowed: "0",
                };
                const asset = parameters.assetAddress;
                // Initial deposit
                await walletClient.sendTransaction({
                    to: LENDING_POOL_ADDRESS,
                    abi: lendingPool_1.LENDING_POOL_ABI,
                    functionName: "deposit",
                    args: [asset, parameters.initialAmount, walletClient.getAddress(), parameters.referralCode],
                });
                position.totalDeposited = parameters.initialAmount;
                let currentAmount = parameters.initialAmount;
                // Execute loops
                for (let i = 0; i < parameters.numLoops; i++) {
                    const reserveConfigResult = await walletClient.read({
                        address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                        abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                        functionName: "getReserveConfigurationData",
                        args: [asset],
                    });
                    const reserveConfig = reserveConfigResult.value;
                    const ltv = Number(reserveConfig[1]);
                    const borrowAmount = ((Number(currentAmount) * ltv) / 10000).toString();
                    // Borrow
                    await walletClient.sendTransaction({
                        to: LENDING_POOL_ADDRESS,
                        abi: lendingPool_1.LENDING_POOL_ABI,
                        functionName: "borrow",
                        args: [
                            asset,
                            borrowAmount,
                            2, // Variable rate mode
                            parameters.referralCode,
                            walletClient.getAddress(),
                        ],
                    });
                    const loopAllowanceResult = await walletClient.read({
                        address: asset,
                        abi: erc20_1.ERC20_ABI,
                        functionName: "allowance",
                        args: [walletClient.getAddress(), LENDING_POOL_ADDRESS],
                    });
                    const loopAllowance = loopAllowanceResult.value;
                    if (Number(loopAllowance) < Number(borrowAmount)) {
                        await walletClient.sendTransaction({
                            to: asset,
                            abi: erc20_1.ERC20_ABI,
                            functionName: "approve",
                            args: [LENDING_POOL_ADDRESS, borrowAmount],
                        });
                    }
                    // Deposit
                    await walletClient.sendTransaction({
                        to: LENDING_POOL_ADDRESS,
                        abi: lendingPool_1.LENDING_POOL_ABI,
                        functionName: "deposit",
                        args: [asset, borrowAmount, walletClient.getAddress(), parameters.referralCode],
                    });
                    // Update position tracking
                    position.borrowedAmounts.push(borrowAmount);
                    position.totalBorrowed = (Number(position.totalBorrowed) + Number(borrowAmount)).toString();
                    position.totalDeposited = (Number(position.totalDeposited) + Number(borrowAmount)).toString();
                    currentAmount = borrowAmount;
                }
                return position;
            }
            catch (error) {
                throw Error(`Failed to execute loop deposit: ${error}`);
            }
        }
        async loopWithdraw(walletClient, parameters) {
            try {
                const userReserveDataResult = await walletClient.read({
                    address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                    abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                    functionName: "getUserReserveData",
                    args: [parameters.assetAddress, walletClient.getAddress()],
                });
                const userReserveData = userReserveDataResult.value;
                let remainingDebt = userReserveData[2]; // currentVariableDebt
                let withdrawalCount = 1;
                while (remainingDebt > 0n) {
                    const maxWithdrawable = await this.calculateMaxWithdrawableAmount(walletClient, {
                        assetAddress: parameters.assetAddress,
                    });
                    if (maxWithdrawable === 0n) {
                        throw new Error("Cannot withdraw any more funds while maintaining health factor");
                    }
                    // If this is the last withdrawal (no remaining debt), withdraw everything
                    // Otherwise, use 99.5% of max withdrawable to account for any small changes
                    const withdrawAmount = remainingDebt === 0n ? maxWithdrawable : (maxWithdrawable * 995n) / 1000n;
                    // Withdraw the calculated amount
                    await walletClient.sendTransaction({
                        to: LENDING_POOL_ADDRESS,
                        abi: lendingPool_1.LENDING_POOL_ABI,
                        functionName: "withdraw",
                        args: [parameters.assetAddress, withdrawAmount, walletClient.getAddress()],
                    });
                    const allowanceResult = await walletClient.read({
                        address: parameters.assetAddress,
                        abi: erc20_1.ERC20_ABI,
                        functionName: "allowance",
                        args: [walletClient.getAddress(), LENDING_POOL_ADDRESS],
                    });
                    const allowance = allowanceResult.value;
                    if (allowance < withdrawAmount) {
                        await walletClient.sendTransaction({
                            to: parameters.assetAddress,
                            abi: erc20_1.ERC20_ABI,
                            functionName: "approve",
                            args: [LENDING_POOL_ADDRESS, withdrawAmount],
                        });
                    }
                    // Repay
                    await walletClient.sendTransaction({
                        to: LENDING_POOL_ADDRESS,
                        abi: lendingPool_1.LENDING_POOL_ABI,
                        functionName: "repay",
                        args: [parameters.assetAddress, withdrawAmount, 2, walletClient.getAddress()],
                    });
                    // After repayment, get updated debt from protocol
                    const updatedReserveData = await walletClient.read({
                        address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                        abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                        functionName: "getUserReserveData",
                        args: [parameters.assetAddress, walletClient.getAddress()],
                    });
                    // biome-ignore lint/suspicious/noExplicitAny: need to fix this
                    remainingDebt = updatedReserveData.value[2];
                    withdrawalCount++;
                }
                // After debt is cleared, withdraw any remaining deposited assets
                const finalReserveData = await walletClient.read({
                    address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                    abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                    functionName: "getUserReserveData",
                    args: [parameters.assetAddress, walletClient.getAddress()],
                });
                // biome-ignore lint/suspicious/noExplicitAny: need to fix this
                const remainingDeposit = finalReserveData.value[0]; // aToken balance
                if (remainingDeposit > 0n) {
                    // Withdraw all remaining deposits
                    await walletClient.sendTransaction({
                        to: LENDING_POOL_ADDRESS,
                        abi: lendingPool_1.LENDING_POOL_ABI,
                        functionName: "withdraw",
                        args: [parameters.assetAddress, remainingDeposit, walletClient.getAddress()],
                    });
                }
                return `Successfully unwound position in ${withdrawalCount - 1} loops`;
            }
            catch (error) {
                throw Error(`Failed to execute loop withdraw: ${error}`);
            }
        }
        async monitorLoopPosition(walletClient, parameters) {
            try {
                const asset = parameters.tokenAddress;
                const decimalsResult = await walletClient.read({
                    address: asset,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "decimals",
                });
                const decimals = decimalsResult.value;
                // Get user's reserve data
                const userReserveDataResult = await walletClient.read({
                    address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                    abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                    functionName: "getUserReserveData",
                    args: [asset, walletClient.getAddress()],
                });
                // biome-ignore lint/suspicious/noExplicitAny: need to fix this
                const userReserveData = userReserveDataResult.value[0];
                // Get reserve configuration
                const reserveConfigResult = await walletClient.read({
                    address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                    abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                    functionName: "getReserveConfigurationData",
                    args: [asset],
                });
                // biome-ignore lint/suspicious/noExplicitAny: need to fix this
                const reserveConfig = reserveConfigResult.value[0];
                const totalCollateral = (0, viem_1.formatUnits)(userReserveData[0], decimals);
                const totalBorrowed = (0, viem_1.formatUnits)(userReserveData[2], decimals);
                const liquidationThreshold = Number(reserveConfig[2]) / 10000;
                // Calculate current LTV and health factor
                const currentLTV = totalBorrowed === "0" ? "0" : ((Number(totalBorrowed) / Number(totalCollateral)) * 100).toFixed(2);
                const healthFactor = totalBorrowed === "0"
                    ? "∞"
                    : ((Number(totalCollateral) * liquidationThreshold) / Number(totalBorrowed)).toFixed(2);
                return {
                    totalCollateral,
                    totalBorrowed,
                    currentLTV: `${currentLTV}%`,
                    healthFactor,
                    liquidationThreshold: `${(liquidationThreshold * 100).toFixed(2)}%`,
                };
            }
            catch (error) {
                throw Error(`Failed to monitor loop position: ${error}`);
            }
        }
        async borrowIUSD(walletClient, parameters) {
            try {
                const vaultAddress = (0, vaultAddresses_1.getVaultAddress)(parameters.tokenAddress);
                // Deposit USDC into vault
                await walletClient.sendTransaction({
                    to: vaultAddress,
                    abi: icVault_1.IC_VAULT_ABI,
                    functionName: "deposit",
                    args: [parameters.tokenAmount, walletClient.getAddress()],
                });
                // Step 2: Open Trove with ic-token
                // Approve ic-token if needed
                await walletClient.sendTransaction({
                    to: vaultAddress,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "approve",
                    args: [BORROWER_ADDRESS, parameters.tokenAmount],
                });
                // Calculate hints first
                const { upperHint, lowerHint } = await this.getHints(walletClient, vaultAddress, BigInt(parameters.tokenAmount), BigInt(parameters.iUSDAmount));
                // Prepare openTrove parameters
                const openTroveParams = {
                    _collateral: vaultAddress,
                    _collateralAmount: parameters.tokenAmount,
                    _maxFeePercentage: BigInt("5000000000000000"),
                    _iUSDAmount: BigInt(parameters.iUSDAmount),
                    _upperHint: upperHint,
                    _lowerHint: lowerHint,
                };
                // Execute openTrove transaction
                const txHash = await walletClient.sendTransaction({
                    to: BORROWER_ADDRESS,
                    abi: borrower_1.BORROWER_ABI,
                    functionName: "openTrove",
                    args: [
                        openTroveParams._collateral,
                        openTroveParams._collateralAmount,
                        openTroveParams._maxFeePercentage,
                        openTroveParams._iUSDAmount,
                        openTroveParams._upperHint,
                        openTroveParams._lowerHint,
                    ],
                });
                return `Successfully deposited ${parameters.tokenAmount} USDC into ic-USDC vault and borrowed ${parameters.iUSDAmount} iUSD. Transaction: ${txHash.hash}`;
            }
            catch (error) {
                throw Error(`Failed to borrow iUSD: ${error}`);
            }
        }
        async repayIUSD(walletClient, parameters) {
            try {
                const vaultAddress = (0, vaultAddresses_1.getVaultAddress)(parameters.tokenAddress);
                // First, we need to get the total debt of the Trove
                const troveDebtResult = await walletClient.read({
                    address: TROVE_MANAGER_ADDRESS,
                    abi: troveManager_1.TROVE_MANAGER_ABI,
                    functionName: "getTroveDebt",
                    args: [walletClient.getAddress(), vaultAddress],
                });
                const totalDebt = troveDebtResult.value;
                // LUSD_GAS_COMPENSATION is typically 10 * 10^18 (10 iUSD)
                const LUSD_GAS_COMPENSATION = BigInt("10000000000000000000"); // 10 iUSD in wei
                const actualDebt = totalDebt - LUSD_GAS_COMPENSATION;
                // Check and handle iUSD allowance
                const allowance = await walletClient.read({
                    address: IUSD_ADDRESS,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "allowance",
                    args: [walletClient.getAddress(), BORROWER_ADDRESS],
                });
                if (Number(allowance) < Number(actualDebt)) {
                    await walletClient.sendTransaction({
                        to: IUSD_ADDRESS,
                        abi: erc20_1.ERC20_ABI,
                        functionName: "approve",
                        args: [BORROWER_ADDRESS, actualDebt],
                    });
                }
                // Close Trove
                // Close position on the trove
                const txHash = await walletClient.sendTransaction({
                    to: BORROWER_ADDRESS,
                    abi: borrower_1.BORROWER_ABI,
                    functionName: "closeTrove",
                    args: [vaultAddress],
                });
                // Check collateral balance
                const collateralBalanceResult = await walletClient.read({
                    address: vaultAddress,
                    abi: erc20_1.ERC20_ABI,
                    functionName: "balanceOf",
                    args: [walletClient.getAddress()],
                });
                const collateralBalance = collateralBalanceResult.value;
                if (collateralBalance > 0n) {
                    // Withdraw all collateral
                    await walletClient.sendTransaction({
                        to: vaultAddress,
                        abi: icVault_1.IC_VAULT_ABI,
                        functionName: "withdraw",
                        args: [collateralBalance],
                    });
                }
                return txHash.hash;
            }
            catch (error) {
                throw Error(`Failed to close Trove: ${error}`);
            }
        }
        async monitorPosition(walletClient, parameters) {
            try {
                const vaultAddress = (0, vaultAddresses_1.getVaultAddress)(parameters.tokenAddress);
                // Get Trove status
                const statusResult = await walletClient.read({
                    address: TROVE_MANAGER_ADDRESS,
                    abi: troveManager_1.TROVE_MANAGER_ABI,
                    functionName: "getTroveStatus",
                    args: [walletClient.getAddress(), vaultAddress],
                });
                const status = Number(statusResult.value);
                // Get Trove collateral
                const collateralResult = await walletClient.read({
                    address: TROVE_MANAGER_ADDRESS,
                    abi: troveManager_1.TROVE_MANAGER_ABI,
                    functionName: "getTroveColl",
                    args: [walletClient.getAddress(), vaultAddress],
                });
                const collateral = collateralResult.value;
                // Get Trove debt
                const debtResult = await walletClient.read({
                    address: TROVE_MANAGER_ADDRESS,
                    abi: troveManager_1.TROVE_MANAGER_ABI,
                    functionName: "getTroveDebt",
                    args: [walletClient.getAddress(), vaultAddress],
                });
                const debt = debtResult.value;
                // Map status number to string
                const statusMap = {
                    0: "nonExistent",
                    1: "active",
                    2: "closedByOwner",
                    3: "closedByLiquidation",
                    4: "closedByRedemption",
                };
                return {
                    currentCollateral: collateral.toString(),
                    currentDebt: (0, viem_1.formatUnits)(debt, 18),
                    troveStatus: statusMap[status] || "unknown",
                };
            }
            catch (error) {
                throw Error(`Failed to monitor position: ${error}`);
            }
        }
        async calculateMaxWithdrawableAmount(walletClient, parameters) {
            const asset = parameters.assetAddress;
            // Get user's reserve data
            const userReserveDataResult = await walletClient.read({
                address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                functionName: "getUserReserveData",
                args: [asset, walletClient.getAddress()],
            });
            // biome-ignore lint/suspicious/noExplicitAny: need to fix this
            const userReserveData = userReserveDataResult.value[0];
            // Get reserve configuration
            const reserveConfigResult = await walletClient.read({
                address: PROTOCOL_DATA_PROVIDER_ADDRESS,
                abi: protocolDataProvider_1.PROTOCOL_DATA_PROVIDER_ABI,
                functionName: "getReserveConfigurationData",
                args: [asset],
            });
            // biome-ignore lint/suspicious/noExplicitAny: need to fix this
            const reserveConfig = reserveConfigResult.value[0];
            const currentATokenBalance = userReserveData[0]; // Current collateral
            const currentVariableDebt = userReserveData[2]; // Current debt
            const liquidationThreshold = reserveConfig[2]; // In basis points (e.g., 8500 = 85%)
            const remainingDebt = currentVariableDebt;
            if (remainingDebt === 0n) {
                return currentATokenBalance; // Can withdraw everything if no debt
            }
            // To maintain HF >= 1, we need:
            // (collateral * liquidationThreshold) / debt >= 1
            // So: collateral >= debt / (liquidationThreshold)
            // Therefore, maximum withdrawable = currentCollateral - (debt / liquidationThreshold)
            const minRequiredCollateral = (currentVariableDebt * 10000n) / liquidationThreshold;
            if (currentATokenBalance <= minRequiredCollateral) {
                return 0n; // Cannot withdraw anything
            }
            return currentATokenBalance - minRequiredCollateral;
        }
        async getHints(walletClient, collateral, collateralAmount, debt) {
            const decimals = (await walletClient.read({
                address: collateral,
                abi: erc20_1.ERC20_ABI,
                functionName: "decimals",
            })).value;
            const troveCount = (await walletClient.read({
                address: TROVE_MANAGER_ADDRESS,
                abi: troveManager_1.TROVE_MANAGER_ABI,
                functionName: "getTroveOwnersCount",
                args: [collateral],
            })).value;
            const numTrials = Math.ceil(15 * Math.sqrt(Number(troveCount)));
            const NICR = (await walletClient.read({
                address: HINT_HELPERS_ADDRESS,
                abi: hinthelper_1.HINT_HELPERS_ABI,
                functionName: "computeNominalCR",
                args: [collateralAmount, debt, decimals],
            })).value;
            const randomSeed = Math.floor(Math.random() * 1000000);
            const result = await walletClient.read({
                address: HINT_HELPERS_ADDRESS,
                abi: hinthelper_1.HINT_HELPERS_ABI,
                functionName: "getApproxHint",
                args: [collateral, NICR, numTrials, randomSeed],
            });
            // The function returns (address hintAddress, uint diff, uint latestRandomSeed)
            const [hintAddress] = result.value;
            return {
                upperHint: hintAddress,
                lowerHint: "0x0000000000000000000000000000000000000000", // zero address
            };
        }
        async getIcVault(walletClient, parameters) {
            try {
                const vaultAddress = (0, vaultAddresses_1.getVaultAddress)(parameters.tokenAddress);
                return vaultAddress;
            }
            catch (error) {
                throw Error(`Failed to get ic-vault address: ${error}`);
            }
        }
        async getBorrowerAddress(walletClient, parameters) {
            try {
                return BORROWER_ADDRESS;
            }
            catch (error) {
                throw Error(`Failed to get borrower address: ${error}`);
            }
        }
        async getLendingPoolAddress(walletClient, parameters) {
            try {
                return LENDING_POOL_ADDRESS;
            }
            catch (error) {
                throw Error(`Failed to get lending pool address: ${error}`);
            }
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
exports.IroncladService = IroncladService;
