export const mockAuthDetails = {
  username: 'testuser',
  password: 'testpassword',
  email: 'TestNode@gmail.com',
  firstName: 'TestNode',
  lastName: 'TestNode2',
  challengeId: '123',
};

export const mockAuthSecret = {
  secretKey: "32 byte",
  secretIv: "32",
  algorithm: "aes",
  challengeServerDomain: "https://dojo-code.springtech.co"
};

export const mockOEmbedResponse = {
  success: true,
  title: 'My Title',
  author_name: 'My Author',
  type: 'video',
  html: '<p>This is a test challenge</p>',
  width: 280,
  height: 280,
};