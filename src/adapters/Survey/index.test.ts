import { getAuth, postAuth } from 'adapters/BaseAuth';
import { surveySubmitRequestFabricator } from 'tests/fabricator';
import { SurveySubmitRequest } from 'types/request/surveySubmitRequest';

import { getSurvey, getSurveys, submitSurvey } from '.';

jest.mock('adapters/BaseAuth');

describe('SurveyAdapter', () => {
  describe('getSurveys', () => {
    it('calls the get method from the base adapter', () => {
      const expectedPath = 'surveys?page[number]=1&page[size]=10';

      getSurveys();

      expect(getAuth).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('getSurvey', () => {
    it('calls the get method from the base adapter', () => {
      const id = '123123412';
      const expectedPath = `surveys/${id}`;

      getSurvey(id);

      expect(getAuth).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('submitSurvey', () => {
    it('calls the post method from the base adapter', () => {
      const payload: SurveySubmitRequest = surveySubmitRequestFabricator();
      const expectedPath = 'responses';

      submitSurvey(payload);

      expect(postAuth).toHaveBeenCalledWith(expectedPath, payload);
    });
  });
});
