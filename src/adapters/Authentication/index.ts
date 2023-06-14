import baseAdapter from 'adapters/Base';
import { Config } from 'config';

const AuthenticationAdapter = () => {
  const signIn = (email: string, password: string) =>
    baseAdapter.post('oauth/token', {
      clientId: Config.clientId,
      clientSecret: Config.clientSecret,
      grantType: 'password',
      email: email,
      password: password,
    });

  return { signIn };
};

const authenticationAdapter = AuthenticationAdapter();

export default authenticationAdapter;
