import { getAuth } from 'adapters/BaseAuth';

export const getSurveys = () => getAuth('surveys?page[number]=1&page[size]=10');

export const getSurvey = (surveyId: string) => getAuth(`surveys/${surveyId}`);
