import { handleRunToolCalls } from "./handleRunToolCalls.js";
export async function performRun(client, thread, run) {
    while (run.status == "requires_action") {
        run = await handleRunToolCalls(run, client, thread);
    }
    if (run.status == "failed") {
        const errrorMessage = `oh no i encountered an error ${run.last_error?.message || "unknown error"}`;
        console.error("Run failed", errrorMessage);
        await client.beta.threads.messages.create(thread.id, {
            role: "assistant",
            content: errrorMessage,
        });
        return {
            type: "text",
            text: {
                value: errrorMessage,
                annotation: [],
            },
        };
    }
    const messages = await client.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find((message) => message.role == "assistant");
    return (assistantMessage?.content[0] || {
        type: "text",
        text: { value: "No response from assistant", annotations: [] },
    });
}
