//Secret data necessary for encryption and communication with the challenge server.
export interface AuthSecret  {
  secretKey: string
  secretIv: string
  algorithm: string
  challengeServerDomain: string
};