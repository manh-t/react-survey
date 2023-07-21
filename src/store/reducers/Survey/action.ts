import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { getSurvey, submitSurvey } from 'adapters/Survey';
import { DeserializableResponse, deserialize } from 'helpers/deserializer';
import { JSONObject } from 'helpers/json';
import { SurveySubmitRequest } from 'types/request/surveySubmitRequest';
import { Survey } from 'types/survey';

export const getSurveyThunkCreator: AsyncThunkPayloadCreator<Survey, string, JSONObject> = async (surveyId: string) => {
  return getSurvey(surveyId).then((response: DeserializableResponse) => deserialize<Survey>(response.data, response.included));
};

export const submitSurveyThunkCreator: AsyncThunkPayloadCreator<void, SurveySubmitRequest, JSONObject> = (
  surveySubmitRequest
) => {
  return submitSurvey(surveySubmitRequest).then();
};
