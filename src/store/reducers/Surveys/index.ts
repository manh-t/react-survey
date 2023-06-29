import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Survey } from 'types/survey';

import { getSurveysThunkCreator, surveysReducers } from './actions';

export interface SurveysState {
  surveys: Survey[];
  currentPosition: number;
  isInitialLoading: boolean;
}

export const initialState: SurveysState = {
  surveys: [],
  currentPosition: 0,
  isInitialLoading: true,
};

export const getSurveysAsyncThunk = createAsyncThunk('surveys/getSurveys', getSurveysThunkCreator);

export const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: surveysReducers,
  extraReducers: (builder) => {
    builder.addCase(getSurveysAsyncThunk.fulfilled, (state, action) => {
      state.isInitialLoading = false;
      state.surveys = action.payload;
    });
    builder.addCase(getSurveysAsyncThunk.rejected, (state) => {
      state.isInitialLoading = false;
    });
  },
});

export const surveysAction = surveysSlice.actions;
