"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdeyePlugin = void 0;
exports.birdeye = birdeye;
const core_1 = require("@goat-sdk/core");
const api_1 = require("./api");
const birdeye_service_1 = require("./birdeye.service");
class BirdeyePlugin extends core_1.PluginBase {
    constructor(options) {
        super("birdeye", [new birdeye_service_1.BirdeyeDefiService(new api_1.BirdeyeApi(options.apiKey))]);
    }
    supportsChain() {
        return true;
    }
}
exports.BirdeyePlugin = BirdeyePlugin;
/**
 * Factory function to create a new BirdEye plugin instance
 */
function birdeye(options) {
    return new BirdeyePlugin(options);
}
