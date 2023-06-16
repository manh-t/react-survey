import { Resource } from 'types/resource';

export interface SignIn extends Resource {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
}
