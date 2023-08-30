import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Survey } from 'types/survey';

import { getSurveyThunkCreator } from './action';

export interface SurveyState {
  survey?: Survey;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: SurveyState = {
  isLoading: true,
  isError: false,
};

export const getSurveyAsyncThunk = createAsyncThunk('survey/getSurvey', getSurveyThunkCreator);

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSurveyAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getSurveyAsyncThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.survey = action.payload;
    });
    builder.addCase(getSurveyAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const surveyAction = surveySlice.actions;
