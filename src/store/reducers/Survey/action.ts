import { AsyncThunkPayloadCreator, PayloadAction } from '@reduxjs/toolkit';

import { getSurvey, submitSurvey } from 'adapters/Survey';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { QuestionRequest, SurveySubmitRequest } from 'types/request/surveySubmitRequest';
import { Survey } from 'types/survey';

import { SurveyState } from '.';

export const surveyReducers = {
  fillAnswers: (state: SurveyState, action: PayloadAction<QuestionRequest>) => {
    const newQuestionRequests = state.questionRequests.filter((question: QuestionRequest) => question.id !== action.payload.id);
    state.questionRequests = [...newQuestionRequests, action.payload];
    return state;
  },
  resetQuestions: (state: SurveyState) => {
    state.questionRequests = [];
    return state;
  },
};

export const getSurveyThunkCreator: AsyncThunkPayloadCreator<Survey, string, JSONObject> = async (surveyId: string) => {
  return getSurvey(surveyId).then((response: DeserializableResponse) => deserialize<Survey>(response.data, response.included));
};

export const submitSurveyThunkCreator: AsyncThunkPayloadCreator<void, SurveySubmitRequest, JSONObject> = async (
  surveySubmitRequest
) => {
  await submitSurvey(surveySubmitRequest);
};
