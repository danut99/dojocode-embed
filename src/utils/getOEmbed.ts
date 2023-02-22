import axios from 'axios';

import { OEmbedResponse } from '@/types/oEmbed';

/**
 * Retrieves the OEmbed response from the challenge server.
 *
 * @param challengeId - The challengeId for which the OEmbed snippet is requested.
 * @param hash - An auth hash to be used for making the API call.
 * @param challengeServerDomain - The domain of the challenge server.
 *
 */
export async function getOEmbed(challengeId: string, hash: string, challengeServerDomain: string): Promise<OEmbedResponse> {
  try {
    const response = await axios.get(`${challengeServerDomain}/api/v1/oembed`, {
      params: {
        url: challengeId,
        auth: hash,
      },
    });
    const oEmbed = response.data as OEmbedResponse;
    return oEmbed;
  }catch (error) {
    throw new Error(JSON.stringify({
      statusCode: 500,
      statusMessage: "500 Internal Server Error",
      message: "Error fetching oEmbed for challenge"
    }));
  }
}