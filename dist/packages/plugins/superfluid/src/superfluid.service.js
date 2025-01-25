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
exports.SuperfluidService = void 0;
const core_1 = require("@goat-sdk/core");
const abi_1 = require("./abi");
let SuperfluidService = (() => {
    let _instanceExtraInitializers = [];
    let _flow_decorators;
    let _getFlowrate_decorators;
    let _updateMemberUnits_decorators;
    let _getUnits_decorators;
    let _getMemberFlowRate_decorators;
    let _getTotalFlowRate_decorators;
    return class SuperfluidService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _flow_decorators = [(0, core_1.Tool)({
                    name: "create_or_update_or_delete_flow",
                    description: "Create, update, or delete a flow of tokens from sender to receiver",
                })];
            _getFlowrate_decorators = [(0, core_1.Tool)({
                    name: "get_flow_rate",
                    description: "Get the current flowrate between a sender and receiver for a specific token",
                })];
            _updateMemberUnits_decorators = [(0, core_1.Tool)({
                    name: "update_member_units",
                    description: "Update the units for a member in a Superfluid Pool",
                })];
            _getUnits_decorators = [(0, core_1.Tool)({
                    name: "get_member_units",
                    description: "Get the units of a member in a Superfluid Pool",
                })];
            _getMemberFlowRate_decorators = [(0, core_1.Tool)({
                    name: "get_member_flow_rate",
                    description: "Get the flow rate of a member in a Superfluid Pool",
                })];
            _getTotalFlowRate_decorators = [(0, core_1.Tool)({
                    name: "get_total_flow_rate",
                    description: "Get the total flow rate of a Superfluid Pool",
                })];
            __esDecorate(this, null, _flow_decorators, { kind: "method", name: "flow", static: false, private: false, access: { has: obj => "flow" in obj, get: obj => obj.flow }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getFlowrate_decorators, { kind: "method", name: "getFlowrate", static: false, private: false, access: { has: obj => "getFlowrate" in obj, get: obj => obj.getFlowrate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateMemberUnits_decorators, { kind: "method", name: "updateMemberUnits", static: false, private: false, access: { has: obj => "updateMemberUnits" in obj, get: obj => obj.updateMemberUnits }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getUnits_decorators, { kind: "method", name: "getUnits", static: false, private: false, access: { has: obj => "getUnits" in obj, get: obj => obj.getUnits }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMemberFlowRate_decorators, { kind: "method", name: "getMemberFlowRate", static: false, private: false, access: { has: obj => "getMemberFlowRate" in obj, get: obj => obj.getMemberFlowRate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTotalFlowRate_decorators, { kind: "method", name: "getTotalFlowRate", static: false, private: false, access: { has: obj => "getTotalFlowRate" in obj, get: obj => obj.getTotalFlowRate }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        CFA_FORWARDER_ADDRESS = (__runInitializers(this, _instanceExtraInitializers), "0xcfA132E353cB4E398080B9700609bb008eceB125");
        async flow(walletClient, parameters) {
            try {
                const hash = await walletClient.sendTransaction({
                    to: this.CFA_FORWARDER_ADDRESS,
                    abi: abi_1.CFA_FORWARDER_ABI,
                    functionName: "setFlowrate",
                    args: [parameters.token, parameters.receiver, parameters.flowrate],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to set flow: ${error}`);
            }
        }
        async getFlowrate(walletClient, parameters) {
            const result = await walletClient.read({
                address: this.CFA_FORWARDER_ADDRESS,
                abi: abi_1.CFA_FORWARDER_ABI,
                functionName: "getFlowrate",
                args: [parameters.token, parameters.sender, parameters.receiver],
            });
            return result.value;
        }
        async updateMemberUnits(walletClient, parameters) {
            try {
                const hash = await walletClient.sendTransaction({
                    to: parameters.poolAddress,
                    abi: abi_1.POOL_ABI,
                    functionName: "updateMemberUnits",
                    args: [parameters.memberAddr, parameters.newUnits],
                });
                return hash.hash;
            }
            catch (error) {
                throw Error(`Failed to update member units: ${error}`);
            }
        }
        async getUnits(walletClient, parameters) {
            const result = await walletClient.read({
                address: parameters.poolAddress,
                abi: abi_1.POOL_ABI,
                functionName: "getUnits",
                args: [parameters.memberAddr],
            });
            return result.value;
        }
        async getMemberFlowRate(walletClient, parameters) {
            const result = await walletClient.read({
                address: parameters.poolAddress,
                abi: abi_1.POOL_ABI,
                functionName: "getMemberFlowRate",
                args: [parameters.memberAddr],
            });
            return result.value;
        }
        async getTotalFlowRate(walletClient, parameters) {
            const result = await walletClient.read({
                address: parameters.poolAddress,
                abi: abi_1.POOL_ABI,
                functionName: "getTotalFlowRate",
                args: [],
            });
            return result.value;
        }
    };
})();
exports.SuperfluidService = SuperfluidService;
