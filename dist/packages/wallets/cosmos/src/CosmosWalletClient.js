"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosClient = void 0;
exports.cosmos = cosmos;
const crypto_1 = require("@cosmjs/crypto");
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const chain_registry_1 = require("chain-registry");
const types_1 = require("./types");
class CosmosClient extends types_1.CosmosWalletClient {
    account;
    client;
    constructor(params) {
        super();
        this.account = params.account;
        this.client = params.client;
    }
    getAddress() {
        return this.account.address ?? "";
    }
    getChain() {
        return { type: "cosmos" };
    }
    async getChainId() {
        return await this.client.getChainId();
    }
    async signMessage(message) {
        const messageBytes = Buffer.from(message);
        const u8 = new TextEncoder().encode(process.env.WALLET_MNEMONICS);
        const keys = await crypto_1.Ed25519.makeKeypair(u8);
        const sig = await crypto_1.Ed25519.createSignature(messageBytes, keys);
        return {
            signature: Buffer.from(sig).toString("hex"),
        };
    }
    async sendTransaction({ message }) {
        const id = await this.client.getChainId();
        const fe = chain_registry_1.chains.find((ch) => ch.chain_id === id)?.fees?.fee_tokens[0];
        if (!fe)
            throw new Error("network data is unavailable");
        const memo = "txn";
        let gas = await this.client.simulate(this.account.address, [message], memo);
        gas = gas * 4;
        let tk = fe?.high_gas_price ?? fe?.average_gas_price ?? fe?.low_gas_price ?? fe?.fixed_min_gas_price ?? 0;
        tk = tk === 0 ? 0.25 : tk;
        const fee = { amount: [{ denom: fe?.denom, amount: Math.round(tk * gas).toString() }], gas: gas.toString() };
        const result = await this.client.signAndBroadcast(this.account.address, [message], fee, memo);
        if (!result.transactionHash)
            throw new Error("transaction was incomplete");
        return {
            value: result,
        };
    }
    async read(requestdata) {
        const cometClient = await tendermint_rpc_1.Tendermint34Client.connect(process.env.RPC_PROVIDER_URL);
        const cli = new stargate_1.QueryClient(cometClient);
        const result = await cli.queryAbci(requestdata.message.typeUrl, requestdata.message.value);
        cometClient.disconnect();
        return {
            value: result,
        };
    }
    async balanceOf(address) {
        const [balance] = await this.client.getAllBalances(address);
        const ast = await this.getChainInfo();
        if (!ast.asset)
            throw new Error("Asset data is unavailable");
        const _ast = ast.asset?.assets.find((a) => a.base === balance.denom);
        const exp = _ast?.denom_units.find((d) => d.denom === _ast?.display);
        const ex = !exp?.exponent ? 0 : exp?.exponent;
        return {
            decimals: ex,
            symbol: _ast?.symbol ?? "unknown",
            name: _ast?.name ?? "unknown",
            value: (Number(balance.amount) / 10 ** ex).toString(),
            inBaseUnits: (Number(balance.amount) / 10 ** ex).toString(),
        };
    }
    async getChainInfo() {
        const id = await this.client.getChainId();
        const chain = chain_registry_1.chains.find((ch) => ch.chain_id === id);
        if (!chain)
            throw new Error("Network data is unavailable");
        const asset = chain_registry_1.assets.find((ast) => ast.chain_name === chain?.chain_name);
        return {
            chain: chain,
            asset: asset,
        };
    }
}
exports.CosmosClient = CosmosClient;
function cosmos({ client, account }) {
    return new CosmosClient({ client, account });
}
