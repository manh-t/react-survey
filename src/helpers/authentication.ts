import { SignIn } from 'types/signIn';

export const authTokenKey = 'AuthToken';

export const getToken = () => {
  const authToken = localStorage.getItem(authTokenKey);
  if (!authToken) {
    return;
  }

  const token = JSON.parse(authToken) as SignIn;

  return token;
};

export const setToken = (token: SignIn) => {
  localStorage.setItem(authTokenKey, JSON.stringify(token));
};

export const clearToken = () => {
  localStorage.removeItem(authTokenKey);
};
