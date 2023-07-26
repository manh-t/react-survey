/* eslint camelcase: ["error", {allow: ["camel_case_key"]}] */
import { getToken } from 'helpers/authentication';
import requestManager from 'lib/request/v1/requestManager';

import { authenticatedHeader, getAuth, postAuth } from '.';

jest.mock('lib/request/v1/requestManager');
jest.mock('helpers/authentication');

describe('BaseAuthAdapter', () => {
  const path = '/path';
  const params = {
    camelCaseKey: 'value',
  };

  beforeEach(() => {
    (requestManager as jest.Mock).mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticatedHeader', () => {
    const mockAccessToken = 'access token';
    const mockTokenType = 'token type';
    const mockTokens = {
      id: 'id',
      resourceType: 'resource type',
      accessToken: mockAccessToken,
      refreshToken: 'refresh token',
      tokenType: mockTokenType,
    };

    beforeEach(() => {
      (getToken as jest.Mock).mockImplementation(() => mockTokens);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns the headers that includes the token', () => {
      const expectedHeader = {
        Authorization: `${mockTokenType} ${mockAccessToken}`,
      };

      expect(authenticatedHeader()).toEqual(expectedHeader);
    });
  });

  describe('getAuth', () => {
    describe('given only the path', () => {
      it('calls the get method from request manager with the path and authenticated header', () => {
        getAuth(path);

        expect(requestManager).toHaveBeenCalledWith('get', path, { headers: authenticatedHeader() });
      });
    });

    describe('given the path and url params', () => {
      it('calls the get method from request manager with the path, params and authenticated header', () => {
        getAuth(path, params);

        expect(requestManager).toHaveBeenCalledWith('get', path, {
          params: { camel_case_key: params.camelCaseKey },
          headers: authenticatedHeader(),
        });
      });
    });
  });

  describe('postAuth', () => {
    describe('given the path and params', () => {
      it('calls the post method from request manager with the path, params and authenticated header', () => {
        postAuth(path, params);

        expect(requestManager).toHaveBeenCalledWith('post', path, {
          data: { camel_case_key: params.camelCaseKey },
          headers: authenticatedHeader(),
        });
      });
    });
  });
});
