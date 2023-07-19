import { Resource } from 'types/resource';

export interface Token extends Resource {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
}
