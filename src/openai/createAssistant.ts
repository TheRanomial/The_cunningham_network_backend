import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { assistantPrompt } from "../constant/prompt.js";
import { tools } from "../tools/allTools.js";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
  return await client.beta.assistants.create({
    model: "gpt-4o-mini",
    name: "TheRanomial",
    instructions: assistantPrompt,
    tools: Object.values(tools).map((tool) => tool.definition),
  });
}
