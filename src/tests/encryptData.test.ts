import { encryptData } from '@/utils/encryptData';
import { mockAuthDetails, mockAuthSecret } from '@/utils/mockData';

jest.mock('@/utils/encryptData', () => ({
  encryptData: jest.fn(),
}));
const mockedEncryptData = jest.mocked(encryptData);

describe('encryptData', () => {
  it('returns the expected hash', () => {
    // Set up the mock implementation
    const expectedHash = 'myhash';
    mockedEncryptData.mockReturnValueOnce(expectedHash);

    // Call the function and test the output
    const hash = encryptData(mockAuthDetails, mockAuthSecret);
    expect(hash).toBe(expectedHash);

    // Check that the function was called with the expected arguments
    expect(mockedEncryptData).toHaveBeenCalledWith(mockAuthDetails, mockAuthSecret);
  });
});