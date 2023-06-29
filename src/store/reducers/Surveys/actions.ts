import { AsyncThunkPayloadCreator, PayloadAction } from '@reduxjs/toolkit';

import { getSurveys } from 'adapters/Survey';
import { DeserializableArrayResponse, deserializeList } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { Survey } from 'types/survey';

import { SurveysState } from '.';

export const surveysReducers = {
  nextSurvey: (state: SurveysState) => {
    const nextPosition = state.currentPosition + 1;
    state.currentPosition = nextPosition >= state.surveys.length ? 0 : nextPosition;
  },
  selectSurvey: (state: SurveysState, action: PayloadAction<number>) => {
    state.currentPosition = action.payload;
  },
};

export const getSurveysThunkCreator: AsyncThunkPayloadCreator<Survey[], void, JSONObject> = async () => {
  return getSurveys().then((response: DeserializableArrayResponse) => {
    const surveys = deserializeList<Survey>(response.data);

    return surveys;
  });
};
