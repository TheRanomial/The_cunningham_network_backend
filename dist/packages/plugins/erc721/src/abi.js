"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721_ABI = void 0;
const viem_1 = require("viem");
exports.ERC721_ABI = (0, viem_1.parseAbi)([
    // Transfer functions
    "function transferFrom(address from, address to, uint256 tokenId) external",
    "function safeTransferFrom(address from, address to, uint256 tokenId) external",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) external",
    // Approval functions
    "function approve(address to, uint256 tokenId) external",
    "function setApprovalForAll(address operator, bool approved) external",
    "function getApproved(uint256 tokenId) external view returns (address)",
    "function isApprovedForAll(address owner, address operator) external view returns (bool)",
    // View functions
    "function balanceOf(address owner) external view returns (uint256)",
    "function ownerOf(uint256 tokenId) external view returns (address)",
]);
