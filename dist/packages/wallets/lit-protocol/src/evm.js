"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitEVMWalletClient = void 0;
exports.createEVMWallet = createEVMWallet;
const wrapped_keys_1 = require("@lit-protocol/wrapped-keys");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const ens_1 = require("viem/ens");
const evmWrappedKeySignEip712Message_1 = require("./litActions/evmWrappedKeySignEip712Message");
const wallet_evm_1 = require("@goat-sdk/wallet-evm");
const { signMessageWithEncryptedKey, signTransactionWithEncryptedKey } = wrapped_keys_1.api;
class LitEVMWalletClient extends wallet_evm_1.EVMWalletClient {
    options;
    litNodeClient;
    pkpSessionSigs;
    wrappedKeyMetadata;
    chainId;
    litEVMChainIdentifier;
    viemWalletClient;
    get viemPublicClient() {
        return this.viemWalletClient.extend(viem_1.publicActions);
    }
    constructor(options) {
        super();
        this.options = options;
        this.litNodeClient = options.litNodeClient;
        this.pkpSessionSigs = options.pkpSessionSigs;
        this.wrappedKeyMetadata = options.wrappedKeyMetadata;
        this.chainId = options.chainId;
        this.litEVMChainIdentifier = options.litEVMChainIdentifier;
        this.viemWalletClient = options.viemWalletClient;
    }
    getPkpAccessControlCondition(pkpAddress) {
        if (!(0, viem_1.isAddress)(pkpAddress)) {
            throw new Error(`pkpAddress is not a valid Ethereum Address: ${pkpAddress}`);
        }
        return {
            contractAddress: "",
            standardContractType: "",
            chain: "ethereum",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
                comparator: "=",
                value: pkpAddress,
            },
        };
    }
    async resolveAddress(address) {
        if (/^0x[a-fA-F0-9]{40}$/.test(address))
            return address;
        try {
            const resolvedAddress = (await this.viemPublicClient.getEnsAddress({
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
    async waitForReceipt(hash) {
        const receipt = await this.viemPublicClient.waitForTransactionReceipt({
            hash,
        });
        return {
            hash: receipt.transactionHash,
            status: receipt.status ? "success" : "failure",
        };
    }
    getAddress() {
        return this.wrappedKeyMetadata.wrappedKeyAddress;
    }
    getChain() {
        return {
            type: "evm",
            id: this.options.chainId ?? 0,
        };
    }
    async signMessage(message) {
        const signature = await signMessageWithEncryptedKey({
            pkpSessionSigs: this.pkpSessionSigs,
            network: "evm",
            id: this.wrappedKeyMetadata.id,
            messageToSign: message,
            litNodeClient: this.litNodeClient,
        });
        return { signature };
    }
    async signTypedData(data) {
        const response = await this.litNodeClient.executeJs({
            sessionSigs: this.pkpSessionSigs,
            code: evmWrappedKeySignEip712Message_1.signEip712MessageLitActionCode,
            jsParams: {
                accessControlConditions: [this.getPkpAccessControlCondition(this.wrappedKeyMetadata.pkpAddress)],
                ciphertext: this.wrappedKeyMetadata.ciphertext,
                dataToEncryptHash: this.wrappedKeyMetadata.dataToEncryptHash,
                messageToSign: JSON.stringify(data),
            },
        });
        return {
            signature: response.response,
        };
    }
    async sendTransaction(transaction) {
        const { to, abi, functionName, args, value } = transaction;
        const toAddress = await this.resolveAddress(to);
        // Simple ETH transfer (no ABI)
        if (!abi) {
            const litTransaction = {
                chainId: this.chainId,
                chain: this.litEVMChainIdentifier,
                toAddress,
                value: (0, viem_1.formatEther)(value ?? 0n),
            };
            const txHash = await signTransactionWithEncryptedKey({
                litNodeClient: this.litNodeClient,
                pkpSessionSigs: this.pkpSessionSigs,
                network: "evm",
                id: this.wrappedKeyMetadata.id,
                unsignedTransaction: litTransaction,
                broadcast: true,
            });
            return this.waitForReceipt(txHash);
        }
        // Contract call
        if (!functionName) {
            throw new Error("Function name is required for contract calls");
        }
        const { request } = await this.viemPublicClient.simulateContract({
            account: this.wrappedKeyMetadata.wrappedKeyAddress,
            address: toAddress,
            abi,
            functionName,
            args,
            chain: this.viemWalletClient.chain,
        });
        // Uses the viem wallet client to send the transaction
        const txHash = await this.viemWalletClient.writeContract(request);
        return this.waitForReceipt(txHash);
    }
    async read(request) {
        const { address, abi, functionName, args } = request;
        if (!abi)
            throw new Error("Read request must include ABI for EVM");
        const result = await this.viemPublicClient.readContract({
            address: await this.resolveAddress(address),
            abi,
            functionName,
            args,
        });
        return { value: result };
    }
    async balanceOf(address) {
        const resolvedAddress = await this.resolveAddress(address);
        const balance = await this.viemPublicClient.getBalance({
            address: resolvedAddress,
        });
        const chain = this.viemWalletClient.chain ?? chains_1.mainnet;
        return {
            value: (0, viem_1.formatUnits)(balance, chain.nativeCurrency.decimals),
            decimals: chain.nativeCurrency.decimals,
            symbol: chain.nativeCurrency.symbol,
            name: chain.nativeCurrency.name,
            inBaseUnits: balance.toString(),
        };
    }
}
exports.LitEVMWalletClient = LitEVMWalletClient;
function createEVMWallet(options) {
    return new LitEVMWalletClient(options);
}
