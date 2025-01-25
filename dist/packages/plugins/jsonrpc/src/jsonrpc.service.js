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
exports.JSONRpcService = void 0;
const core_1 = require("@goat-sdk/core");
let JSONRpcService = (() => {
    let _instanceExtraInitializers = [];
    let _JSONRpcFunc_decorators;
    return class JSONRpcService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _JSONRpcFunc_decorators = [(0, core_1.Tool)({
                    description: "Make a remote procedure call to a JSON RPC endpoint",
                })];
            __esDecorate(this, null, _JSONRpcFunc_decorators, { kind: "method", name: "JSONRpcFunc", static: false, private: false, access: { has: obj => "JSONRpcFunc" in obj, get: obj => obj.JSONRpcFunc }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        endpoint = __runInitializers(this, _instanceExtraInitializers);
        constructor({ endpoint } = {}) {
            this.endpoint = endpoint ?? "";
        }
        async JSONRpcFunc(walletClient, parameters) {
            try {
                const url = new URL(`${this.endpoint}`);
                const response = await fetch(url.toString(), {
                    method: "POST",
                    body: JSON.stringify(parameters),
                    headers: {},
                });
                console.log(response, "string");
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }
                return await response.json();
            }
            catch (error) {
                throw Error(`Failed to call endpoint: ${error}`);
            }
        }
    };
})();
exports.JSONRpcService = JSONRpcService;
