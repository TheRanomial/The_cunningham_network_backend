import "dotenv/config";
import { encodeFunctionData } from "viem";
import axios from "axios";
import OpenAI from "openai";
import { createViemWalletClient } from "../viem/createViemWalletClient.js";
import { contract_abi } from "./nft_abi.js";
export const mintNftTool = {
    definition: {
        type: "function",
        function: {
            name: "mint_nft",
            description: "Generate a image from the given description and then mint NFT from it",
            parameters: {
                type: "object",
                properties: {
                    imageDescription: {
                        type: "string",
                        desciption: "the details of the image to generate",
                    },
                    wallet: {
                        type: "string",
                        pattern: "^0x[a-fA-F0-9]{40}$",
                        description: "The wallet address to mint the nft for",
                    },
                    contractAddress: {
                        type: "string",
                        desciption: "the contract address to perform function on",
                    },
                },
                required: ["imageDescription", "wallet", "contractAddress"],
            },
        },
    },
    handler: async ({ imageDescription, wallet, contractAddress }) => {
        return await mintnft(imageDescription, wallet, contractAddress);
    },
};
async function mintnft(imageDescription, wallet, contractAddress) {
    try {
        const imageUrl = await generateImage(imageDescription);
        if (!imageUrl) {
            console.error("Failed to generate image: No URL returned");
            return {
                success: false,
                error: "can't get image url",
            };
        }
        const ipfsHash = await uploadToIpfs(imageUrl, imageDescription);
        const nftTransaction = await mintToWallet(wallet, ipfsHash, contractAddress);
        return {
            success: true,
            transaction: nftTransaction,
        };
    }
    catch (error) {
        console.error("Error in mintnft function:", error);
        return {
            success: false,
            error: error,
        };
    }
}
async function generateImage(imageDescription) {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await client.images.generate({
        model: "dall-e-2",
        prompt: imageDescription,
        n: 1,
        size: "512x512",
    });
    return response?.data[0]?.url;
}
async function uploadToIpfs(imageUrl, imageDescription) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("file", blob);
    const imageRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
            "Content-Type": `multipart/form-data;`,
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
        },
    });
    const imageHash = imageRes.data.IpfsHash;
    const metadata = {
        name: `Generated NFT of ${imageDescription}`,
        description: `An AI-generated NFT of the ${imageDescription}`,
        image: `https://moccasin-impossible-reptile-513.mypinata.cloud/ipfs/${imageHash}`,
        attributes: [],
    };
    const metadataFormData = new FormData();
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
    });
    metadataFormData.append("file", metadataBlob);
    const metadataRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", metadataFormData, {
        headers: {
            "Content-Type": `multipart/form-data;`,
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
        },
    });
    return metadataRes.data.IpfsHash;
}
async function mintToWallet(wallet, ipfsHash, contractAddress) {
    const abi = contract_abi;
    const walletClient = createViemWalletClient();
    const functionData = encodeFunctionData({
        abi,
        functionName: "mintNFT",
        args: [
            wallet,
            `https://moccasin-impossible-reptile-513.mypinata.cloud/ipfs/${ipfsHash}`,
        ],
    });
    const txHash = await walletClient.sendTransaction({
        to: contractAddress,
        data: functionData,
    });
    return txHash;
}
