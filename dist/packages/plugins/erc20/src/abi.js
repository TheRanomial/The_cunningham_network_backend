"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20_ABI = void 0;
const viem_1 = require("viem");
exports.ERC20_ABI = (0, viem_1.parseAbi)([
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function totalSupply() external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
]);
