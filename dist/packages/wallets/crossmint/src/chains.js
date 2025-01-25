"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintingChains = void 0;
exports.getViemChain = getViemChain;
exports.getCrossmintChainString = getCrossmintChainString;
exports.isChainSupportedByFaucet = isChainSupportedByFaucet;
exports.isChainSupportedByMinting = isChainSupportedByMinting;
exports.getTestnetChainNameById = getTestnetChainNameById;
const chains_1 = require("viem/chains");
const faucetChains = [
    "arbitrum-sepolia",
    "avalanche-fuji",
    "base-sepolia",
    "ethereum-sepolia",
    "optimism-sepolia",
    "polygon-amoy",
    "skale-nebula-testnet",
    "viction-testnet",
];
const smartWalletChains = [
    "polygon",
    "polygon-amoy",
    "base",
    "base-sepolia",
    "arbitrum",
    "arbitrum-sepolia",
    "mode",
    "mode-sepolia",
    "optimism",
    "optimism-sepolia",
];
exports.mintingChains = [
    "arbitrum",
    "arbitrum-sepolia",
    "astar-zkevm",
    "avalanche",
    "avalanche-fuji",
    "base",
    "base-sepolia",
    "bsc",
    "chiliz",
    "chiliz-spicy-testnet",
    "ethereum",
    "ethereum-sepolia",
    "mode",
    "mode-sepolia",
    "optimism",
    "optimism-sepolia",
    "polygon",
    "polygon-amoy",
    "shape",
    "shape-sepolia",
    "skale-nebula",
    "skale-nebula-testnet",
    "soneium-minato-testnet",
    "xai",
    "xai-sepolia-testnet",
    "zkyoto",
    "zora",
    "zora-sepolia",
];
const chainMap = {
    arbitrum: chains_1.arbitrum,
    "arbitrum-sepolia": chains_1.arbitrumSepolia,
    "astar-zkevm": chains_1.astarZkEVM,
    avalanche: chains_1.avalanche,
    "avalanche-fuji": chains_1.avalancheFuji,
    base: chains_1.base,
    "base-sepolia": chains_1.baseSepolia,
    bsc: chains_1.bsc,
    chiliz: chains_1.chiliz,
    ethereum: chains_1.mainnet,
    optimism: chains_1.optimism,
    mode: chains_1.mode,
    "mode-sepolia": chains_1.modeTestnet,
    "optimism-sepolia": chains_1.optimismSepolia,
    polygon: chains_1.polygon,
    "polygon-amoy": chains_1.polygonAmoy,
    "ethereum-sepolia": chains_1.sepolia,
    shape: chains_1.shape,
    "shape-sepolia": chains_1.shapeSepolia,
    "skale-nebula": chains_1.skaleNebula,
    "skale-nebula-testnet": chains_1.skaleNebulaTestnet,
    "viction-testnet": chains_1.victionTestnet,
    xai: chains_1.xai,
    "xai-sepolia-testnet": chains_1.xaiTestnet,
    zkyoto: chains_1.astarZkyoto,
    zora: chains_1.zora,
    "zora-sepolia": chains_1.zoraSepolia,
    "chiliz-spicy-testnet": {
        id: 88882,
    },
    "soneium-minato-testnet": {
        id: 88882,
    },
};
function getViemChain(chain) {
    const viemChain = chainMap[chain];
    if (!viemChain) {
        throw new Error(`Unsupported chain: ${chain}`);
    }
    return viemChain;
}
function getCrossmintChainString(chain) {
    if (chain.type === "solana") {
        return "solana";
    }
    if (chain.type === "aptos") {
        return "aptos";
    }
    if (chain.type === "evm") {
        // from chain.id figure out the chain name
        const chainName = Object.keys(chainMap).find((key) => chainMap[key].id === chain.id);
        if (!chainName) {
            throw new Error(`Unsupported chain: ${chain.id}`);
        }
        return chainName;
    }
    throw new Error(`Unsupported chain: ${chain.type}`);
}
const testnetChains = ["arbitrum-sepolia", "base-sepolia", "optimism-sepolia", "polygon-amoy"];
const faucetChainIds = new Set(faucetChains.map((chainName) => chainMap[chainName].id));
function isChainSupportedByFaucet(chainId) {
    return faucetChainIds.has(chainId);
}
const mintingChainIds = new Set(exports.mintingChains.map((chainName) => chainMap[chainName].id));
function isChainSupportedByMinting(chainId) {
    return mintingChainIds.has(chainId);
}
function getTestnetChainNameById(chainId) {
    const testnetChainIdMap = {
        421614: "arbitrum-sepolia",
        84532: "base-sepolia",
        11155111: "ethereum-sepolia",
        11155420: "optimism-sepolia",
        999999999: "zora-sepolia",
        919: "mode-sepolia",
    };
    return testnetChainIdMap[chainId] || null;
}
