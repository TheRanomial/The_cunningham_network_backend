"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinGeckoAPI = void 0;
class CoinGeckoAPI {
    apiKey;
    isPro;
    static API_BASE_URL = "https://api.coingecko.com/api/v3";
    static PRO_API_BASE_URL = "https://pro-api.coingecko.com/api/v3";
    constructor(apiKey, isPro) {
        this.apiKey = apiKey;
        this.isPro = isPro;
    }
    async request(endpoint, params, options = {}) {
        const url = new URL(`${this.isPro ? CoinGeckoAPI.PRO_API_BASE_URL : CoinGeckoAPI.API_BASE_URL}/${endpoint}?${this.buildSearchParams(params)}`);
        const response = await fetch(url.toString(), {
            ...options,
            headers: {
                ...options.headers,
                [this.isPro ? "x-cg-pro-api-key" : "x-cg-demo-api-key"]: this.apiKey,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}. URL: ${url.toString()}. Response: ${await response.text()}`);
        }
        return response.json();
    }
    buildSearchParams(params) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) {
                searchParams.append(key, value.toString());
            }
        }
        return searchParams.toString();
    }
}
exports.CoinGeckoAPI = CoinGeckoAPI;
