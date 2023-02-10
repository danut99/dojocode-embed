import * as dotenv from 'dotenv';
import { createHash, createCipheriv } from 'crypto';
import axios from 'axios';

dotenv.config();

export async function encryptData(data: any) {
  const secretKey = process.env.AUTH_SECRET_KEY;
  const secretIv = process.env.AUTH_SECRET_IV;
  const algorithm = process.env.AUTH_ALGORITHM;
  const userData = data;

  userData.password = secretIv;

  const hashedKey = createHash('sha256')
    .update(secretKey as string, 'utf-8')
    .digest('hex')
    .substring(0, 32);
  const hashedIv = createHash('sha256')
    .update(secretIv as string, 'utf-8')
    .digest('hex')
    .substring(0, 16);

  const cipher = createCipheriv(algorithm as string, hashedKey, Buffer.from(hashedIv));

  const part1 = cipher.update(JSON.stringify(userData), 'utf-8');

  const part2 = cipher.final();

  const encrypted = Buffer.concat([part1, part2]).toString('base64');

  const hash = encodeURIComponent(encrypted);
  async function getOembed() {
    const response = await axios.get(`${process.env.CHALLENGE_SERVER_DOMAIN}/api/v1/oembed?`, {
      params: {
        url: data.challengeId,
        auth: hash,
      },
    });
    return response.data.html;
  }
  return await getOembed();
}
