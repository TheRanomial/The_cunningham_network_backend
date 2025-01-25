"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherscanService = void 0;
require("reflect-metadata");
const core_1 = require("@goat-sdk/core");
const request_1 = require("./request");
let EtherscanService = (() => {
    let _instanceExtraInitializers = [];
    let _getAccountBalance_decorators;
    let _getAccountTransactions_decorators;
    let _getContractABI_decorators;
    let _getContractSourceCode_decorators;
    let _getTransactionStatus_decorators;
    let _getTransactionReceipt_decorators;
    let _getBlockByNumber_decorators;
    let _getTokenBalance_decorators;
    let _getGasPrice_decorators;
    let _getEventLogs_decorators;
    return class EtherscanService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getAccountBalance_decorators = [(0, core_1.Tool)({
                    name: "get_account_balance",
                    description: "Get account balance from Etherscan",
                })];
            _getAccountTransactions_decorators = [(0, core_1.Tool)({
                    name: "get_account_transactions",
                    description: "Get account transactions from Etherscan",
                })];
            _getContractABI_decorators = [(0, core_1.Tool)({
                    name: "get_contract_abi",
                    description: "Get contract ABI from Etherscan",
                })];
            _getContractSourceCode_decorators = [(0, core_1.Tool)({
                    name: "get_contract_source_code",
                    description: "Get contract source code from Etherscan",
                })];
            _getTransactionStatus_decorators = [(0, core_1.Tool)({
                    name: "get_transaction_status",
                    description: "Get transaction status from Etherscan",
                })];
            _getTransactionReceipt_decorators = [(0, core_1.Tool)({
                    name: "get_transaction_receipt",
                    description: "Get transaction receipt from Etherscan",
                })];
            _getBlockByNumber_decorators = [(0, core_1.Tool)({
                    name: "get_block_by_number",
                    description: "Get block by number from Etherscan",
                })];
            _getTokenBalance_decorators = [(0, core_1.Tool)({
                    name: "get_token_balance",
                    description: "Get token balance from Etherscan",
                })];
            _getGasPrice_decorators = [(0, core_1.Tool)({
                    name: "get_gas_price",
                    description: "Get current gas price from Etherscan",
                })];
            _getEventLogs_decorators = [(0, core_1.Tool)({
                    name: "get_event_logs",
                    description: "Get event logs from Etherscan",
                })];
            __esDecorate(this, null, _getAccountBalance_decorators, { kind: "method", name: "getAccountBalance", static: false, private: false, access: { has: obj => "getAccountBalance" in obj, get: obj => obj.getAccountBalance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAccountTransactions_decorators, { kind: "method", name: "getAccountTransactions", static: false, private: false, access: { has: obj => "getAccountTransactions" in obj, get: obj => obj.getAccountTransactions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getContractABI_decorators, { kind: "method", name: "getContractABI", static: false, private: false, access: { has: obj => "getContractABI" in obj, get: obj => obj.getContractABI }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getContractSourceCode_decorators, { kind: "method", name: "getContractSourceCode", static: false, private: false, access: { has: obj => "getContractSourceCode" in obj, get: obj => obj.getContractSourceCode }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTransactionStatus_decorators, { kind: "method", name: "getTransactionStatus", static: false, private: false, access: { has: obj => "getTransactionStatus" in obj, get: obj => obj.getTransactionStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTransactionReceipt_decorators, { kind: "method", name: "getTransactionReceipt", static: false, private: false, access: { has: obj => "getTransactionReceipt" in obj, get: obj => obj.getTransactionReceipt }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getBlockByNumber_decorators, { kind: "method", name: "getBlockByNumber", static: false, private: false, access: { has: obj => "getBlockByNumber" in obj, get: obj => obj.getBlockByNumber }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTokenBalance_decorators, { kind: "method", name: "getTokenBalance", static: false, private: false, access: { has: obj => "getTokenBalance" in obj, get: obj => obj.getTokenBalance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getGasPrice_decorators, { kind: "method", name: "getGasPrice", static: false, private: false, access: { has: obj => "getGasPrice" in obj, get: obj => obj.getGasPrice }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEventLogs_decorators, { kind: "method", name: "getEventLogs", static: false, private: false, access: { has: obj => "getEventLogs" in obj, get: obj => obj.getEventLogs }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _instanceExtraInitializers);
        constructor(apiKey) {
            this.apiKey = apiKey;
        }
        async getAccountBalance(_walletClient, parameters) {
            const { address, tag, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "account", "balance", {
                address,
                tag,
            }), this.apiKey);
        }
        async getAccountTransactions(_walletClient, parameters) {
            const { address, startBlock, endBlock, page, offset, sort, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "account", "txlist", {
                address,
                startblock: startBlock ?? "",
                endblock: endBlock ?? "",
                page: page ?? "",
                offset: offset ?? "",
                sort: sort ?? "",
            }), this.apiKey);
        }
        async getContractABI(_walletClient, parameters) {
            const { address, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "contract", "getabi", {
                address,
            }), this.apiKey);
        }
        async getContractSourceCode(_walletClient, parameters) {
            const { address, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "contract", "getsourcecode", {
                address,
            }), this.apiKey);
        }
        async getTransactionStatus(_walletClient, parameters) {
            const { txhash, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "transaction", "getstatus", {
                txhash,
            }), this.apiKey);
        }
        async getTransactionReceipt(_walletClient, parameters) {
            const { txhash, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "transaction", "gettxreceiptstatus", {
                txhash,
            }), this.apiKey);
        }
        async getBlockByNumber(_walletClient, parameters) {
            const { blockNumber, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "proxy", "eth_getBlockByNumber", {
                tag: typeof blockNumber === "number" ? `0x${blockNumber.toString(16)}` : blockNumber,
                boolean: true,
            }), this.apiKey);
        }
        async getTokenBalance(_walletClient, parameters) {
            const { address, contractAddress, tag, network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "account", "tokenbalance", {
                address,
                contractaddress: contractAddress,
                tag,
            }), this.apiKey);
        }
        async getGasPrice(_walletClient, parameters) {
            const { network } = parameters;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "proxy", "eth_gasPrice", {}), this.apiKey);
        }
        async getEventLogs(_walletClient, parameters) {
            const { address, fromBlock, toBlock, topic0, topic1, topic2, topic3, network } = parameters;
            const params = {
                address,
                fromBlock: typeof fromBlock === "number" ? `0x${fromBlock.toString(16)}` : (fromBlock ?? ""),
                toBlock: typeof toBlock === "number" ? `0x${toBlock.toString(16)}` : (toBlock ?? ""),
            };
            if (topic0)
                params.topic0 = topic0;
            if (topic1)
                params.topic1 = topic1;
            if (topic2)
                params.topic2 = topic2;
            if (topic3)
                params.topic3 = topic3;
            return (0, request_1.etherscanRequest)((0, request_1.buildUrl)(network, "logs", "getLogs", params), this.apiKey);
        }
    };
})();
exports.EtherscanService = EtherscanService;
