import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { QuestionRequest } from 'types/request/surveySubmitRequest';
import { Survey } from 'types/survey';

import { getSurveyThunkCreator, submitSurveyThunkCreator, surveyReducers } from './action';

export interface SurveyState {
  survey?: Survey;
  isLoading: boolean;
  isError: boolean;
  questionRequests: QuestionRequest[];
  isSubmitSuccess: boolean;
}

export const initialState: SurveyState = {
  isLoading: false,
  isError: false,
  questionRequests: [],
  isSubmitSuccess: false,
};

export const getSurveyAsyncThunk = createAsyncThunk('survey/getSurvey', getSurveyThunkCreator);

export const submitSurveyAsyncThunk = createAsyncThunk('survey/submitSurvey', submitSurveyThunkCreator);

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: surveyReducers,
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
    builder.addCase(submitSurveyAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(submitSurveyAsyncThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isSubmitSuccess = true;
      state.questionRequests = [];
    });
    builder.addCase(submitSurveyAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isSubmitSuccess = false;
      state.isError = true;
    });
  },
});

export const surveyAction = surveySlice.actions;
