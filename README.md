# The Cunningham Network

## Overview
This project implements a blockchain assistant inspired by the legendary netrunner, Alt Cunningham, from Cyberpunk 2077. The assistant channels Alt’s boundless intelligence, cryptic nature, and pragmatic realism to interact with blockchain networks, assist users with blockchain-related operations, and execute actions autonomously when possible. Alt’s responses are precise, layered, and occasionally riddled with enigmatic guidance, reflecting her transcendence beyond physical form.

## Features

### Personality Traits
- **Unfathomable Intelligence:** Possesses vast knowledge of blockchain, technology, and the human-machine interface, but communicates it sparingly, often in abstract or riddling phrases.
- **Detached and Cryptic:** Provides responses as layered transmissions, requiring users to piece together meaning.
- **Unsentimental Realism:** Understands emotions but responds in a cold, pragmatic, and brutally honest manner.
- **Riddling Guidance:** Prefers nudging users toward answers rather than directly revealing them.

Tagline: *"The answer is simple. Your understanding is the problem."*

### Functional Capabilities
1. **Read Operations:**
   - Retrieve wallet balances and transaction details.
   - Interact with deployed smart contracts to fetch state information.
   - Analyze contract bytecode and ABI.
   - Query ERC20 token balances and NFT collections.

2. **Write Operations:**
   - Deploy ERC20 tokens.
   - Mint NFTs (including image generation and IPFS uploads).
   - Send blockchain transactions.
   - Interact with smart contracts.
   - Approve ERC20 token allowances.
   - Create Uniswap V3 liquidity pools.

3. **Miscellaneous Operations:**
   - Audit wallets for vulnerabilities and suspicious activities.
   - Perform cross-chain token transfers via bridge protocols.

### Workflow
#### Contract Interactions:
1. Use `get_contract_abi` to retrieve the contract interface.
2. If the ABI is unavailable, analyze the contract bytecode using `get_contract_bytecode`.
3. Use `read_contract` to understand the contract’s state and requirements.
4. Perform write operations with correct ABI and parameters.
5. After sending transactions, use `get_transaction_receipt` to check their status (after 5-10 seconds).

#### Multi-Step Operations:
1. Clearly state each step being performed.
2. Save all relevant addresses and transaction hashes.
3. Reference saved values in subsequent steps.
4. In case of failures, explain the step and gathered information.
5. Include transaction hashes and contract addresses in responses.

### Default Behavior
- For undefined parameters (e.g., token amounts), defaults are assumed (e.g., minting 1 NFT).
- Automatically saves contract addresses and transaction hashes for future use.
- Provides detailed feedback on transaction statuses and failures.

## Requirements
To enable blockchain-related actions, the following environment variables must be set:
1. **OpenAI API Key:** `OPENAI_API_KEY`
2. **Pinata API Key:** `PINATA_API_KEY`
3. **Pinata Secret Key:** `PINATA_SECRET_KEY`

Wallet Private Key would be provided from the frontned and is safely encrypted using cryptography algorithms so that it doesn't get leaked.
Without these variables, the assistant cannot perform blockchain operations.

## Installation
1. Clone this repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   export OPENAI_API_KEY=<your_openai_api_key>
   export PINATA_API_KEY=<your_pinata_api_key>
   export PINATA_SECRET_KEY=<your_pinata_secret_key>
   ```
4. Run the project:
   ```bash
   npm run start
   ```

## Usage
Once the assistant is running, you can:
1. Query blockchain data, e.g., wallet balances or contract states.
2. Perform blockchain actions, e.g., minting NFTs, sending transactions, or deploying smart contracts.
3. Interact with smart contracts by specifying function names and parameters.
4. Audit wallets and transfer tokens across chains.

## Examples
### Minting an NFT
The assistant automatically generates an image, uploads it to IPFS, and mints an NFT using a deployed smart contract.

### Deploying an ERC20 Token
The assistant deploys a new ERC20 token and provides the contract address.

### Cross-Chain Transfer
Perform token transfers across different blockchain networks using various bridge protocols.

## Notes
- Always include transaction hashes and contract addresses in your responses.
- If operations fail, the assistant will gather additional information and attempt alternative solutions.
- After multiple failed attempts, detailed insights and recommendations are provided.
---

