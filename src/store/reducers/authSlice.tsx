import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authenticationAdapter from 'adapters/Authentication';
import { setToken } from 'helpers/authentication';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { ErrorResponse } from 'helpers/error';
import { JSONObject } from 'helpers/json';
import { SignIn } from 'types/signIn';

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthenticationState {
  loading: boolean;
  userToken?: string;
  errors?: string[];
  success: boolean;
}

const initialState: AuthenticationState = {
  loading: false,
  success: false,
};

export const signIn = createAsyncThunk<SignIn, SignInInput, JSONObject>('auth/signIn', async (input, { rejectWithValue }) => {
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
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.errors = undefined;
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userToken = `${action.payload.id} ${action.payload.tokenType}`;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.errors = (action.payload as ErrorResponse).data.errors.map((error) => error.detail);
    });
  },
});
