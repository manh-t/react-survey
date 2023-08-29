import { faker } from '@faker-js/faker';
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
  const tokenType = faker.string.sample();
  const accessToken = faker.string.sample();

  describe('given the refresh token API is fetched successfully', () => {
    beforeEach(() => {
      (authenticationRefreshToken as jest.Mock).mockImplementation(() =>
        Promise.resolve({
          data: {
            id: faker.string.uuid(),
            type: 'type',
            attributes: {
              accessToken: faker.string.sample(),
              tokenType: faker.string.sample(),
              refreshToken: faker.string.sample(),
            },
          },
          status: 200,
          statusText: 'OK',
          headers: axiosHeaders,
          config: {},
        })
      );

      (getToken as jest.Mock).mockImplementation(() => ({
        id: faker.string.uuid(),
        type: 'resourceType',
        accessToken: accessToken,
        refreshToken: faker.string.sample(),
        tokenType: tokenType,
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

      expect(mockError.config?.headers.Authorization).toBe(`${tokenType} ${accessToken}`);
    });
  });

  describe('given the refresh token API fetching is failed', () => {
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
        id: faker.string.uuid(),
        type: 'resourceType',
        accessToken: accessToken,
        refreshToken: faker.string.sample(),
        tokenType: tokenType,
      }));

      global.window ??= Object.create(window);
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
