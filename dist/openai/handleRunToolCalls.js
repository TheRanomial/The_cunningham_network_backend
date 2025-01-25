import { tools } from "../tools/allTools.js";
export async function handleRunToolCalls(run, client, thread) {
    const toolCalls = run?.required_action?.submit_tool_outputs?.tool_calls;
    if (!toolCalls) {
        return run;
    }
    const toolOutputs = await Promise.all(toolCalls.map(async (tool) => {
        const toolConfig = tools[tool.function.name];
        if (!toolConfig) {
            console.error(`Tool ${tool.function.name} not found`);
            return null;
        }
        try {
            const args = JSON.parse(tool.function.arguments);
            const output = await toolConfig.handler(args);
            return {
                tool_call_id: tool.id,
                output: JSON.stringify(output),
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                tool_call_id: tool.id,
                output: JSON.stringify({ error: errorMessage }),
            };
        }
    }));
    const validOutputs = toolOutputs.filter(Boolean);
    if (validOutputs.length === 0)
        return run;
    return client.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
        tool_outputs: validOutputs,
    });
}
