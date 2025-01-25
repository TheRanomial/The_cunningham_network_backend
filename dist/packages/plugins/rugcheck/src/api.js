"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RugCheckApi = void 0;
class RugCheckApi {
    baseUrl = "https://api.rugcheck.xyz/v1";
    async makeRequest(endpoint, options = {}) {
        const headers = {
            ...options.headers,
            "Content-Type": "application/json",
        };
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("RugCheck API rate limit exceeded");
            }
            throw new Error(`RugCheck API request failed: ${response.statusText}`);
        }
        return await response.json();
    }
}
exports.RugCheckApi = RugCheckApi;
