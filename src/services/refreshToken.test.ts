import { AxiosError } from 'axios';

import { refreshToken as authenticationRefreshToken } from 'adapters/Authentication';
import { clearToken, getToken, setToken } from 'helpers/authentication';
import { paths } from 'routes';

import { refreshToken } from './refreshToken';

jest.mock('helpers/authentication');
jest.mock('adapters/Authentication');

jest.mock('axios', () => jest.fn(() => Promise.resolve()));

const axiosHeaders = new (jest.requireActual('axios').AxiosHeaders)();

describe('refreshToken', () => {
  describe('given the refresh token API is fetched successfully', () => {
    beforeEach(() => {
      (authenticationRefreshToken as jest.Mock).mockImplementation(() =>
        Promise.resolve({
          data: {
            id: 'id',
            type: 'type',
            attributes: {
              accessToken: 'access token',
              tokenType: 'token type',
              refreshToken: 'refresh token',
            },
          },
          status: 200,
          statusText: 'OK',
          headers: axiosHeaders,
          config: {},
        })
      );
      (getToken as jest.Mock).mockImplementation(() => ({
        id: 'resourceId',
        type: 'resourceType',
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        tokenType: 'tokenType',
      }));

      (setToken as jest.Mock).mockImplementation(() => undefined);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('appends the Authorization header successfully', async () => {
      const mockError: AxiosError<unknown> = {
        isAxiosError: true,
        name: '',
        message: '',
        toJSON: () => ({}),
        config: {
          headers: axiosHeaders,
        },
        response: {
          data: {
            errors: [],
          },
          status: 401,
          statusText: 'OK',
          headers: {},
          config: {
            headers: axiosHeaders,
          },
        },
      };

      expect(mockError.config?.headers.Authorization).toBeUndefined();

      await refreshToken(mockError);

      expect(mockError.config?.headers.Authorization).toBe('tokenType accessToken');
    });
  });

  describe('given the refresh token API is fetched failed', () => {
    const mockError500: AxiosError<unknown> = {
      isAxiosError: true,
      name: '',
      message: '',
      toJSON: () => ({}),
      config: {
        headers: axiosHeaders,
      },
      response: {
        data: {
          errors: [],
        },
        status: 500,
        statusText: 'OK',
        headers: {},
        config: {
          headers: axiosHeaders,
        },
      },
    };

    beforeEach(() => {
      (authenticationRefreshToken as jest.Mock).mockRejectedValue(() => mockError500);
      (clearToken as jest.Mock).mockImplementation(() => undefined);
      (getToken as jest.Mock).mockImplementation(() => ({
        id: 'resourceId',
        type: 'resourceType',
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        tokenType: 'tokenType',
      }));

      global.window = Object.create(window);
      const url = 'http://dummy.com';
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
        },
        writable: true,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calls clearToken and redirect the location to sign in', async () => {
      const mockError: AxiosError<unknown> = {
        isAxiosError: true,
        name: '',
        message: '',
        toJSON: () => ({}),
        config: {
          headers: axiosHeaders,
        },
        response: {
          data: {
            errors: [],
          },
          status: 401,
          statusText: 'OK',
          headers: {},
          config: {
            headers: axiosHeaders,
          },
        },
      };

      await refreshToken(mockError);

      expect(clearToken).toHaveBeenCalled();

      expect(window.location.href).toBe(paths.signIn);
    });
  });
});
