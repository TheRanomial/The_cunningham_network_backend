"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenByMintAddress = getTokenByMintAddress;
const tokens_1 = require("../tokens");
const getTokensForNetwork_1 = require("./getTokensForNetwork");
function getTokenByMintAddress(mintAddress, network) {
    const tokensForNetwork = (0, getTokensForNetwork_1.getTokensForNetwork)(network, tokens_1.SPL_TOKENS);
    const token = tokensForNetwork.find((token) => token.mintAddress === mintAddress);
    return token || null;
}
