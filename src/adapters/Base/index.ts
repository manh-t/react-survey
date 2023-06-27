import { AxiosRequestConfig } from 'axios';

import { JSONObject, keysToSnakeCase } from 'helpers/json';
import requestManager from 'lib/requestManager';

export function get(path: string, params?: JSONObject) {
  const requestOptions: AxiosRequestConfig = {};
  if (params) {
    requestOptions.params = keysToSnakeCase(params);
  }

  return requestManager('get', path, requestOptions);
}

export const post = (path: string, params: JSONObject) => {
  const requestOptions: AxiosRequestConfig = { data: keysToSnakeCase(params) };

  return requestManager('post', path, requestOptions);
};
