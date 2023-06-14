import baseAdapter from 'adapters/Base';
import { Config } from 'config';

import authenticationAdapter from '.';

jest.mock('adapters/Base');
jest.mock('config');

const mockPostMethod = jest.fn();

describe('AuthenticationAdapter', () => {
  beforeEach(() => {
    Config.clientId = 'client id';
    Config.clientSecret = 'client secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    describe('given an email and a password', () => {
      it('calls the post method from the base adapter', () => {
        baseAdapter.post = mockPostMethod;

        const email = 'test@test.com';
        const password = 'test';

        const expectedPath = 'oauth/token';
        const expectedPayload = {
          grantType: 'password',
          clientId: Config.clientId,
          clientSecret: Config.clientSecret,
          email,
          password,
        };

        authenticationAdapter.signIn(email, password);

        expect(mockPostMethod).toHaveBeenCalledWith(expectedPath, expectedPayload);
      });
    });
  });
});
