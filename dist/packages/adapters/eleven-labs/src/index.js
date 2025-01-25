"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChainTools = getOnChainTools;
const core_1 = require("@goat-sdk/core");
async function getOnChainTools({ wallet, plugins, options, }) {
    const tools = await (0, core_1.getTools)({
        wallet,
        plugins,
    });
    const elevenLabsTools = {};
    if (options?.logTools) {
        console.log("Tools:\n");
    }
    for (const [index, t] of tools.entries()) {
        elevenLabsTools[t.name] = async (parameters) => {
            return JSON.stringify(await t.execute(parameters));
        };
        if (options?.logTools) {
            console.log(`\n${index + 1}. ${t.name}\n\nDescription: ${t.description}\n\nParameters:\n${(0, core_1.addParametersToDescription)("", t.parameters)}\n`);
        }
    }
    return elevenLabsTools;
}
