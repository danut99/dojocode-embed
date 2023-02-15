import { getOEmbed } from "@/utils/getOEmbed";

const challengeId = '62a9afc487d07e7b5c63e7ec';
const encryptedString = "zj7rfqsCgz6eclTlcUSiOUb9fu9LN1oCp%2FAzy3g3GNK7PEfVWrBWxL4pYtd5mjPI7HQrRf%2FCHGY1NUW%2B0NF91pPYVbiy1WvlMaKbkQpk5eMznzWocO1%2B1DXEjklP%2FI%2FfqQ0asAMfmLfJB6LW6%2FVc7poFXe5VcNzL8nru3I%2FvSqhE2570jtHCH3l4EamrxvwibTeu8fnAZ2bk1fznoV4IiY5xhPpxOhFowjIp118Rt0s%3D";

test('getOEmbed function return an object', () => {
  expect(typeof getOEmbed(challengeId, encryptedString)).toBe('object');
});

test('getOEmbed function returns an object with specific attributes', async () => {
  const result = await getOEmbed(challengeId, encryptedString);
  expect(result).toHaveProperty('success', true);
  expect(result).toHaveProperty('title', 'Shopping list');
  expect(result).toHaveProperty('author_name', 'Sebastian Lucaciu');
  expect(result).toHaveProperty('type', 'rich');
  expect(result).toHaveProperty('html', '<iframe style="width: 100%; overflow: hidden;" src="https://code-challenge.springtech.co/challenge/sebastian_lucaciu/shopping-list?auth=zj7rfqsCgz6eclTlcUSiOUb9fu9LN1oCp%2FAzy3g3GNK7PEfVWrBWxL4pYtd5mjPI7HQrRf%2FCHGY1NUW%2B0NF91pPYVbiy1WvlMaKbkQpk5eMznzWocO1%2B1DXEjklP%2FI%2FfqQ0asAMfmLfJB6LW6%2FVc7poFXe5VcNzL8nru3I%2FvSqhE2570jtHCH3l4EamrxvwibTeu8fnAZ2bk1fznoV4IiY5xhPpxOhFowjIp118Rt0s%3D" frameborder="0" width="256" height="256" scrolling="auto"></iframe>');
});
