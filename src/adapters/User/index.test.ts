import { getAuth } from 'adapters/BaseAuth';

import { getUserInfo } from '.';

jest.mock('adapters/BaseAuth');

describe('UserAdapter', () => {
  beforeEach(() => {
    (getAuth as jest.Mock).mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserInfo', () => {
    it('calls the get method from the base adapter', () => {
      const expectedPath = 'me';

      getUserInfo();

      expect(getAuth).toHaveBeenCalledWith(expectedPath);
    });
  });
});
