/**
 * Secret data necessary for encryption and communication with the challenge server.
 */
export interface AuthSecret  {
  /**
   * The secret key used for encryption.
   */
  secretKey: string
  /**
   * The secret IV used for encryption.
   */
  secretIv: string
  /**
   * The encryption algorithm used to encrypt data.
   */
  algorithm: string
  /**
   * The domain of the challenge server.
   */
  challengeServerDomain: string
};