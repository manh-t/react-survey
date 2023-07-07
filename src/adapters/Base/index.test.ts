/* eslint-disable camelcase */
import requestManager from 'lib/request/v1/requestManager';

import { get, post } from '.';

jest.mock('lib/request/v1/requestManager', () => jest.fn());

describe('BaseAdapter', () => {
  const apiPath = '/sample';
  const params = {
    testKey: 'test value',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    describe('given only the api path', () => {
      it('calls the GET method from request manager with the path and no params', () => {
        get(apiPath);

        expect(requestManager).toHaveBeenCalledWith('get', apiPath, {});
      });
    });

    describe('given the api path and url params', () => {
      it('calls the get method from request manager with the path and params with snake case keys', () => {
        get(apiPath, params);

        expect(requestManager).toHaveBeenCalledWith('get', apiPath, {
          params: { test_key: params.testKey },
        });
      });
    });
  });

  describe('POST', () => {
    describe('given the path and url params', () => {
      it('calls the post method from request manager with the path and data with snake case key', () => {
        post(apiPath, params);

        expect(requestManager).toHaveBeenCalledWith('post', apiPath, {
          data: { test_key: params.testKey },
        });
      });
    });
  });
});
