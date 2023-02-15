import * as dotenv from 'dotenv';
import { createHash, createCipheriv } from 'crypto';

import { AuthData } from '@/types/authData';

dotenv.config();

/**
 * Encrypts user data required for authentication.
 *
 * @param payload - Data to be encrypted.
 *
 */
export function encryptData(payload: AuthData): string {
  const secretKey = process.env.AUTH_SECRET_KEY;
  const secretIv = process.env.AUTH_SECRET_IV;
  const algorithm = process.env.AUTH_ALGORITHM;
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
