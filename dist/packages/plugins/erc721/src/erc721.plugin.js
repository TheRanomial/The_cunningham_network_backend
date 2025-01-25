"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721Plugin = void 0;
exports.erc721 = erc721;
const core_1 = require("@goat-sdk/core");
const token_1 = require("./token");
const tools_1 = require("./tools");
class ERC721Plugin extends core_1.PluginBase {
    tokens;
    constructor({ tokens }) {
        super("erc721", []);
        this.tokens = tokens;
    }
    supportsChain = (chain) => chain.type === "evm";
    getTools(walletClient) {
        const network = walletClient.getChain();
        if (!network.id) {
            throw new Error("Network ID is required");
        }
        const tokenList = (0, token_1.getTokensForNetwork)(network.id, this.tokens);
        return (0, tools_1.getTools)(walletClient, tokenList);
    }
}
exports.ERC721Plugin = ERC721Plugin;
function erc721({ tokens }) {
    return new ERC721Plugin({ tokens });
}
