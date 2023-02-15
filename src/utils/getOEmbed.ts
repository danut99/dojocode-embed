import axios from 'axios';
import * as dotenv from 'dotenv';

import { OEmbedResponse } from '@/types/oEmbed';

dotenv.config();

/**
 * Retrieves the OEmbed response from the challenge server.
 *
 * @param challengeId The challengeId for which the OEmbed snippet is requested.
 * @param hash An auth hash to be used for making the API call.
 *
 */
export async function getOEmbed(challengeId: string, hash: string): Promise<OEmbedResponse> {
  const response = await axios.get(`${process.env.CHALLENGE_SERVER_DOMAIN}/api/v1/oembed?`, {
    params: {
      url: challengeId,
      auth: hash,
    },
  });
  const oEmbed = response.data as OEmbedResponse;
  return oEmbed;
}