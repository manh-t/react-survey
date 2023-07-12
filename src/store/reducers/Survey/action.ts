import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { getSurvey } from 'adapters/Survey';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { Survey } from 'types/survey';

export const getSurveyThunkCreator: AsyncThunkPayloadCreator<Survey, string, JSONObject> = async (surveyId: string) => {
  return getSurvey(surveyId).then((response: DeserializableResponse) => {
    const survey = deserialize<Survey>(response.data, response.included);

    return survey;
  });
};
