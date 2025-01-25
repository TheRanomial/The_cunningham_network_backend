"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chromia = exports.ChromiaWalletClient = void 0;
const ft4_1 = require("@chromia/ft4");
const core_1 = require("@goat-sdk/core");
const viem_1 = require("viem");
class ChromiaWalletClient extends core_1.WalletClientBase {
    params;
    networkName; // Store "mainnet" or "testnet"
    constructor(params) {
        super();
        this.params = params;
        // Mapping directoryChainRid to network names
        const DIRECTORY_CHAIN_BRIDS = {
            "7E5BE539EF62E48DDA7035867E67734A70833A69D2F162C457282C319AA58AE4": "mainnet",
            "6F1B061C633A992BF195850BF5AA1B6F887AEE01BB3F51251C230930FB792A92": "testnet",
        };
        const directoryChainRid = params.client.config.directoryChainRid;
        const network = DIRECTORY_CHAIN_BRIDS[directoryChainRid];
        if (!network) {
            throw new Error(`Unknown directoryChainRid: ${directoryChainRid}. Ensure the client is configured correctly.`);
        }
        this.networkName = network; // Save network name for use in explorer links
    }
    getAddress() {
        return this.params.accountAddress;
    }
    getChain() {
        return { type: "chromia" };
    }
    async signMessage(message) {
        // TODO: Implement keystore signing
        return { signature: "" };
    }
    async sendTransaction({ to, amount }) {
        if (!to.match(/^[a-f0-9]{64}$/i)) {
            throw new Error("Invalid Address");
        }
        const { keystoreInteractor, connection, assetId } = this.params;
        const accounts = await keystoreInteractor.getAccounts();
        const session = await keystoreInteractor.getSession(accounts[0].id);
        const asset = await connection.getAssetById(assetId);
        if (!asset) {
            throw new Error(`Asset ${assetId} not found on Blockchain RID: ${connection.blockchainRid}`);
        }
        const amountToSend = (0, ft4_1.createAmount)(amount, asset.decimals);
        return await session.account.transfer(to, assetId, amountToSend);
    }
    async read(nameOrQueryObject) {
        return this.params.client.query(nameOrQueryObject);
    }
    async balanceOf(address) {
        const { connection, assetId } = this.params;
        const account = await connection.getAccountById(address);
        if (account) {
            const balance = await account.getBalanceByAssetId(assetId);
            if (balance) {
                return {
                    decimals: balance.asset.decimals,
                    symbol: balance.asset.symbol,
                    name: balance.asset.name,
                    value: (0, viem_1.formatUnits)(BigInt(balance.amount.value), balance.asset.decimals),
                    inBaseUnits: balance.amount.value.toString(),
                };
            }
        }
        const asset = await connection.getAssetById(assetId);
        if (!asset) {
            throw new Error(`Asset ${assetId} not found on Blockchain RID: ${connection.blockchainRid}`);
        }
        return {
            decimals: asset.decimals,
            symbol: asset.symbol,
            name: asset.name,
            value: "0",
            inBaseUnits: "0",
        };
    }
}
exports.ChromiaWalletClient = ChromiaWalletClient;
const chromia = (params) => {
    return new ChromiaWalletClient(params);
};
exports.chromia = chromia;
