import axios from 'axios';

import { getOEmbed} from '@/utils/getOEmbed';
import { mockOEmbedResponse, mockAuthSecret, mockAuthDetails } from '@/utils/mockData';

jest.mock('axios');

describe('getOEmbed', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockOEmbedResponse });
  });

  it('should call the oembed API with the correct URL and auth hash', async () => {
    const hash = 'some_hash';

    const expectedUrl = `${mockAuthSecret.challengeServerDomain}/api/v1/oembed`;
    const expectedParams = { url: mockAuthDetails.challengeId, auth: hash };

    await getOEmbed(mockAuthDetails.challengeId, hash, mockAuthSecret.challengeServerDomain);

    expect(axios.get).toHaveBeenCalledWith(expectedUrl, { params: expectedParams });
  });

  it('should return the response data as an OEmbedResponse object', async () => {
    const hash = 'some_hash';

    const response = await getOEmbed(mockAuthDetails.challengeId, hash, mockAuthSecret.challengeServerDomain);

    expect(response).toEqual(mockOEmbedResponse);
  });
});