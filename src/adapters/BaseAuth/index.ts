import { AxiosRequestConfig } from 'axios';

import { getToken } from 'helpers/authentication';
import { JSONObject, keysToSnakeCase } from 'helpers/json';
import requestManager from 'lib/request/v1/requestManager';

export const authenticatedHeader = (): { Authorization: string } => ({
  Authorization: `${getToken()?.tokenType} ${getToken()?.accessToken}`,
});

const defaultRequestOptions = (): AxiosRequestConfig => ({ headers: authenticatedHeader() });

export const getAuth = (path: string, params?: JSONObject) => {
  const requestOptions: AxiosRequestConfig = { ...defaultRequestOptions() };
  if (params) {
    requestOptions.params = keysToSnakeCase(params);
  }

  return requestManager('get', path, requestOptions);
};

export const postAuth = (path: string, params: JSONObject) => {
  const requestOptions: AxiosRequestConfig = { ...defaultRequestOptions(), data: keysToSnakeCase(params) };

  return requestManager('post', path, requestOptions);
};
