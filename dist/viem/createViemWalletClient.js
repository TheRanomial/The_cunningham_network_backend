import "dotenv/config";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { encryptedkey, IV, ENCRYPTION_KEY } from "../index.js";
import * as crypto from "crypto";
function decryptKey(encryptedkey) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encryptedkey, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
export function createViemWalletClient() {
    if (!encryptedkey || !IV || !ENCRYPTION_KEY) {
        throw new Error("Missing encrypted key, IV, or encryption key for decryption.");
    }
    const plaintextKey = decryptKey(encryptedkey);
    const account = privateKeyToAccount(`0x${plaintextKey}`);
    return createWalletClient({
        account: account,
        chain: sepolia,
        transport: http(),
    });
}
