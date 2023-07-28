import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { signIn } from 'adapters/Authentication';
import { setToken } from 'helpers/authentication';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { Token } from 'types/token';

export interface SignInInput {
  email: string;
  password: string;
}

export const signInThunkCreator: AsyncThunkPayloadCreator<Token, SignInInput, JSONObject> = async (
  input,
  { rejectWithValue }
) => {
  return signIn(input.email, input.password)
    .then((response: DeserializableResponse) => {
      const token = deserialize<Token>(response.data);

      setToken(token);
      return token;
    })
    .catch((error) => {
      if (!error.response) {
        throw error;
      }

      const { data, status } = error.response;

      return rejectWithValue({ data, status });
    });
};
