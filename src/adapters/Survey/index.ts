import { getAuth, postAuth } from 'adapters/BaseAuth';
import { JSONObject } from 'helpers/json';
import { SurveySubmitRequest } from 'types/request/surveySubmitRequest';

export const getSurveys = () => getAuth('surveys?page[number]=1&page[size]=10');

export const getSurvey = (surveyId: string) => getAuth(`surveys/${surveyId}`);

export const submitSurvey = (surveySubmitRequest: SurveySubmitRequest) =>
  postAuth('responses', surveySubmitRequest as unknown as JSONObject);
