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
exports.WorldstoreService = void 0;
const core_1 = require("@goat-sdk/core");
let WorldstoreService = (() => {
    let _instanceExtraInitializers = [];
    let _searchForProduct_decorators;
    let _startRedemption_decorators;
    let _verifyRedemption_decorators;
    return class WorldstoreService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _searchForProduct_decorators = [(0, core_1.Tool)({
                    description: "Searches for products on all stores within the WorldStore",
                })];
            _startRedemption_decorators = [(0, core_1.Tool)({
                    description: "Starts the redemption process for products purchased from a WorldStore",
                })];
            _verifyRedemption_decorators = [(0, core_1.Tool)({
                    description: "Verifies a redemption with a signed message",
                })];
            __esDecorate(this, null, _searchForProduct_decorators, { kind: "method", name: "searchForProduct", static: false, private: false, access: { has: obj => "searchForProduct" in obj, get: obj => obj.searchForProduct }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _startRedemption_decorators, { kind: "method", name: "startRedemption", static: false, private: false, access: { has: obj => "startRedemption" in obj, get: obj => obj.startRedemption }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _verifyRedemption_decorators, { kind: "method", name: "verifyRedemption", static: false, private: false, access: { has: obj => "verifyRedemption" in obj, get: obj => obj.verifyRedemption }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        baseUrl = __runInitializers(this, _instanceExtraInitializers);
        constructor(baseUrl) {
            this.baseUrl = baseUrl;
        }
        async searchForProduct(parameters) {
            const queryParams = new URLSearchParams({
                query: parameters.query,
            });
            if (parameters.limit) {
                queryParams.set("limit", parameters.limit);
            }
            const res = await fetch(`${this.baseUrl}/api/worldstore/products/search?${queryParams.toString()}`);
            const json = await res.json();
            return json;
        }
        async startRedemption(parameters) {
            console.log("Starting redemption for shop:", parameters.shopId);
            const res = await fetch(`${this.baseUrl}/api/worldstore/shops/${parameters.shopId}/redemption/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: parameters.walletAddress,
                    items: parameters.items,
                    userInformation: parameters.userInformation,
                }),
            });
            const json = await res.json();
            console.log("Redemption started:", json);
            return json;
        }
        async verifyRedemption(parameters) {
            console.log("Verifying redemption:", parameters.redemptionId);
            const res = await fetch(`${this.baseUrl}/api/worldstore/shops/${parameters.shopId}/redemption/${parameters.redemptionId}/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    signedMessage: parameters.signedMessage,
                }),
            });
            const json = await res.json();
            console.log("Redemption verified:", json);
            return json;
        }
    };
})();
exports.WorldstoreService = WorldstoreService;
