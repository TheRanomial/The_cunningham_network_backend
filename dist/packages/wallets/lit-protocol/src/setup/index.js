"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLitNodeClient = createLitNodeClient;
exports.createLitContractsClient = createLitContractsClient;
exports.createEthersWallet = createEthersWallet;
exports.mintCapacityCredit = mintCapacityCredit;
exports.createCapacityCreditDelegationAuthSig = createCapacityCreditDelegationAuthSig;
exports.mintPKP = mintPKP;
exports.getPKPSessionSigs = getPKPSessionSigs;
exports.generateWrappedKey = generateWrappedKey;
exports.getWrappedKeyMetadata = getWrappedKeyMetadata;
const auth_helpers_1 = require("@lit-protocol/auth-helpers");
const constants_1 = require("@lit-protocol/constants");
const contracts_sdk_1 = require("@lit-protocol/contracts-sdk");
const lit_auth_client_1 = require("@lit-protocol/lit-auth-client");
const lit_node_client_1 = require("@lit-protocol/lit-node-client");
const wrapped_keys_1 = require("@lit-protocol/wrapped-keys");
const ethers_1 = require("ethers");
const { generatePrivateKey, getEncryptedKey } = wrapped_keys_1.api;
/**
 * Creates and initializes a new Lit Protocol node client
 * @param network - The Lit Network to connect to (e.g., 'datil', 'datil-test', 'datil')
 * @param debug - Optional flag to enable debug logging (default: false)
 * @returns Promise resolving to a connected LitNodeClient instance
 * @throws Error if connection fails
 */
async function createLitNodeClient(network, debug = false) {
    const litNodeClient = new lit_node_client_1.LitNodeClient({
        litNetwork: network,
        debug,
    });
    await litNodeClient.connect();
    return litNodeClient;
}
/**
 * Creates and connects a Lit Contracts client for interacting with Lit Protocol smart contracts
 * @param ethersWallet - Initialized Ethers wallet instance for signing transactions
 * @param network - The Lit Network to connect to (e.g., 'datil', 'datil-test', 'datil')
 * @returns Promise resolving to a connected LitContracts instance
 * @throws Error if connection fails
 */
async function createLitContractsClient(ethersWallet, network) {
    const litContractClient = new contracts_sdk_1.LitContracts({
        signer: ethersWallet,
        network,
    });
    await litContractClient.connect();
    return litContractClient;
}
/**
 * Creates an Ethers wallet instance configured for Lit Protocol
 * @param privateKey - Private key for the wallet (with 0x prefix)
 * @returns Configured Ethers wallet instance connected to Lit RPC
 */
function createEthersWallet(privateKey) {
    return new ethers_1.ethers.Wallet(privateKey, new ethers_1.ethers.providers.JsonRpcProvider(constants_1.LIT_RPC.CHRONICLE_YELLOWSTONE));
}
/**
 * Mints a new capacity credit NFT for rate limiting
 * @param litContractClient - Connected LitContracts instance
 * @param requestsPerSecond - Number of requests per second allowed
 * @param daysUntilUTCMidnightExpiration - Number of days until the credit expires at UTC midnight (max is 30 days)
 * @returns Promise resolving to minting transaction result with capacity token details
 * @throws Error if minting fails
 */
async function mintCapacityCredit(litContractClient, requestsPerSecond, daysUntilUTCMidnightExpiration) {
    return litContractClient.mintCapacityCreditsNFT({
        requestsPerSecond: requestsPerSecond,
        daysUntilUTCMidnightExpiration: daysUntilUTCMidnightExpiration,
    });
}
/**
 * Creates an authentication signature for capacity credit delegation
 * @param litNodeClient - Connected LitNodeClient instance
 * @param ethersWallet - Initialized Ethers wallet instance for signing transactions
 * @param capacityTokenId - ID of the capacity credit token to delegate
 * @param pkpEthAddress - Ethereum address of the PKP to delegate to
 * @returns Promise resolving to AuthSig for delegation
 * @throws Error if signature creation fails
 */
async function createCapacityCreditDelegationAuthSig(litNodeClient, ethersWallet, capacityTokenId, pkpEthAddress) {
    const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
        dAppOwnerWallet: ethersWallet,
        capacityTokenId,
        delegateeAddresses: [pkpEthAddress],
        uses: "2",
        expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
    });
    return capacityDelegationAuthSig;
}
/**
 * Mints a new Programmable Key Pair (PKP) NFT
 * @param litContractClient - Connected LitContracts instance
 * @returns Promise resolving to PKP details including tokenId, publicKey, and ethAddress
 * @throws Error if minting fails
 */
async function mintPKP(litContractClient) {
    return (await litContractClient.pkpNftContractUtils.write.mint()).pkp;
}
/**
 * Obtains session signatures for PKP authentication and capabilities
 * @param litNodeClient - Connected LitNodeClient instance
 * @param pkpPublicKey - Public key of the PKP
 * @param pkpEthAddress - Ethereum address of the PKP
 * @param ethersWallet - Initialized Ethers wallet instance for signing transactions
 * @param capacityTokenId - ID of the capacity credit token
 * @returns Promise resolving to session signatures
 * @throws Error if signature generation fails
 */
async function getPKPSessionSigs(litNodeClient, pkpPublicKey, pkpEthAddress, ethersWallet, capacityTokenId) {
    return litNodeClient.getPkpSessionSigs({
        pkpPublicKey,
        capabilityAuthSigs: [
            await createCapacityCreditDelegationAuthSig(litNodeClient, ethersWallet, capacityTokenId, pkpEthAddress),
        ],
        authMethods: [
            await lit_auth_client_1.EthWalletProvider.authenticate({
                signer: ethersWallet,
                litNodeClient,
                expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
            }),
        ],
        resourceAbilityRequests: [
            {
                resource: new auth_helpers_1.LitPKPResource("*"),
                ability: constants_1.LIT_ABILITY.PKPSigning,
            },
            {
                resource: new auth_helpers_1.LitActionResource("*"),
                ability: constants_1.LIT_ABILITY.LitActionExecution,
            },
        ],
        expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
    });
}
/**
 * Generates a new wrapped key for secure key management
 * @param litNodeClient - Connected LitNodeClient instance
 * @param pkpSessionSigs - Valid session signatures for the PKP
 * @param network - Target network ('evm' or 'solana')
 * @param memo - Optional memo to attach to the wrapped key
 * @returns Promise resolving to wrapped key generation result
 * @throws Error if key generation fails
 */
async function generateWrappedKey(litNodeClient, pkpSessionSigs, network, memo) {
    return generatePrivateKey({
        litNodeClient,
        pkpSessionSigs,
        network,
        memo: memo ?? "This is a wrapped key generated by the Lit Goat Wallet Client",
    });
}
/**
 * Retrieves metadata for a wrapped key with Ethereum address
 * @param litNodeClient - Connected LitNodeClient instance
 * @param pkpSessionSigs - Valid session signatures for the PKP
 * @param wrappedKeyId - ID of the wrapped key to retrieve
 * @returns Promise resolving to wrapped key metadata with normalized Ethereum address
 * @throws Error if metadata retrieval fails
 */
async function getWrappedKeyMetadata(litNodeClient, pkpSessionSigs, wrappedKeyId) {
    const keyMetadata = await getEncryptedKey({
        litNodeClient,
        pkpSessionSigs,
        id: wrappedKeyId,
    });
    return {
        ...keyMetadata,
        wrappedKeyAddress: ethers_1.ethers.utils.computeAddress(keyMetadata.publicKey),
    };
}
