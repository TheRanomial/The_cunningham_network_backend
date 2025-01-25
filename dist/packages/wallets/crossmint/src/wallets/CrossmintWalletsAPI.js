"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossmintWalletsAPI = void 0;
class CrossmintWalletsAPI {
    baseUrl;
    crossmintClient;
    constructor(crossmintClient) {
        this.crossmintClient = crossmintClient;
        this.baseUrl = `${crossmintClient.baseUrl}/api/v1-alpha2`;
    }
    /**
     * Makes an HTTP request to the Crossmint API.
     *
     * @param endpoint - The API endpoint (relative to baseUrl).
     * @param options - Fetch options including method, headers, and body.
     * @returns The parsed JSON response.
     * @throws An error if the response is not OK.
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        // Set default headers and merge with any additional headers
        const headers = new Headers({
            ...this.crossmintClient.authHeaders,
            ...(options.headers || {}),
            "Content-Type": "application/json",
        });
        const response = await fetch(url, { ...options, headers });
        const responseBody = (await response.json());
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${JSON.stringify(responseBody)}`);
        }
        return responseBody;
    }
    async createSmartWallet(adminSigner) {
        const endpoint = "/wallets";
        const payload = {
            type: "evm-smart-wallet",
            config: {
                adminSigner: adminSigner,
            },
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async createCustodialWallet(linkedUser) {
        const endpoint = "/wallets";
        const payload = {
            type: "solana-custodial-wallet",
            linkedUser: linkedUser,
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async getWallet(locator) {
        const endpoint = `/wallets/${encodeURIComponent(locator)}`;
        return this.request(endpoint, {
            method: "GET",
        });
    }
    async signMessageForCustodialWallet(locator, message) {
        const endpoint = `/wallets/${encodeURIComponent(locator)}/signatures`;
        const payload = {
            type: "solana-message",
            params: { message },
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async signMessageForSmartWallet(walletAddress, message, chain, signer) {
        const endpoint = `/wallets/${encodeURIComponent(walletAddress)}/signatures`;
        const payload = {
            type: "evm-message",
            params: {
                message,
                signer,
                chain,
            },
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async signTypedDataForSmartWallet(walletAddress, typedData, chain, signer) {
        const endpoint = `/wallets/${encodeURIComponent(walletAddress)}/signatures`;
        const payload = {
            type: "evm-typed-data",
            params: {
                typedData,
                chain,
                signer,
            },
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async checkSignatureStatus(signatureId, walletAddress) {
        const endpoint = `/wallets/${encodeURIComponent(walletAddress)}/signatures/${encodeURIComponent(signatureId)}`;
        return this.request(endpoint, {
            method: "GET",
        });
    }
    async approveSignatureForSmartWallet(signatureId, locator, signer, signature) {
        const endpoint = `/wallets/${encodeURIComponent(locator)}/signatures/${encodeURIComponent(signatureId)}/approvals`;
        const payload = {
            approvals: [
                {
                    signer: signer,
                    signature: signature,
                },
            ],
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async createTransactionForCustodialWallet(locator, transaction) {
        const endpoint = `/wallets/${encodeURIComponent(locator)}/transactions`;
        const payload = {
            params: {
                transaction: transaction,
            },
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async createTransactionForSmartWallet(walletAddress, calls, chain, signer) {
        const endpoint = `/wallets/${encodeURIComponent(walletAddress)}/transactions`;
        const payload = {
            params: {
                calls,
                chain,
                signer: `evm-keypair:${signer}`,
            },
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async approveTransaction(locator, transactionId, approvals) {
        const endpoint = `/wallets/${encodeURIComponent(locator)}/transactions/${encodeURIComponent(transactionId)}/approvals`;
        const payload = {
            approvals,
        };
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async checkTransactionStatus(locator, transactionId) {
        const endpoint = `/wallets/${encodeURIComponent(locator)}/transactions/${encodeURIComponent(transactionId)}`;
        return this.request(endpoint, {
            method: "GET",
        });
    }
}
exports.CrossmintWalletsAPI = CrossmintWalletsAPI;
