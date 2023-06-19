import { AxiosError, AxiosHeaders } from 'axios';

import { APIError, ErrorList } from 'helpers/error';

export const mockAxiosError = (status: number, statusText = '', data?: APIError[]): AxiosError<ErrorList> => {
  return {
    isAxiosError: true,
    name: '',
    message: '',
    toJSON: () => ({}),
    config: {
      headers: new AxiosHeaders(),
    },
    response: {
      data: {
        errors: data || [],
      },
      status: status,
      statusText: statusText,
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    },
  };
};
