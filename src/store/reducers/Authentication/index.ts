import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getToken } from 'helpers/authentication';
import { ErrorResponse } from 'helpers/error';
import { SignIn } from 'types/signIn';

import { signInAsync } from './actions';

const signInToken = getToken() ? getToken() : undefined;

export interface AuthenticationState {
  loading: boolean;
  errors?: string[];
  success: boolean;
  signInToken?: SignIn;
}

export const initialState: AuthenticationState = {
  loading: false,
  success: false,
  signInToken: signInToken,
};

export const signIn = createAsyncThunk('auth/signIn', signInAsync);

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
      state.signInToken = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.errors = (action.payload as ErrorResponse).data.errors.map((error) => error.detail);
    });
  },
});
