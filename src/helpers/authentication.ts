import { Token } from 'types/token';

export const authTokenKey = 'AuthToken';

export const getToken = () => {
  const authToken = localStorage.getItem(authTokenKey);
  if (!authToken) {
    return;
  }

  const token = JSON.parse(authToken) as Token;

  return token;
};

export const setToken = (token: Token) => {
  localStorage.setItem(authTokenKey, JSON.stringify(token));
};

export const clearToken = () => {
  localStorage.removeItem(authTokenKey);
};
