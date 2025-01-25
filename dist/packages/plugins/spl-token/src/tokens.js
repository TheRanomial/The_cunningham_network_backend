"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPL_TOKENS = exports.SOL = exports.PENGU = exports.GOAT = exports.USDC = void 0;
exports.USDC = {
    decimals: 6,
    symbol: "USDC",
    name: "USDC",
    mintAddresses: {
        devnet: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        mainnet: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    },
};
exports.GOAT = {
    decimals: 6,
    symbol: "GOAT",
    name: "GOAT",
    mintAddresses: {
        mainnet: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
        devnet: null,
    },
};
exports.PENGU = {
    decimals: 6,
    symbol: "PENGU",
    name: "Pengu",
    mintAddresses: {
        mainnet: "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv",
        devnet: null,
    },
};
exports.SOL = {
    decimals: 9,
    symbol: "SOL",
    name: "Wrapped SOL",
    mintAddresses: {
        mainnet: "So11111111111111111111111111111111111111112",
        devnet: "So11111111111111111111111111111111111111112",
    },
};
exports.SPL_TOKENS = [exports.USDC, exports.GOAT, exports.PENGU, exports.SOL];
