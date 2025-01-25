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
exports.FarcasterClient = void 0;
const core_1 = require("@goat-sdk/core");
let FarcasterClient = (() => {
    let _instanceExtraInitializers = [];
    let _getCast_decorators;
    let _publishCast_decorators;
    let _searchCasts_decorators;
    let _getConversation_decorators;
    return class FarcasterClient {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getCast_decorators = [(0, core_1.Tool)({
                    description: "Get a cast by its URL or hash",
                })];
            _publishCast_decorators = [(0, core_1.Tool)({
                    description: "Publish a new cast",
                })];
            _searchCasts_decorators = [(0, core_1.Tool)({
                    description: "Search for casts",
                })];
            _getConversation_decorators = [(0, core_1.Tool)({
                    description: "Get a conversation by its URL or hash",
                })];
            __esDecorate(this, null, _getCast_decorators, { kind: "method", name: "getCast", static: false, private: false, access: { has: obj => "getCast" in obj, get: obj => obj.getCast }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _publishCast_decorators, { kind: "method", name: "publishCast", static: false, private: false, access: { has: obj => "publishCast" in obj, get: obj => obj.publishCast }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _searchCasts_decorators, { kind: "method", name: "searchCasts", static: false, private: false, access: { has: obj => "searchCasts" in obj, get: obj => obj.searchCasts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getConversation_decorators, { kind: "method", name: "getConversation", static: false, private: false, access: { has: obj => "getConversation" in obj, get: obj => obj.getConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _instanceExtraInitializers);
        baseUrl;
        constructor(config) {
            this.apiKey = config.apiKey;
            this.baseUrl = config.baseUrl || "https://api.neynar.com/v2/farcaster";
        }
        async getCast(params) {
            return this.makeRequest(`/cast?identifier=${params.identifier}&type=${params.type}`);
        }
        async publishCast(params) {
            return this.makeRequest("/cast", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    signer_uuid: params.signer_uuid,
                    text: params.text,
                    parent: params.parent,
                    channel_id: params.channel_id,
                }),
            });
        }
        async searchCasts(params) {
            const searchParams = new URLSearchParams({
                q: params.query,
                ...Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)])),
            });
            return this.makeRequest(`/cast/search?${searchParams}`);
        }
        async getConversation(params) {
            const searchParams = new URLSearchParams({
                identifier: params.identifier,
                type: params.type || "hash",
                reply_depth: String(params.reply_depth || 2),
                limit: String(params.limit || 20),
            });
            return this.makeRequest(`/cast/conversation?${searchParams}`);
        }
        async makeRequest(endpoint, options = {}) {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    accept: "application/json",
                    "x-api-key": this.apiKey,
                    ...options.headers,
                },
            });
            if (!response.ok) {
                throw new Error(`Farcaster API error: ${response.statusText}`);
            }
            return response.json();
        }
    };
})();
exports.FarcasterClient = FarcasterClient;
