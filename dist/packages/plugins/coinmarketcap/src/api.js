"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinmarketcapApi = void 0;
class CoinmarketcapApi {
    apiKey;
    BASE_URL = "https://pro-api.coinmarketcap.com/";
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async makeRequest(endpoint, params) {
        const queryString = new URLSearchParams(Object.entries(params || {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = String(value);
            }
            return acc;
        }, {})).toString();
        const url = `${this.BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-CMC_PRO_API_KEY": this.apiKey,
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Coinmarketcap API Error: ${response.status} - ${errorData?.status?.error_message || response.statusText}`);
            }
            return (await response.json()).data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("An unknown error occurred while fetching data");
        }
    }
}
exports.CoinmarketcapApi = CoinmarketcapApi;
