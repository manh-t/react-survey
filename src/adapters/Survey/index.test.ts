import { getAuth } from 'adapters/BaseAuth';

import { getSurvey, getSurveys } from '.';

jest.mock('adapters/BaseAuth');

describe('SurveyAdapter', () => {
  beforeEach(() => {
    (getAuth as jest.Mock).mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
});
