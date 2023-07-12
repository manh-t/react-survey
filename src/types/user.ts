import { Resource } from './resource';

export interface User extends Resource {
  email: string;
  name: string;
  avatarUrl: string;
}
