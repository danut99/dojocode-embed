//User data used for authentication.
export interface AuthData {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  challengeId: string,
  password?: string
}