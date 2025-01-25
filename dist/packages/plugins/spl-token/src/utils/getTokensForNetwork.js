"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokensForNetwork = getTokensForNetwork;
function getTokensForNetwork(network, tokens) {
    const result = [];
    for (const token of tokens) {
        const mintAddress = token.mintAddresses[network];
        if (mintAddress) {
            result.push({
                decimals: token.decimals,
                symbol: token.symbol,
                name: token.name,
                network,
                mintAddress,
            });
        }
    }
    return result;
}
