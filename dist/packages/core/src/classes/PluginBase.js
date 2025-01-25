"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginBase = void 0;
const Tool_1 = require("../decorators/Tool");
const ToolBase_1 = require("./ToolBase");
/**
 * Abstract base class for plugins that provide tools for wallet interactions.
 */
class PluginBase {
    name;
    toolProviders;
    /**
     * Creates a new Plugin instance.
     * @param name - The name of the plugin
     * @param toolProviders - Array of class instances that provide tools
     */
    constructor(name, 
    // biome-ignore lint/complexity/noBannedTypes: Object is the correct type, referring to instances of classes
    toolProviders) {
        this.name = name;
        this.toolProviders = toolProviders;
    }
    /**
     * Retrieves the tools provided by the plugin.
     * @param wallet - The wallet client to use for tool execution
     * @returns An array of tools
     */
    getTools(walletClient) {
        const tools = [];
        for (const toolProvider of this.toolProviders) {
            const toolsMap = Reflect.getMetadata(Tool_1.toolMetadataKey, toolProvider.constructor);
            if (!toolsMap) {
                const constructorName = toolProvider.constructor.name;
                if (constructorName === "Function") {
                    console.warn("Detected a non-instance tool provider. Please ensure you're passing instances of your tool providers, by using `new MyToolProvider(..)`");
                }
                else {
                    console.warn(`No tools found for ${constructorName}. Please ensure you're using the '@Tool' decorator to expose your tools.`);
                }
                continue;
            }
            for (const tool of toolsMap.values()) {
                tools.push((0, ToolBase_1.createTool)({
                    name: tool.name,
                    description: tool.description,
                    parameters: tool.parameters.schema,
                }, (params) => {
                    const args = [];
                    if (tool.walletClient) {
                        args[tool.walletClient.index] = walletClient;
                    }
                    args[tool.parameters.index] = params;
                    return tool.target.apply(toolProvider, args);
                }));
            }
        }
        return tools;
    }
}
exports.PluginBase = PluginBase;
