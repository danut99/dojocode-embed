// Import the necessary modules and types
import { DojoEmbed } from '@/index';
import { encryptData } from '@/utils/encryptData';
import { getOEmbed } from '@/utils/getOEmbed';
import { mockAuthDetails, mockAuthSecret } from '@/utils/mockData';

// Use jest.mock() to mock the dependencies of DojoEmbed
jest.mock('@/utils/encryptData');
jest.mock('@/utils/getOEmbed');

// Define the test suite for DojoEmbed
describe('DojoEmbed', () => {
  let dojoEmbed: DojoEmbed;

  // Set up the DojoEmbed instance before each test
  beforeEach(() => {
    dojoEmbed = new DojoEmbed();
    //Set the auth details and secret
    dojoEmbed.setAuthDetails(mockAuthDetails, mockAuthSecret);
    expect(dojoEmbed['authDetails']).toEqual(mockAuthDetails);
    expect(dojoEmbed['authSecret']).toEqual(mockAuthSecret);
  });

  // Define the test for getChallengeEmbedHTML
  describe('getChallengeEmbedHTML', () => {
    it('should call encryptData and getOEmbed with the correct arguments and return the oEmbed HTML', async () => {
      const expectedHtml = '<iframe src="https://example.com"></iframe>';
      const expectedEncryptedData = 'encrypted-data';

      // Mock the return values of the mocked functions
      (encryptData as jest.Mock).mockReturnValueOnce(expectedEncryptedData);
      (getOEmbed as jest.Mock).mockResolvedValueOnce({ html: expectedHtml });

      // Call the method being tested
      const result = await dojoEmbed.getChallengeEmbedHTML(mockAuthDetails.challengeId);

      // Verify that the mocked functions were called with the correct arguments
      expect(encryptData).toHaveBeenCalledWith(mockAuthDetails, mockAuthSecret);
      expect(getOEmbed).toHaveBeenCalledWith(mockAuthDetails.challengeId, expectedEncryptedData, mockAuthSecret.challengeServerDomain);

      // Verify that the method returns the expected HTML
      expect(result).toBe(expectedHtml);
    });
  });

  // Define the test for getChallengeEmbedHTML returning a 500 error
  describe('getChallengeEmbedHTML returns 500', () => {
    it('throws an error when getOEmbed returns 500', async () => {
      (getOEmbed as jest.Mock).mockRejectedValue(new Error(JSON.stringify({
        statusCode: 500,
        statusMessage: "500 Internal Server Error",
        message: "Error fetching oEmbed for challenge"
      })));

      await expect(dojoEmbed.getChallengeEmbedHTML(mockAuthDetails.challengeId)).rejects.toThrow('Error fetching oEmbed for challenge');
    });
  });
});