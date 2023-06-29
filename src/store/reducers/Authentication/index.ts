import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getToken } from 'helpers/authentication';
import { ErrorResponse } from 'types/error';
import { Token } from 'types/token';

import { signInThunkCreator } from './actions';

const token = getToken() ? getToken() : undefined;

export interface AuthenticationState {
  loading: boolean;
  errors?: string[];
  success: boolean;
  token?: Token;
}

export const initialState: AuthenticationState = {
  loading: false,
  success: false,
  token: token,
};

export const signInAsyncThunk = createAsyncThunk('auth/signIn', signInThunkCreator);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInAsyncThunk.pending, (state) => {
      state.errors = undefined;
      state.loading = true;
    });
    builder.addCase(signInAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.token = action.payload;
    });
    builder.addCase(signInAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.errors = (action.payload as ErrorResponse).data.errors.map((error) => error.detail);
    });
  },
});
