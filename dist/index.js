import "dotenv/config";
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { createAssistant } from "./openai/createAssistant.js";
import { createThread } from "./openai/createThread.js";
import { createRun } from "./openai/createRun.js";
import { performRun } from "./openai/performRun.js";
import crypto from "crypto";
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));
let assistant = null;
let thread = null;
(async () => {
    try {
        assistant = await createAssistant(client);
        thread = await createThread(client);
        console.log("Assistant and thread initialized!");
    }
    catch (error) {
        console.error("Error initializing assistant or thread:", error);
    }
})();
/**
 * Handles chat logic with OpenAI.
 * @param {string} userInput - The user input message.
 * @returns {Promise<string>} - The AI response.
 * @throws {Error} - If an error occurs during the chat process.
 */
async function handleChat(userInput) {
    if (!assistant || !thread) {
        throw new Error("Assistant or thread not initialized.");
    }
    await client.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userInput,
    });
    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(client, thread, run);
    if (result?.type === "text") {
        return result.text.value;
    }
    throw new Error("Unexpected response type from OpenAI.");
}
let encryptedkey = "";
app.post("/init", async (req, res) => {
    const { walletKey } = req.body;
    if (!walletKey) {
        res.json("Please provide a wallet key");
    }
    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
    let encrypted = cipher.update(walletKey, "utf8", "hex");
    encrypted += cipher.final("hex");
    encryptedkey = encrypted;
    console.log(encryptedkey);
    res.json({ response: "key successfully stored" });
});
export { encryptedkey, ENCRYPTION_KEY, IV };
app.post("/chat", async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) {
        res.json("Please provide an user's input");
    }
    const response = await handleChat(userInput);
    if (!response) {
        res.json("error in find response");
    }
    res.json({ response });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
