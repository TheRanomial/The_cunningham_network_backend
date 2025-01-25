"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRYPTOPUNKS = exports.BAYC = void 0;
exports.getTokensForNetwork = getTokensForNetwork;
exports.BAYC = {
    symbol: "BAYC",
    name: "Bored Ape Yacht Club",
    chains: {
        "1": {
            contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        },
    },
};
exports.CRYPTOPUNKS = {
    symbol: "PUNK",
    name: "CryptoPunks",
    chains: {
        "1": {
            contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
        },
    },
};
function getTokensForNetwork(chainId, tokens) {
    const result = [];
    for (const token of tokens) {
        const chainData = token.chains[chainId];
        if (chainData) {
            result.push({
                chainId: chainId,
                symbol: token.symbol,
                name: token.name,
                contractAddress: chainData.contractAddress,
            });
        }
    }
    return result;
}
