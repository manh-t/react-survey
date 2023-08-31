import axios, { AxiosError } from 'axios';

import { refreshToken as authenticationRefreshToken } from 'adapters/Authentication';
import { authenticatedHeader } from 'adapters/BaseAuth';
import { clearToken, getToken, setToken } from 'helpers/authentication';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { paths } from 'routes';
import { Token } from 'types/token';

let isAlreadyFetchingAccessToken = false;
let subscribers: { (isFetchSuccess: boolean): void }[] = [];

function onAccessTokenFetched(isFetchSuccess: boolean) {
  subscribers = subscribers.filter((callback) => callback(isFetchSuccess));
}

function addSubscriber(callback: { (isFetchSuccess: boolean): void }) {
  subscribers.push(callback);
}

const doRefreshToken = (refreshToken: string) => {
  return authenticationRefreshToken(refreshToken)
    .then((response: DeserializableResponse) => {
      const token = deserialize<Token>(response.data);

      setToken(token);
      return true;
    })
    .catch(() => {
      clearToken();

      // Redirect to Sign In screen
      window.location.href = paths.signIn;
      return false;
    });
};

export const refreshToken = (error: AxiosError<unknown>): Promise<unknown> => {
  const { config: originalRequest } = error;
  const retryOriginalRequest = new Promise((resolve) => {
    addSubscriber((isFetchSuccess) => {
      if (!isFetchSuccess) {
        resolve({});
        return;
      }
      if (originalRequest) {
        Object.assign(originalRequest.headers, {
          ...authenticatedHeader(),
        });
        resolve(axios(originalRequest));
      }
    });
  });

  if (!isAlreadyFetchingAccessToken) {
    isAlreadyFetchingAccessToken = true;
    const token = getToken();

    if (token?.refreshToken) {
      doRefreshToken(token.refreshToken).then((isFetchSuccess) => {
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(isFetchSuccess);
      });
    }
  }

  return retryOriginalRequest;
};
