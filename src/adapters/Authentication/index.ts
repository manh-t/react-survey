import { post } from 'adapters/Base';
import { config } from 'config';

export const signIn = (email: string, password: string) =>
  post('oauth/token', {
    clientId: config().clientId,
    clientSecret: config().clientSecret,
    grantType: 'password',
    email: email,
    password: password,
  });
