"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZilliqaJSViemWalletClient = exports.ZilliqaWalletClient = void 0;
exports.zilliqaChainId = zilliqaChainId;
exports.zilliqaJSViemWalletClient = zilliqaJSViemWalletClient;
//import { EVMWalletClient } from "@goat-sdk/wallet-evm";
const core_1 = require("@goat-sdk/core");
const wallet_viem_1 = require("@goat-sdk/wallet-viem");
const zilliqa_1 = require("@zilliqa-js/zilliqa");
class ZilliqaWalletClient extends core_1.WalletClientBase {
}
exports.ZilliqaWalletClient = ZilliqaWalletClient;
// Zilliqa has two APIs - EVM and native. The native API is provided by the Zilliqa object. For the EVM API,
// we thunk down to viem.
//
// We need to encapsulate, rather than extend ViemEVMWalletClient so that we can report our chain type correctly.
// One day it would be nice to add the ability to use ZilPay client integration, but those libraries don't exist yet,
// so we do this instead.
class ZilliqaJSViemWalletClient extends ZilliqaWalletClient {
    zilliqa;
    viem;
    // This was originally a static assignment; however, this causes
    // typescript to emit invalid JS when compiling the CJS version of
    // the distribution package, so it is now initialized in the
    // constructor.
    chainId;
    constructor(client, node, account, chainId, options) {
        super();
        this.chainId = 0;
        this.viem = new wallet_viem_1.ViemEVMWalletClient(client, options);
        this.zilliqa = new zilliqa_1.Zilliqa(node);
        this.zilliqa.wallet.addByPrivateKey(account.privateKey);
        this.chainId = chainId;
    }
    getZilliqaChainId() {
        return this.chainId;
    }
    // Use the EVM address here - callers expecting the Zilliqa address will hopefully know
    // to get an address from getZilliqa() instead.
    getAddress() {
        return this.viem.getAddress();
    }
    // We have to return "evm" here because that is what getChain()
    // requires and it is necessary to enable plugins that expect us
    // to be evm.
    getChain() {
        return {
            type: "zilliqa",
            id: this.chainId,
            evmId: this.chainId | 0x8000,
        };
    }
    signMessage(message) {
        return this.viem.signMessage(message);
    }
    balanceOf(address) {
        return this.viem.balanceOf(address);
    }
    getEVM() {
        return this.viem;
    }
    getZilliqa() {
        return this.zilliqa;
    }
}
exports.ZilliqaJSViemWalletClient = ZilliqaJSViemWalletClient;
// This is separate because it requires an RPC call and is thus async.
async function zilliqaChainId(node) {
    const tempZil = new zilliqa_1.Zilliqa(node);
    return Number.parseInt((await tempZil.network.GetNetworkId())?.result);
}
function zilliqaJSViemWalletClient(client, node, account, chainId, options) {
    return new ZilliqaJSViemWalletClient(client, node, account, chainId, options);
}
