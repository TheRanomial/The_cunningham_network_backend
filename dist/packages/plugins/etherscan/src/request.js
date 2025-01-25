"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherscanRequest = exports.buildUrl = void 0;
const ETHERSCAN_API_BASE_URL = {
    mainnet: "https://api.etherscan.io/api",
    goerli: "https://api-goerli.etherscan.io/api",
    sepolia: "https://api-sepolia.etherscan.io/api",
};
const buildUrl = (network, module, action, params) => {
    const baseUrl = ETHERSCAN_API_BASE_URL[network];
    const queryParams = new URLSearchParams({
        module,
        action,
        ...params,
    });
    return `${baseUrl}?${queryParams.toString()}`;
};
exports.buildUrl = buildUrl;
const etherscanRequest = async (url, apiKey) => {
    const apiKeyParam = new URLSearchParams({ apikey: apiKey });
    const fullUrl = `${url}&${apiKeyParam.toString()}`;
    const response = await fetch(fullUrl);
    if (!response.ok) {
        throw new Error(`Etherscan API request failed: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status === "0" && data.message === "NOTOK") {
        throw new Error(`Etherscan API error: ${data.result}`);
    }
    return data.result;
};
exports.etherscanRequest = etherscanRequest;
