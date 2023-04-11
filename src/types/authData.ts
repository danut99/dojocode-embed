/**
 * User data used for authentication.
 */
export interface AuthData {
  /**
   * The user's first name.
   */
  firstName: string,
  /**
   * The user's last name.
   */
  lastName: string,
  /**
   * The user's email address.
   */
  email: string,
  /**
   * The user's username.
   */
  username: string,
  /**
   * The ID of the challenge the user is attempting to access.
   */
  challengeId: string,
  /**
   * (Optional) The user's password.
   */
  password?: string
}