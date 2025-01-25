"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperfluidPlugin = void 0;
exports.superfluid = superfluid;
const core_1 = require("@goat-sdk/core");
const superfluid_service_1 = require("./superfluid.service");
class SuperfluidPlugin extends core_1.PluginBase {
    constructor() {
        super("superfluid", [new superfluid_service_1.SuperfluidService()]);
    }
    supportsChain = () => true;
}
exports.SuperfluidPlugin = SuperfluidPlugin;
function superfluid() {
    return new SuperfluidPlugin();
}
