import { dojoOEmbed } from "@/index";
import { encryptData } from "@/utils/ecryptData";
import { getOEmbed } from "@/utils/getOEmbed";

jest.mock('@/utils/ecryptData');
jest.mock('@/utils/getOEmbed');

describe('dojoOEmbed', () => {
  test('returns oEmbed HTML', async () => {
    const mockPayload = {
      username: 'testuser',
      password: 'testpassword',
      email: 'TestNode@gmail.com',
      firstName: 'TestNode',
      lastName: 'TestNode2',
      challengeId: '123',
    };
    const mockEncryptedData = 'my_encrypted_data';
    (encryptData as jest.MockedFunction<typeof encryptData>).mockReturnValue(mockEncryptedData);

    const mockOEmbedResponse = {
      success: true,
      title: 'My Title',
      author_name: 'My Author',
      type: 'video',
      html: '<p>This is a test challenge</p>',
      width: 280,
      height: 280,
    };
    const mockSecretData = {
      secretKey: "32 byte",
      secretIv: "32",
      algorithm: "aes",
      challengeServerDomain: "https://dojo-code.springtech.co"
    };

    (getOEmbed as jest.MockedFunction<typeof getOEmbed>).mockResolvedValue(mockOEmbedResponse);

    const oEmbedHtml = await dojoOEmbed(mockPayload, mockSecretData);

    expect(encryptData).toHaveBeenCalledWith(mockPayload, mockSecretData);
    expect(getOEmbed).toHaveBeenCalledWith(mockPayload.challengeId, mockEncryptedData, mockSecretData.challengeServerDomain);
    expect(oEmbedHtml).toEqual(mockOEmbedResponse.html);
  });
});