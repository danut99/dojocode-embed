import axios from 'axios';

import { getOEmbed} from '@/utils/getOEmbed';

jest.mock('axios');

describe('getOEmbed', () => {
  const mockOEmbedResponse = {
    success: true,
    title: 'My Title',
    author_name: 'My Author',
    type: 'video',
    html: '<p>This is a test challenge</p>',
    width: 280,
    height: 280,
  };
  const mockChallengeServerDomain = "https://dojo-code.springtech.co";

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockOEmbedResponse });
  });

  it('should call the oembed API with the correct URL and auth hash', async () => {
    const challengeId = 'some_challenge_id';
    const hash = 'some_hash';

    const expectedUrl = `${mockChallengeServerDomain}/api/v1/oembed`;
    const expectedParams = { url: challengeId, auth: hash };

    await getOEmbed(challengeId, hash, mockChallengeServerDomain);

    expect(axios.get).toHaveBeenCalledWith(expectedUrl, { params: expectedParams });
  });

  it('should return the response data as an OEmbedResponse object', async () => {
    const challengeId = 'some_challenge_id';
    const hash = 'some_hash';

    const response = await getOEmbed(challengeId, hash, mockChallengeServerDomain);

    expect(response).toEqual(mockOEmbedResponse);
  });
});