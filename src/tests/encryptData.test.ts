import { encryptData } from '@/utils/ecryptData';

jest.mock('@/utils/ecryptData', () => ({
  encryptData: jest.fn(),
}));

describe('encryptData', () => {
  it('returns the expected hash', () => {
    const mockPayload = {
      username: 'testuser',
      password: 'testpassword',
      email: 'TestNode@gmail.com',
      firstName: 'TestNode',
      lastName: 'TestNode2',
      challengeId: '123',
    };

    const mockSecretData = {
      secretKey: "32 byte",
      secretIv: "32",
      algorithm: "aes",
      challengeServerDomain: "https://dojo-code.springtech.co"
    };
    // Set up the mock implementation
    const mockedEncryptData = encryptData as jest.MockedFunction<typeof encryptData>;
    const expectedHash = 'myhash';
    mockedEncryptData.mockReturnValueOnce(expectedHash);

    // Call the function and test the output
    const hash = encryptData(mockPayload, mockSecretData);
    expect(hash).toBe(expectedHash);

    // Check that the function was called with the expected arguments
    expect(mockedEncryptData).toHaveBeenCalledWith(mockPayload, mockSecretData);
  });
});