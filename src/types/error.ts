import { AxiosResponse } from 'axios';

export interface APIError {
  code: string;
  detail: string;
  title: string;
}

export type ErrorList = { errors: APIError[] };

export type ErrorResponse = AxiosResponse<ErrorList>;
