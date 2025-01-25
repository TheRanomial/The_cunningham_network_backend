"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnChainActions = getOnChainActions;
const eliza_1 = require("@ai16z/eliza");
const core_1 = require("@goat-sdk/core");
/**
 * Get all the on chain actions for the given wallet client and plugins
 *
 * @param params
 * @returns
 */
async function getOnChainActions({ wallet, plugins, }) {
    const tools = await (0, core_1.getTools)({
        wallet,
        plugins,
    });
    return tools.map((tool) => createAction(tool));
}
function createAction(tool) {
    return {
        name: tool.name.toUpperCase(),
        similes: [],
        description: tool.description,
        validate: async () => true,
        handler: async (runtime, message, state, options, callback) => {
            try {
                let currentState = state ?? (await runtime.composeState(message));
                currentState = await runtime.updateRecentMessageState(currentState);
                const parameterContext = composeParameterContext(tool, currentState);
                const parameters = await generateParameters(runtime, parameterContext, tool);
                const parsedParameters = tool.parameters.safeParse(parameters);
                if (!parsedParameters.success) {
                    callback?.({
                        text: `Invalid parameters for action ${tool.name}: ${parsedParameters.error.message}`,
                        content: { error: parsedParameters.error.message },
                    });
                    return false;
                }
                const result = await tool.execute(parsedParameters.data);
                const responseContext = composeResponseContext(tool, result, currentState);
                const response = await generateResponse(runtime, responseContext);
                callback?.({ text: response, content: result });
                return true;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                callback?.({
                    text: `Error executing action ${tool.name}: ${errorMessage}`,
                    content: { error: errorMessage },
                });
                return false;
            }
        },
        examples: [],
    };
}
function composeParameterContext(tool, state) {
    const contextTemplate = `{{recentMessages}}

Given the recent messages, extract the following information for the action "${tool.name}":
${(0, core_1.addParametersToDescription)("", tool.parameters)}
`;
    return (0, eliza_1.composeContext)({ state, template: contextTemplate });
}
async function generateParameters(runtime, context, tool) {
    const { object } = await (0, eliza_1.generateObjectV2)({
        runtime,
        context,
        modelClass: eliza_1.ModelClass.LARGE,
        schema: tool.parameters,
    });
    return object;
}
function composeResponseContext(tool, result, state) {
    const responseTemplate = `
    # Action Examples
{{actionExamples}}
(Action examples are for reference only. Do not use the information from them in your response.)

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.

The action "${tool.name}" was executed successfully.
Here is the result:
${JSON.stringify(result)}

{{actions}}

Respond to the message knowing that the action was successful and these were the previous messages:
{{recentMessages}}
  `;
    return (0, eliza_1.composeContext)({ state, template: responseTemplate });
}
async function generateResponse(runtime, context) {
    return (0, eliza_1.generateText)({
        runtime,
        context,
        modelClass: eliza_1.ModelClass.LARGE,
    });
}
