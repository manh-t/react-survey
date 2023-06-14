import axios from 'axios';

import { Config } from 'config';

import requestManager, { defaultOptions } from './requestManager';

jest.mock('axios');
jest.mock('config');

describe('requestManager', () => {
  const endPoint = 'sample/endpoint';

  beforeEach(() => {
    Config.apiBaseUrl = 'http://sample.com';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches successfully data from an API', async () => {
    const responseData = {
      data: [
        { id: 1, value: 'first object' },
        { id: 2, value: 'second object' },
      ],
    };

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(responseData));

    await expect(requestManager('POST', endPoint)).resolves.toEqual(responseData.data);

    requestSpy.mockRestore();
  });

  it('fetches the provided endPoint', async () => {
    const requestOptions = { ...defaultOptions(), method: 'POST', url: endPoint };

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve({}));

    await requestManager('POST', endPoint);

    expect(axios.request).toHaveBeenCalledWith(requestOptions);

    requestSpy.mockRestore();
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(requestManager('POST', endPoint)).rejects.toThrow(errorMessage);

    requestSpy.mockRestore();
  });
});
