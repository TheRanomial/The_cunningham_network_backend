"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChainTools = getOnChainTools;
const core_1 = require("@goat-sdk/core");
const llamaindex_1 = require("llamaindex");
const zod_to_json_schema_1 = require("zod-to-json-schema");
async function getOnChainTools({ wallet, plugins, }) {
    const tools = await (0, core_1.getTools)({ wallet, plugins });
    return tools.map((t) => new llamaindex_1.FunctionTool(async (arg) => {
        return await t.execute(arg);
    }, {
        name: t.name,
        description: t.description,
        parameters: (0, zod_to_json_schema_1.zodToJsonSchema)(t.parameters, {
            target: "jsonSchema7",
        }),
    }));
}
