import { Tokens } from 'types/tokens';

import { authTokenKey, clearTokens, getTokens, setTokens } from './authentication';

describe('Authentication helper', () => {
  const mockStorage: { [key: string]: string | null } = {};
  const mockLocalStorageGetItem = (key: string): string | null => {
    return mockStorage[key];
  };
  const mockLocalStorageSetItem = (key: string, value: string): void => {
    mockStorage[key] = value;
  };
  const mockLocalStorageRemoveItem = (key: string): void => {
    mockStorage[key] = null;
  };

  const mockAccessToken = 'access token';
  const mockRefreshToken = 'refresh token';
  const mockTokenType = 'token type';
  const mockId = 'id';
  const mockResourceType = 'resource type';

  beforeEach(() => {
    window.Storage.prototype.getItem = mockLocalStorageGetItem;
    window.Storage.prototype.setItem = mockLocalStorageSetItem;
    window.Storage.prototype.removeItem = mockLocalStorageRemoveItem;
  });

  describe('getToken', () => {
    beforeEach(() => {
      const mockTokens: Tokens = {
        id: mockId,
        resourceType: mockResourceType,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: mockTokenType,
      };
      mockStorage[authTokenKey] = JSON.stringify(mockTokens);
    });

    it('returns the tokens from local storage', () => {
      const tokens = getTokens();

      expect(tokens?.accessToken).toBe(mockAccessToken);
      expect(tokens?.refreshToken).toBe(mockRefreshToken);
    });
  });

  describe('setToken', () => {
    it('sets the tokens to local storage', () => {
      const mockTokens: Tokens = {
        id: mockId,
        resourceType: mockResourceType,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: mockTokenType,
      };

      const setItemSpy = jest.spyOn(window.Storage.prototype, 'setItem');

      setTokens(mockTokens);

      expect(setItemSpy).toHaveBeenCalledWith(authTokenKey, JSON.stringify(mockTokens));
    });
  });

  describe('clearToken', () => {
    beforeEach(() => {
      const mockTokens: Tokens = {
        id: mockId,
        resourceType: mockResourceType,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: mockTokenType,
      };
      mockStorage[authTokenKey] = JSON.stringify(mockTokens);
    });

    it('clears the tokens from local storage', () => {
      const removeItemSpy = jest.spyOn(window.Storage.prototype, 'removeItem');

      clearTokens();

      expect(removeItemSpy).toHaveBeenCalledWith(authTokenKey);
    });
  });
});
