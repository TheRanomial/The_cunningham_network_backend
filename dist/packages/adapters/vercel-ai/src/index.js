"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChainTools = getOnChainTools;
const core_1 = require("@goat-sdk/core");
const ai_1 = require("ai");
async function getOnChainTools({ wallet, plugins, }) {
    const tools = await (0, core_1.getTools)({
        wallet,
        plugins,
    });
    const aiTools = {};
    for (const t of tools) {
        aiTools[t.name] = (0, ai_1.tool)({
            description: t.description,
            parameters: t.parameters,
            execute: async (arg) => {
                return await t.execute(arg);
            },
        });
    }
    return aiTools;
}
