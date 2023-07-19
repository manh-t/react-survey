import { Resource } from 'types/resource';

export interface Tokens extends Resource {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
}
