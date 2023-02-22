import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});

import { AuthData } from '@/types/authData';
import { encryptData } from '@/utils/encryptData';
import { getOEmbed } from '@/utils/getOEmbed';
import { AuthSecret } from '@/types/authSecret';

/**
 * A class that handles fetching Dojo embedded HTML.
 */
export class DojoEmbed {
  private authDetails?: AuthData;
  private authSecret?: AuthSecret;

  /**
   * Sets the user authentication details and secret required for encrypting the data.
   *
   * @param authDetails - The user data that must be encrypted and used for authentication.
   * @param authSecret - The secret data necessary for encryption and communication with the challenge server.
   */
  public setAuthDetails(authDetails: AuthData, authSecret: AuthSecret): void {
    this.authDetails = authDetails;
    this.authSecret = authSecret;
  }

  /**
   * Retrieves the Dojo embed HTML code for a given challenge ID.
   *
   * @param challengeId - The ID of the challenge to retrieve the embed code for.
   */
  public async getChallengeEmbedHTML(challengeId: string): Promise<string> {
    if (!this.authDetails || !this.authSecret) {
      throw new Error('Auth details are missing');
    }

    const encryptedData = encryptData(this.authDetails, this.authSecret);
    const dojoOEmbedResponse = await getOEmbed(challengeId, encryptedData, this.authSecret.challengeServerDomain);
    const dojoOEmbedHtml = dojoOEmbedResponse.html;
    return dojoOEmbedHtml;
  }
}