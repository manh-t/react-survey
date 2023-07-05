import { post } from 'adapters/Base';
import { config } from 'config';

import { signIn } from '.';

jest.mock('adapters/Base');
jest.mock('config');

describe('AuthenticationAdapter', () => {
  beforeEach(() => {
    (post as jest.Mock).mockImplementation(() => jest.fn());
    (config as jest.Mock).mockImplementation(() => ({
      clientId: 'client id',
      clientSecret: 'client secret',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    describe('given an email and a password', () => {
      it('calls the post method from the base adapter', () => {
        const email = 'test@test.com';
        const password = 'test';

        const expectedPath = 'oauth/token';
        const expectedPayload = {
          grantType: 'password',
          clientId: config().clientId,
          clientSecret: config().clientSecret,
          email,
          password,
        };

        signIn(email, password);

        expect(post).toHaveBeenCalledWith(expectedPath, expectedPayload);
      });
    });
  });
});
