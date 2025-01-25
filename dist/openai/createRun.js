export async function createRun(client, thread, assistantId) {
    let run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
    });
    while (run.status == "in_progress" || run.status == "queued") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        run = await client.beta.threads.runs.retrieve(thread.id, run.id);
    }
    return run;
}
