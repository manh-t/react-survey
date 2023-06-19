import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import authenticationAdapter from 'adapters/Authentication';
import { setToken } from 'helpers/authentication';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { SignIn } from 'types/signIn';

export interface SignInInput {
  email: string;
  password: string;
}

export const signInAsync: AsyncThunkPayloadCreator<SignIn, SignInInput, JSONObject> = async (input, { rejectWithValue }) => {
  return authenticationAdapter
    .signIn(input.email, input.password)
    .then((response: DeserializableResponse) => {
      const signInType = deserialize<SignIn>(response.data);

      setToken(signInType);
      return signInType;
    })
    .catch((error) => {
      if (!error.response) {
        throw error;
      }

      const { data, status } = error.response;

      return rejectWithValue({ data, status });
    });
};
