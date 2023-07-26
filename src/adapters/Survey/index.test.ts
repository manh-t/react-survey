import { getAuth } from 'adapters/BaseAuth';

import { getSurveys } from '.';

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
});
