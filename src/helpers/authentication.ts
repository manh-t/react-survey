import { Tokens } from 'types/tokens';

export const authTokenKey = 'AuthToken';

export const getTokens = () => {
  const authToken = localStorage.getItem(authTokenKey);
  if (!authToken) {
    return;
  }

  const token = JSON.parse(authToken) as Tokens;

  return token;
};

export const setTokens = (token: Tokens) => {
  localStorage.setItem(authTokenKey, JSON.stringify(token));
};

export const clearTokens = () => {
  localStorage.removeItem(authTokenKey);
};
