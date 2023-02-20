import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});

import { AuthData } from '@/types/authData';
import { encryptData } from '@/utils/ecryptData';
import { getOEmbed } from '@/utils/getOEmbed';
import { SecretData } from '@/types/secretData';

/**
 * Retrieve Dojo embed HTML code.
 *
 * @param payload - User data that must be encrypted and used for authentication.
 *
 */
export async function dojoOEmbed(payload: AuthData, secretData: SecretData): Promise<string> {
  const encryptedData = encryptData(payload, secretData);
  const dojoOEmbedResponse = await getOEmbed(payload.challengeId, encryptedData, secretData.challengeServerDomain);
  const dojoOEmbedHtml = dojoOEmbedResponse.html;
  return dojoOEmbedHtml;
}