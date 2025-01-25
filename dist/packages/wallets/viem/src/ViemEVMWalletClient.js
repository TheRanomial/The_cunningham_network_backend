"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViemEVMWalletClient = void 0;
exports.viem = viem;
const wallet_evm_1 = require("@goat-sdk/wallet-evm");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const ens_1 = require("viem/ens");
const zksync_1 = require("viem/zksync");
class ViemEVMWalletClient extends wallet_evm_1.EVMWalletClient {
    #client;
    #defaultPaymaster;
    #defaultPaymasterInput;
    get publicClient() {
        return this.#client.extend(viem_1.publicActions);
    }
    constructor(client, options) {
        super();
        this.#client = client;
        this.#defaultPaymaster = options?.paymaster?.defaultAddress ?? "";
        this.#defaultPaymasterInput =
            options?.paymaster?.defaultInput ??
                (0, zksync_1.getGeneralPaymasterInput)({
                    innerInput: "0x",
                });
    }
    getAddress() {
        return this.#client.account?.address ?? "";
    }
    getChain() {
        return {
            type: "evm",
            id: this.#client.chain?.id ?? 0,
        };
    }
    async resolveAddress(address) {
        if (/^0x[a-fA-F0-9]{40}$/.test(address))
            return address;
        try {
            const resolvedAddress = (await this.publicClient.getEnsAddress({
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
        if (!this.#client.account)
            throw new Error("No account connected");
        const signature = await this.#client.signMessage({
            message,
            account: this.#client.account,
        });
        return { signature };
    }
    async signTypedData(data) {
        if (!this.#client.account)
            throw new Error("No account connected");
        const signature = await this.#client.signTypedData({
            domain: {
                ...data.domain,
                chainId: typeof data.domain.chainId === "bigint" ? Number(data.domain.chainId) : data.domain.chainId,
            },
            types: data.types,
            primaryType: data.primaryType,
            message: data.message,
            account: this.#client.account,
        });
        return { signature };
    }
    async sendTransaction(transaction) {
        const { to, abi, functionName, args, value, options, data } = transaction;
        if (!this.#client.account)
            throw new Error("No account connected");
        const toAddress = await this.resolveAddress(to);
        const paymaster = options?.paymaster?.address ?? this.#defaultPaymaster;
        const paymasterInput = options?.paymaster?.input ?? this.#defaultPaymasterInput;
        const txHasPaymaster = !!paymaster && !!paymasterInput;
        // If paymaster params exist, extend with EIP712 actions
        const sendingClient = txHasPaymaster ? this.#client.extend((0, zksync_1.eip712WalletActions)()) : this.#client;
        // Simple ETH transfer (no ABI)
        if (!abi) {
            const txParams = {
                account: this.#client.account,
                to: toAddress,
                chain: this.#client.chain,
                value,
                data,
                ...(txHasPaymaster ? { paymaster, paymasterInput } : {}),
            };
            const txHash = await sendingClient.sendTransaction(txParams);
            return this.waitForReceipt(txHash);
        }
        // Contract call
        if (!functionName) {
            throw new Error("Function name is required for contract calls");
        }
        const { request } = await this.publicClient.simulateContract({
            account: this.#client.account,
            address: toAddress,
            abi: abi,
            functionName,
            args,
            chain: this.#client.chain,
            value: value,
        });
        if (txHasPaymaster) {
            const payMasterData = (0, viem_1.encodeFunctionData)({
                abi: abi,
                functionName,
                args,
            });
            // With paymaster, we must use sendTransaction() directly
            const txParams = {
                account: this.#client.account,
                chain: this.#client.chain,
                to: request.address,
                data: payMasterData,
                value: request.value,
                paymaster,
                paymasterInput,
            };
            const txHash = await sendingClient.sendTransaction(txParams);
            return this.waitForReceipt(txHash);
        }
        // Without paymaster, use writeContract which handles encoding too,
        // but since we already have request, let's let writeContract do its thing.
        // However, writeContract expects the original request format (with abi, functionName, args).
        const txHash = await this.#client.writeContract(request);
        return this.waitForReceipt(txHash);
    }
    async read(request) {
        const { address, abi, functionName, args } = request;
        if (!abi)
            throw new Error("Read request must include ABI for EVM");
        const result = await this.publicClient.readContract({
            address: await this.resolveAddress(address),
            abi,
            functionName,
            args,
        });
        return { value: result };
    }
    async balanceOf(address) {
        const resolvedAddress = await this.resolveAddress(address);
        const balance = await this.publicClient.getBalance({
            address: resolvedAddress,
        });
        const chain = this.#client.chain ?? chains_1.mainnet;
        return {
            value: (0, viem_1.formatUnits)(BigInt(balance), chain.nativeCurrency.decimals),
            decimals: chain.nativeCurrency.decimals,
            symbol: chain.nativeCurrency.symbol,
            name: chain.nativeCurrency.name,
            inBaseUnits: balance.toString(),
        };
    }
    async waitForReceipt(txHash) {
        const receipt = await this.publicClient.waitForTransactionReceipt({
            hash: txHash,
        });
        return { hash: receipt.transactionHash, status: receipt.status };
    }
}
exports.ViemEVMWalletClient = ViemEVMWalletClient;
function viem(client, options) {
    return new ViemEVMWalletClient(client, options);
}
