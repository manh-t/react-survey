import { SignIn } from 'types/signIn';

export const authTokenKey = 'AuthToken';

export const getTokens = () => {
  const authToken = localStorage.getItem(authTokenKey);
  if (!authToken) {
    return;
  }

  const token = JSON.parse(authToken) as SignIn;

  return token;
};

export const setTokens = (token: SignIn) => {
  localStorage.setItem(authTokenKey, JSON.stringify(token));
};

export const clearTokens = () => {
  localStorage.removeItem(authTokenKey);
};
