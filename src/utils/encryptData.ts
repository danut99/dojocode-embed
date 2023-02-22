import { createHash, createCipheriv } from 'crypto';

import { AuthData } from '@/types/authData';
import { AuthSecret } from '@/types/authSecret';

/**
 * Encrypts user data required for authentication.
 *
 * @param authDetails - Data to be encrypted.
 * @param authSecret - Secret data necessary for encryption and communication with the challenge server.
 *
 */
export function encryptData(authDetails: AuthData, authSecret: AuthSecret): string {
  const secretKey = authSecret.secretKey;
  const secretIv = authSecret.secretIv;
  const algorithm = authSecret.algorithm;
  const userData = authDetails;
  userData.password = secretIv;

  const hashedKey = createHash('sha256')
    .update(secretKey!, 'utf-8')
    .digest('hex')
    .substring(0, 32);
  const hashedIv = createHash('sha256')
    .update(secretIv!, 'utf-8')
    .digest('hex')
    .substring(0, 16);

  const cipher = createCipheriv(algorithm!, hashedKey, Buffer.from(hashedIv));

  const part1 = cipher.update(JSON.stringify(userData), 'utf-8');

  const part2 = cipher.final();

  const encrypted = Buffer.concat([part1, part2]).toString('base64');

  const hash = encodeURIComponent(encrypted);

  return hash;
}
