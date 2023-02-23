import * as dotenv from 'dotenv';
import { createHash, createCipheriv } from 'crypto';

import { AuthData } from '@/types/authData';
import { SecretData } from '@/types/secretData';

dotenv.config();

/**
 * Encrypts user data required for authentication.
 *
 * @param payload - Data to be encrypted.
 *
 */
export function encryptData(payload: AuthData, secretData: SecretData): string {
  const secretKey = secretData.secretKey;
  const secretIv = secretData.secretIv;
  const algorithm = secretData.algorithm;
  const userData = payload;
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
