import { DEFAULT_TASK_TIMEOUT, TokenTransfer, TransferState, Wormhole, amount, } from "@wormhole-foundation/sdk";
import evm from "../../../sdk/dist/esm/platforms/evm.js";
import solana from "../../../sdk/dist/esm/platforms/solana.js";
// Use .env.example as a template for your .env file and populate it with secrets
// for funded accounts on the relevant chain+network combos to run the example
function getEnv(key) {
    // If we're in the browser, return empty string
    if (typeof process === undefined)
        return "";
    // Otherwise, return the env var or error
    const val = process.env[key];
    if (!val)
        throw new Error(`Missing env var ${key}, did you forget to set values in '.env'?`);
    return val;
}
export async function getSigner(chain) {
    // Read in from `.env`
    (await import("dotenv")).config();
    let signer;
    const platform = chain.platform.utils()._platform;
    switch (platform) {
        case "Solana":
            signer = await solana.getSigner(await chain.getRpc(), "51XufFS7DbnzHGo2ujrYpUGD5g8ovwtmPH2RPUFMTPaekdkVmtPbzLSFpZEiWi2faKcBxm2Lkp8NF5PKjfshPxcg", {
                debug: true,
                priorityFee: {
                    // take the middle priority fee
                    percentile: 0.5,
                    // juice the base fee taken from priority fee percentile
                    percentileMultiple: 2,
                    // at least 1 lamport/compute unit
                    min: 1,
                    // at most 1000 lamport/compute unit
                    max: 1000,
                },
            });
            console.log("Signer platform:", platform);
            console.log("Signer address:", signer.address());
            break;
        case "Evm":
            signer = await evm.getSigner(await chain.getRpc(), "d82a39ab849fa5fa2b9c4f2acd7260a9af7c8e593155c4cca255e927700ab762", {
                debug: true,
                maxGasLimit: amount.units(amount.parse("0.01", 18)),
                // overrides is a Partial<TransactionRequest>, so any fields can be overriden
                //overrides: {
                //  maxFeePerGas: amount.units(amount.parse("1.5", 9)),
                //  maxPriorityFeePerGas: amount.units(amount.parse("0.1", 9)),
                //},
            });
            break;
        default:
            throw new Error("Unrecognized platform: " + platform);
    }
    return {
        chain,
        signer: signer,
        address: Wormhole.chainAddress(chain.chain, signer.address()),
    };
}
export async function waitLog(wh, xfer, tag = "WaitLog", timeout = DEFAULT_TASK_TIMEOUT) {
    const tracker = TokenTransfer.track(wh, TokenTransfer.getReceipt(xfer), timeout);
    let receipt;
    for await (receipt of tracker) {
        console.log(`${tag}: Current trasfer state: `, TransferState[receipt.state]);
    }
    return receipt;
}
