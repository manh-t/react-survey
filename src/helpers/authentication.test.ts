import { Token } from 'types/token';

import { authTokenKey, clearToken, getToken, setToken } from './authentication';

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
      const mockToken: Token = {
        id: mockId,
        resourceType: mockResourceType,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: mockTokenType,
      };
      mockStorage[authTokenKey] = JSON.stringify(mockToken);
    });

    it('returns the token from local storage', () => {
      const token = getToken();

      expect(token?.accessToken).toBe(mockAccessToken);
      expect(token?.refreshToken).toBe(mockRefreshToken);
    });
  });

  describe('setToken', () => {
    it('sets the token to local storage', () => {
      const mockToken: Token = {
        id: mockId,
        resourceType: mockResourceType,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: mockTokenType,
      };

      const setItemSpy = jest.spyOn(window.Storage.prototype, 'setItem');

      setToken(mockToken);

      expect(setItemSpy).toHaveBeenCalledWith(authTokenKey, JSON.stringify(mockToken));
    });
  });

  describe('clearToken', () => {
    beforeEach(() => {
      const mockToken: Token = {
        id: mockId,
        resourceType: mockResourceType,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: mockTokenType,
      };
      mockStorage[authTokenKey] = JSON.stringify(mockToken);
    });

    it('clears the token from local storage', () => {
      const removeItemSpy = jest.spyOn(window.Storage.prototype, 'removeItem');

      clearToken();

      expect(removeItemSpy).toHaveBeenCalledWith(authTokenKey);
    });
  });
});
