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
exports.WalletsService = void 0;
const core_1 = require("@goat-sdk/core");
let WalletsService = (() => {
    let _instanceExtraInitializers = [];
    let _createWalletForTwitterUser_decorators;
    let _createWalletForEmail_decorators;
    let _getWalletByTwitterUsername_decorators;
    let _getWalletByEmail_decorators;
    return class WalletsService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createWalletForTwitterUser_decorators = [(0, core_1.Tool)({
                    description: "Create a new wallet for a Twitter / X user",
                })];
            _createWalletForEmail_decorators = [(0, core_1.Tool)({
                    description: "Create a new wallet for an email address",
                })];
            _getWalletByTwitterUsername_decorators = [(0, core_1.Tool)({
                    description: "Get a wallet by Twitter / X username",
                })];
            _getWalletByEmail_decorators = [(0, core_1.Tool)({
                    description: "Get a wallet by email address",
                })];
            __esDecorate(this, null, _createWalletForTwitterUser_decorators, { kind: "method", name: "createWalletForTwitterUser", static: false, private: false, access: { has: obj => "createWalletForTwitterUser" in obj, get: obj => obj.createWalletForTwitterUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createWalletForEmail_decorators, { kind: "method", name: "createWalletForEmail", static: false, private: false, access: { has: obj => "createWalletForEmail" in obj, get: obj => obj.createWalletForEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getWalletByTwitterUsername_decorators, { kind: "method", name: "getWalletByTwitterUsername", static: false, private: false, access: { has: obj => "getWalletByTwitterUsername" in obj, get: obj => obj.getWalletByTwitterUsername }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getWalletByEmail_decorators, { kind: "method", name: "getWalletByEmail", static: false, private: false, access: { has: obj => "getWalletByEmail" in obj, get: obj => obj.getWalletByEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        client = __runInitializers(this, _instanceExtraInitializers);
        constructor(client) {
            this.client = client;
        }
        async createWalletForTwitterUser(parameters) {
            try {
                const response = await fetch(`${this.client.baseUrl}/api/v1-alpha2/wallets`, {
                    method: "POST",
                    headers: {
                        ...this.client.authHeaders,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: `${parameters.chain}-mpc-wallet`,
                        linkedUser: `x:${parameters.username}`,
                    }),
                });
                const result = await response.json();
                if (result.error) {
                    throw new Error(result.message);
                }
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create wallet: ${error}`);
            }
        }
        async createWalletForEmail(parameters) {
            try {
                const response = await fetch(`${this.client.baseUrl}/api/v1-alpha2/wallets`, {
                    method: "POST",
                    headers: {
                        ...this.client.authHeaders,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: `${parameters.chain}-mpc-wallet`,
                        linkedUser: `email:${parameters.email}`,
                    }),
                });
                const result = await response.json();
                if (result.error) {
                    throw new Error(result.message);
                }
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create wallet: ${error}`);
            }
        }
        async getWalletByTwitterUsername(parameters) {
            try {
                const response = await fetch(`${this.client.baseUrl}/api/v1-alpha2/wallets/x:${parameters.username}:${parameters.chain}-mpc-wallet`, {
                    headers: {
                        ...this.client.authHeaders,
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                });
                const result = await response.json();
                if (result.error) {
                    throw new Error(result.message);
                }
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get wallet: ${error}`);
            }
        }
        async getWalletByEmail(parameters) {
            try {
                const response = await fetch(`${this.client.baseUrl}/api/v1-alpha2/wallets/email:${parameters.email}:${parameters.chain}-mpc-wallet`, {
                    headers: {
                        ...this.client.authHeaders,
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                });
                const result = await response.json();
                if (result.error) {
                    throw new Error(result.message);
                }
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get wallet: ${error}`);
            }
        }
    };
})();
exports.WalletsService = WalletsService;
