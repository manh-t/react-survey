import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ErrorResponse } from 'helpers/error';

import { signInAsync } from './actions';

export interface AuthenticationState {
  loading: boolean;
  errors?: string[];
  success: boolean;
}

export const initialState: AuthenticationState = {
  loading: false,
  success: false,
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
    builder.addCase(signIn.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.errors = (action.payload as ErrorResponse).data.errors.map((error) => error.detail);
    });
  },
});
