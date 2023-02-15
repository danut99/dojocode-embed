import { encryptData } from '@/utils/ecryptData';
const payload = {
  firstName: 'TestNode',
  lastName: 'TestNode2',
  email: 'TestNode@gmail.com',
  username: 'TestNode',
  challengeId: '62a9afc487d07e7b5c63e7ec',
};

const encryptedString = "zj7rfqsCgz6eclTlcUSiOUb9fu9LN1oCp%2FAzy3g3GNK7PEfVWrBWxL4pYtd5mjPI7HQrRf%2FCHGY1NUW%2B0NF91pPYVbiy1WvlMaKbkQpk5eMznzWocO1%2B1DXEjklP%2FI%2FfqQ0asAMfmLfJB6LW6%2FVc7poFXe5VcNzL8nru3I%2FvSqhE2570jtHCH3l4EamrxvwibTeu8fnAZ2bk1fznoV4IiY5xhPpxOhFowjIp118Rt0s%3D";

test('encryptData function return a string', () => {
  expect(typeof encryptData(payload)).toBe('string');
});

test('encryptData function return de correct hash', () => {
  expect(encryptData(payload)).toBe(encryptedString);
});