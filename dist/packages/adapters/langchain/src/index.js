"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChainTools = getOnChainTools;
const core_1 = require("@goat-sdk/core");
const tools_1 = require("@langchain/core/tools");
async function getOnChainTools({ wallet, plugins, }) {
    const tools = await (0, core_1.getTools)({ wallet, plugins });
    return tools.map((t) => (0, tools_1.tool)(async (arg) => {
        return JSON.stringify(await t.execute(arg));
    }, {
        name: t.name,
        description: t.description,
        schema: t.parameters,
    }));
}
