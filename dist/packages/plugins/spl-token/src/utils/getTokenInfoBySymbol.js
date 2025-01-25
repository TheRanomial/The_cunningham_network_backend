"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenInfoBySymbol = getTokenInfoBySymbol;
function getTokenInfoBySymbol(symbol, tokens, network) {
    const token = tokens.find((token) => [token.symbol, token.symbol.toLowerCase()].includes(symbol));
    return {
        symbol: token?.symbol,
        mintAddress: token?.mintAddresses[network],
        decimals: token?.decimals,
        name: token?.name,
    };
}
