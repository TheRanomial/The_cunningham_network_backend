"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartWalletClient = void 0;
exports.smartWalletFactory = smartWalletFactory;
const wallet_evm_1 = require("@goat-sdk/wallet-evm");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const ens_1 = require("viem/ens");
const chains_2 = require("../chains");
const CrossmintWalletsAPI_1 = require("./CrossmintWalletsAPI");
function getLocator(address, linkedUser) {
    if (linkedUser) {
        if ("email" in linkedUser) {
            return `email:${linkedUser.email}:evm-smart-wallet`;
        }
        if ("phone" in linkedUser) {
            return `phone:${linkedUser.phone}:evm-smart-wallet`;
        }
        if ("userId" in linkedUser) {
            return `userId:${linkedUser.userId}:evm-smart-wallet`;
        }
    }
    if (!address) {
        throw new Error("A Smart Wallet address is required if no linked user is provided");
    }
    return address;
}
function buildTransactionData({ recipientAddress, abi, functionName, args, value, }) {
    if (!abi) {
        return {
            to: recipientAddress,
            value: value?.toString() ?? "0",
            data: "0x",
        };
    }
    if (!functionName) {
        throw new Error("Function name is required");
    }
    return {
        to: recipientAddress,
        value: value?.toString() ?? "0",
        data: (0, viem_1.encodeFunctionData)({ abi, functionName, args }),
    };
}
class SmartWalletClient extends wallet_evm_1.EVMSmartWalletClient {
    #locator;
    #client;
    #chain;
    #signer;
    #address;
    #viemClient;
    #ensClient;
    get hasCustodialSigner() {
        return typeof this.#signer === "string";
    }
    get secretKey() {
        if (typeof this.#signer === "string") {
            return null;
        }
        return this.#signer.secretKey;
    }
    get signerAccount() {
        if (typeof this.#signer === "string") {
            return null;
        }
        return (0, accounts_1.privateKeyToAccount)(this.#signer.secretKey);
    }
    constructor(address, apiClient, options) {
        super();
        this.#locator = getLocator(options.address, options.linkedUser);
        this.#address = address;
        this.#client = apiClient;
        this.#chain = options.chain;
        this.#signer = options.signer;
        this.#viemClient = (0, viem_1.createPublicClient)({
            chain: (0, chains_2.getViemChain)(options.chain),
            transport: (0, viem_1.http)(options.provider),
        });
        this.#ensClient = (0, viem_1.createPublicClient)({
            chain: chains_1.mainnet,
            transport: (0, viem_1.http)(options.options?.ensProvider ?? ""),
        });
    }
    getAddress() {
        return this.#address;
    }
    getChain() {
        return {
            type: "evm",
            id: this.#viemClient.chain?.id ?? 0,
        };
    }
    async resolveAddress(address) {
        if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
            return address;
        }
        if (!this.#ensClient) {
            throw new Error("ENS provider is not configured.");
        }
        try {
            const resolvedAddress = (await this.#ensClient.getEnsAddress({
                name: (0, ens_1.normalize)(address),
            }));
            if (!resolvedAddress) {
                throw new Error("ENS name could not be resolved.");
            }
            return resolvedAddress;
        }
        catch (error) {
            throw new Error(`Failed to resolve ENS name: ${error}`);
        }
    }
    async signMessage(message) {
        const { id: signatureId, approvals } = await this.#client.signMessageForSmartWallet(this.#address, message, this.#chain, this.signerAccount?.address);
        if (!this.hasCustodialSigner) {
            const account = this.signerAccount;
            if (!account) {
                throw new Error("Signer account is not available");
            }
            const toSign = approvals?.pending[0].message;
            const signature = await account.signMessage({
                message: { raw: toSign },
            });
            await this.#client.approveSignatureForSmartWallet(signatureId, this.#address, `evm-keypair:${this.signerAccount?.address}`, signature);
        }
        while (true) {
            const latestSignature = await this.#client.checkSignatureStatus(signatureId, this.#address);
            if (latestSignature.status === "success") {
                if (!latestSignature.outputSignature) {
                    throw new Error("Signature is undefined");
                }
                return {
                    signature: latestSignature.outputSignature,
                };
            }
            if (latestSignature.status === "failed") {
                throw new Error("Signature failed");
            }
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
    }
    async signTypedData(data) {
        const { id: signatureId, approvals } = await this.#client.signTypedDataForSmartWallet(this.#address, data, this.#chain, this.signerAccount?.address);
        if (!this.hasCustodialSigner) {
            const account = this.signerAccount;
            if (!account) {
                throw new Error("Signer account is not available");
            }
            const toSign = approvals?.pending[0].message;
            const signature = await account.signMessage({
                message: { raw: toSign },
            });
            await this.#client.approveSignatureForSmartWallet(signatureId, this.#address, `evm-keypair:${this.signerAccount?.address}`, signature);
        }
        while (true) {
            const latestSignature = await this.#client.checkSignatureStatus(signatureId, this.#address);
            if (latestSignature.status === "success") {
                if (!latestSignature.outputSignature) {
                    throw new Error("Signature is undefined");
                }
                return {
                    signature: latestSignature.outputSignature,
                };
            }
            if (latestSignature.status === "failed") {
                throw new Error("Signature failed");
            }
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
    }
    async sendTransaction(transaction) {
        return await this._sendBatchOfTransactions([transaction]);
    }
    async sendBatchOfTransactions(transactions) {
        return await this._sendBatchOfTransactions(transactions);
    }
    async read(request) {
        const { address, abi, functionName, args } = request;
        if (!abi)
            throw new Error("Read request must include ABI for EVM");
        const result = await this.#viemClient.readContract({
            address: await this.resolveAddress(address),
            abi,
            functionName,
            args,
        });
        return { value: result };
    }
    async balanceOf(address) {
        const resolvedAddress = await this.resolveAddress(address);
        const balance = await this.#viemClient.getBalance({
            address: resolvedAddress,
        });
        return {
            decimals: 18,
            symbol: "ETH",
            name: "Ethereum",
            value: (0, viem_1.formatUnits)(balance, 18),
            inBaseUnits: balance.toString(),
        };
    }
    async _sendBatchOfTransactions(transactions) {
        const transactionDatas = transactions.map((transaction) => {
            const { to: recipientAddress, abi, functionName, args, value } = transaction;
            return buildTransactionData({
                recipientAddress,
                abi,
                functionName,
                args,
                value,
            });
        });
        const transactionResponse = await this.#client.createTransactionForSmartWallet(this.#address, transactionDatas, this.#chain, this.signerAccount?.address);
        if (!this.hasCustodialSigner) {
            const account = this.signerAccount;
            if (!account) {
                throw new Error("Signer account is not available");
            }
            const userOpHash = transactionResponse.approvals?.pending[0].message;
            if (!userOpHash) {
                throw new Error("User operation hash is not available");
            }
            const signature = await account.signMessage({
                message: { raw: userOpHash },
            });
            await this.#client.approveTransaction(this.#locator, transactionResponse.id, [
                {
                    signature,
                    signer: `evm-keypair:${this.signerAccount?.address}`,
                },
            ]);
        }
        while (true) {
            const latestTransaction = await this.#client.checkTransactionStatus(this.#locator, transactionResponse.id);
            if (latestTransaction.status === "success" || latestTransaction.status === "failed") {
                return {
                    hash: latestTransaction.onChain?.txId ?? "",
                    status: latestTransaction.status,
                };
            }
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
    }
}
exports.SmartWalletClient = SmartWalletClient;
function smartWalletFactory(crossmintClient) {
    const walletsApi = new CrossmintWalletsAPI_1.CrossmintWalletsAPI(crossmintClient);
    return async function smartWallet(options) {
        const { address } = await walletsApi.getWallet(getLocator(options.address, options.linkedUser));
        return new SmartWalletClient(address, walletsApi, options);
    };
}
