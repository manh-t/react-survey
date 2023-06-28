import { post } from 'adapters/Base';
import { Config } from 'config';

export const signIn = (email: string, password: string) =>
  post('oauth/token', {
    clientId: Config.clientId,
    clientSecret: Config.clientSecret,
    grantType: 'password',
    email: email,
    password: password,
  });
