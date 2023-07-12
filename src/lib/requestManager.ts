import axios, { Method as HTTPMethod, ResponseType, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { config } from 'config';
import { JSONValue, keysToCamelCase } from 'helpers/json';
import { refreshToken } from 'services/refreshToken';

export const successResponseInterceptor = (response: AxiosResponse<unknown>): AxiosResponse<unknown> => {
  const responseData = response.data as JSONValue;
  const formattedData = keysToCamelCase(responseData);
  response.data = formattedData;

  return response;
};

export const errorInterceptor = async (error: AxiosError<unknown>): Promise<unknown> => {
  if (error.response) {
    if (error.response.status === 401) {
      return refreshToken(error);
    }
    const errorData = error.response.data as JSONValue;
    const formattedData = keysToCamelCase(errorData);
    error.response.data = formattedData;
  }

  return Promise.reject(error);
};

export const defaultOptions = (): { responseType: ResponseType; baseURL: string; headers?: { [key: string]: string } } => ({
  responseType: 'json',
  baseURL: `${config().apiBaseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * The main API access function that comes preconfigured with useful defaults.
 *
 * @param {string} [method] - the HTTP method to use
 * @param {string} [endpoint] - the API endpoint to use
 * @param {Object} [requestOptions] - params and date to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */

const requestManager = (
  method: HTTPMethod,
  endpoint: string,
  requestOptions: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const requestParams: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions(),
    ...requestOptions,
  };

  axios.interceptors.response.use(successResponseInterceptor, errorInterceptor);

  return axios
    .request(requestParams)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export default requestManager;
