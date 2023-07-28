import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from 'types/user';

import { getUserThunkCreator } from './action';

export interface UserState {
  user?: User;
}

export const initialState: UserState = {};

export const getUser = createAsyncThunk('user/getUser', getUserThunkCreator);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const userAction = userSlice.actions;
