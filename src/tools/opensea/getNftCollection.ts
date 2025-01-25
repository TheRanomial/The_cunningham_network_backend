import { Address } from "viem";
import { z } from "zod";
import { ToolConfig } from "../allTools.js";
import {
  GetNftCollectionStatisticsParametersSchema,
  GetNftCollectionStatisticsResponseSchema,
} from "./parameters.js";

interface GetNftCollectionArgs {
  collectionSlug: string;
}

export const GetNftCollectionTool: ToolConfig<GetNftCollectionArgs> = {
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

async function getNftCollection(collectionSlug: string) {
  let nftCollectionStatistics: z.infer<
    typeof GetNftCollectionStatisticsResponseSchema
  >;
  try {
    const response = await fetch(
      `https://api.opensea.io/api/v2/collections/${collectionSlug}/stats`,
      {
        headers: {
          accept: "application/json",
          "x-api-key": process.env.OPENSEA_API_KEY as string,
        },
      }
    );

    nftCollectionStatistics = (await response.json()) as z.infer<
      typeof GetNftCollectionStatisticsResponseSchema
    >;
  } catch (error) {
    throw new Error(`Failed to get NFT collection statistics: ${error}`);
  }

  return nftCollectionStatistics;
}
