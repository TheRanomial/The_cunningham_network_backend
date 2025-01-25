"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdeyeApi = void 0;
class BirdeyeApi {
    apiKey;
    baseUrl = "https://public-api.birdeye.so";
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async makeRequest(endpoint, chain = "solana", options = {}) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                "X-API-KEY": this.apiKey,
                "x-chain": chain,
            },
        });
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("BirdEye API rate limit exceeded");
            }
            throw new Error(`BirdEye API request failed: ${response.statusText}`);
        }
        return (await response.json()).data;
    }
}
exports.BirdeyeApi = BirdeyeApi;
