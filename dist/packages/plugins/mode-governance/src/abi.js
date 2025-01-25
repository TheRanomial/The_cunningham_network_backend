"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPT_TOKEN_ABI = exports.MODE_TOKEN_ABI = exports.VOTING_ESCROW_ABI = void 0;
const viem_1 = require("viem");
exports.VOTING_ESCROW_ABI = (0, viem_1.parseAbi)([
    // Errors
    "error AlreadyVoted()",
    "error AmountTooSmall()",
    "error CannotExit()",
    "error DaoUnauthorized(address dao, address where, address who, bytes32 permissionId)",
    "error LockNFTAlreadySet()",
    "error MustBe18Decimals()",
    "error NoLockFound()",
    "error NonExistentToken()",
    "error NotApprovedOrOwner()",
    "error NotOwner()",
    "error NotTicketHolder()",
    "error NotVoter()",
    "error NothingToSweep()",
    "error OwnershipChange()",
    "error SameAddress()",
    "error TransferBalanceIncorrect()",
    "error ZeroAddress()",
    "error ZeroAmount()",
    "error ZeroBalance()",
    // Functions
    "function createLock(uint256 _value) external returns (uint256)",
    "function createLockFor(uint256 _value, address _to) external returns (uint256)",
    "function withdraw(uint256 _tokenId) external",
    "function beginWithdrawal(uint256 _tokenId) external",
    "function locked(uint256 _tokenId) external view returns ((uint208 amount, uint48 start))",
    "function votingPower(uint256 _tokenId) external view returns (uint256)",
    "function votingPowerForAccount(address _account) external view returns (uint256 accountVotingPower)",
    "function totalVotingPower() external view returns (uint256)",
    "function totalLocked() external view returns (uint256)",
    "function minDeposit() external view returns (uint256)",
    "function isVoting(uint256 _tokenId) external view returns (bool)",
    "function ownedTokens(address _owner) external view returns (uint256[] tokenIds)",
    "function setMinDeposit(uint256 _minDeposit) external",
    "function pause() external",
    "function unpause() external",
    "function paused() external view returns (bool)",
]);
exports.MODE_TOKEN_ABI = (0, viem_1.parseAbi)([
    "function balanceOf(address account) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
]);
exports.BPT_TOKEN_ABI = (0, viem_1.parseAbi)([
    "function balanceOf(address account) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
]);
