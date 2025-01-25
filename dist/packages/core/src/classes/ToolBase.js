"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolBase = void 0;
exports.createTool = createTool;
/**
 * Abstract base class for creating tools with typed parameters and results
 * @template TParameters - The Zod schema type for the tool's parameters
 * @template TResult - The return type of the tool's execute method
 */
// biome-ignore lint/suspicious/noExplicitAny: 'any' is the correct default type for any function
class ToolBase {
    /** The name of the tool */
    name;
    /** A description of what the tool does */
    description;
    /** The Zod schema defining the parameters, that will be passed to the tool's execute method */
    parameters;
    /**
     * Creates a new Tool instance
     * @param config - The configuration object for the tool
     */
    constructor(config) {
        this.name = config.name;
        this.description = config.description;
        this.parameters = config.parameters;
    }
}
exports.ToolBase = ToolBase;
/**
 * Creates a new Tool instance with the provided configuration and execution function
 * @template TParameters - The Zod schema type for the tool's parameters
 * @template TResult - The return type of the tool's execute method
 * @param config - The configuration object for the tool
 * @param execute - The function to be called when the tool is executed
 * @returns A new Tool instance
 */
// biome-ignore lint/suspicious/noExplicitAny: 'any' is the correct default type for any function
function createTool(config, execute) {
    return new (class extends ToolBase {
        execute(parameters) {
            return execute(parameters);
        }
    })(config);
}
