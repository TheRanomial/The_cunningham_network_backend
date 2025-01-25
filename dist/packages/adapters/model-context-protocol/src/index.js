"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChainTools = getOnChainTools;
const core_1 = require("@goat-sdk/core");
const zod_to_json_schema_1 = require("zod-to-json-schema");
async function getOnChainTools({ wallet, plugins, }) {
    const tools = await (0, core_1.getTools)({
        wallet,
        plugins,
    });
    return {
        listOfTools: () => {
            return tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    // biome-ignore lint/suspicious/noExplicitAny: need to infer the parameters type
                    inputSchema: (0, zod_to_json_schema_1.zodToJsonSchema)(tool.parameters),
                };
            });
        },
        toolHandler: async (name, parameters) => {
            const tool = tools.find((tool) => tool.name === name);
            if (!tool) {
                throw new Error(`Tool ${name} not found`);
            }
            const parsedParameters = tool.parameters.parse(parameters);
            const result = await tool.execute(parsedParameters);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result),
                    },
                ],
            };
        },
    };
}
