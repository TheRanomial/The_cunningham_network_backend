export const GetNftCollectionTool = {
    definition: {
        type: "function",
        function: {
            name: "get_neft_collection",
            description: "Get the nft collection using colleectionSlug",
            parameters: {
                type: "object",
                properties: {
                    collectionSlug: {
                        type: "string",
                        pattern: "",
                        description: "The collection slug of the given nft",
                    },
                },
                required: ["collectionSlug"],
            },
        },
    },
    handler: async ({ collectionSlug }) => {
        await getNftCollection(collectionSlug);
    },
};
async function getNftCollection(collectionSlug) {
    let nftCollectionStatistics;
    try {
        const response = await fetch(`https://api.opensea.io/api/v2/collections/${collectionSlug}/stats`, {
            headers: {
                accept: "application/json",
                "x-api-key": process.env.OPENSEA_API_KEY,
            },
        });
        nftCollectionStatistics = (await response.json());
    }
    catch (error) {
        throw new Error(`Failed to get NFT collection statistics: ${error}`);
    }
    return nftCollectionStatistics;
}
