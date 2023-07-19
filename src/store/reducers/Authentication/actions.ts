import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { signIn } from 'adapters/Authentication';
import { setTokens } from 'helpers/authentication';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { Tokens } from 'types/tokens';

export interface SignInInput {
  email: string;
  password: string;
}

export const signInAsync: AsyncThunkPayloadCreator<Tokens, SignInInput, JSONObject> = async (input, { rejectWithValue }) => {
  return signIn(input.email, input.password)
    .then((response: DeserializableResponse) => {
      const tokens = deserialize<Tokens>(response.data);

      setTokens(tokens);
      return tokens;
    })
    .catch((error) => {
      if (!error.response) {
        throw error;
      }

      const { data, status } = error.response;

      return rejectWithValue({ data, status });
    });
};
