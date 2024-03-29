/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosResponse } from 'axios';

import { getUserInfo } from 'adapters/User';

import { getUser, userSlice } from '.';

jest.mock('adapters/User');

describe('user slice', () => {
  describe('getUser', () => {
    const successResponse = {
      data: {
        id: '1',
        type: 'user',
        attributes: {
          name: 'test user',
          email: 'email@email.com',
          avatarUrl: 'http://testurl.com',
        },
      },
    };

    it('calls getUserInfo API successfully', async () => {
      (getUserInfo as jest.Mock).mockResolvedValue(successResponse as AxiosResponse);
      const dispatch = jest.fn();

      const getUserFunction = getUser();

      const getUserPayload = await getUserFunction(dispatch, () => {}, undefined);

      const expectedResult = {
        id: '1',
        resourceType: 'user',
        email: 'email@email.com',
        avatarUrl: 'http://testurl.com',
        name: 'test user',
      };

      expect(getUserPayload.payload).toEqual(expectedResult);

      expect(dispatch).toHaveBeenNthCalledWith(1, getUser.pending(getUserPayload.meta.requestId));
      expect(dispatch).toHaveBeenNthCalledWith(2, getUser.fulfilled(expectedResult, getUserPayload.meta.requestId));
    });
  });

  describe('extraReducers', () => {
    const mockEmptyState = {};

    describe('getUser.fulfilled', () => {
      it('returns the user info', async () => {
        const expectedResult = {
          id: '1',
          resourceType: 'user',
          email: 'email@email.com',
          avatarUrl: 'http://testurl.com',
          name: 'test user',
        };

        const dispatchedState = userSlice.reducer(mockEmptyState, {
          type: 'user/getUser/fulfilled',
          payload: expectedResult,
        });

        expect(dispatchedState.user).toBe(expectedResult);
      });
    });
  });
});
