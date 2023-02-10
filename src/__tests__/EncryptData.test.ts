import { encryptData } from '../index';
const asa = {
  firstName: 'TestNode',
  lastName: 'TestNode2',
  email: 'TestNode@gmail.com',
  username: 'TestNode',
  challengeId: '62a9afc487d07e7b5c63e7ec',
};
test('My Greeter', () => {
  console.log(encryptData(asa));
});
