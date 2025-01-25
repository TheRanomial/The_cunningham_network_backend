"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTools = getTools;
async function getTools({ wallet, plugins = [], }) {
    const tools = [];
    const chain = wallet.getChain();
    const coreTools = wallet.getCoreTools();
    for (const plugin of plugins) {
        if (!plugin.supportsChain(chain)) {
            console.warn(`Plugin ${plugin.name} does not support ${chain.type}${"id" in chain ? ` chain id ${chain.id}` : ""}. Skipping.`);
        }
        const pluginTools = await plugin.getTools(wallet);
        tools.push(...pluginTools);
    }
    return [...coreTools, ...tools];
}
