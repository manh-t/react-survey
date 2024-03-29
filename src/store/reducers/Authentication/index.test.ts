/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosResponse } from 'axios';

import { signIn as authenticationSignIn } from 'adapters/Authentication';
import { setToken } from 'helpers/authentication';
import { mockAxiosError } from 'tests/error';
import { APIError } from 'types/error';

import { authSlice, initialState, signIn } from '.';
import { SignInInput } from './actions';

// The AsyncThunk test is following https://github.com/reduxjs/redux-toolkit/blob/635d6d5e513e13dd59cd717f600d501b30ca2381/src/tests/createAsyncThunk.test.ts

jest.mock('adapters/Authentication');
jest.mock('helpers/authentication');

describe('auth slice', () => {
  describe('signIn', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    const resourceId = 'resource id';
    const resourceType = 'resource type';
    const accessToken = 'access token';
    const refreshToken = 'refresh token';
    const tokenType = 'token type';

    describe('payload creator', () => {
      const successResponse = {
        data: {
          id: resourceId,
          type: resourceType,
          attributes: { accessToken: accessToken, refreshToken: refreshToken, tokenType: tokenType },
        },
      };

      const errors: APIError[] = [
        {
          title: 'Internal server error',
          detail: 'error detail',
          code: 'internal_server_error',
        },
      ];
      const mockError = mockAxiosError(500, 'Internal server error', errors);

      it('calls signIn API successfully', async () => {
        (authenticationSignIn as jest.Mock).mockResolvedValue(successResponse as AxiosResponse);
        const input: SignInInput = { email: 'test@test.com', password: 'password' };

        const signInFunction = signIn(input);

        const signInPayload = await signInFunction(jest.fn(), () => {}, undefined);

        const expectedResult = {
          accessToken: accessToken,
          id: resourceId,
          refreshToken: refreshToken,
          resourceType: resourceType,
          tokenType: tokenType,
        };

        expect(signInPayload.meta.arg).toBe(input);
        expect(signInPayload.payload).toEqual(expectedResult);

        expect(setToken).toHaveBeenCalledWith(expectedResult);
      });

      it('calls signIn API unsuccessfully WITH response data', async () => {
        (authenticationSignIn as jest.Mock).mockRejectedValue(mockError);
        const dispatch = jest.fn();

        const input: SignInInput = { email: 'test@test.com', password: 'password' };
        const signInFunction = signIn(input);

        try {
          await signInFunction(dispatch, () => {}, undefined);
        } catch (e) {}

        const errorAction = dispatch.mock.calls[1][0];

        expect(errorAction.error.message).toBe('Rejected');
        expect(errorAction.payload).toEqual({ data: mockError.response?.data, status: mockError.response?.status });
        expect(errorAction.meta.arg).toBe(input);
      });

      it('calls signIn API unsuccessfully WITHOUT response data', async () => {
        const error = Error('error test');
        (authenticationSignIn as jest.Mock).mockRejectedValue(error);
        const dispatch = jest.fn();

        const input: SignInInput = { email: 'test@test.com', password: 'password' };
        const signInFunction = signIn(input);

        try {
          await signInFunction(dispatch, () => {}, undefined);
        } catch (e) {}

        const errorAction = dispatch.mock.calls[1][0];

        expect(errorAction.error.message).toBe(error.message);
        expect(errorAction.meta.arg).toBe(input);
      });
    });

    describe('given the thunk action is pending', () => {
      it('sets loading to true and resets errors', () => {
        const action = { type: signIn.pending.type, payload: { email: 'test@test.com', password: 'password' } };
        const state = authSlice.reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.errors).toBeUndefined();
      });
    });

    describe('given the thunk action is fulfilled', () => {
      it('sets success to true and loading to false', () => {
        const expectedResult = {
          accessToken: accessToken,
          id: resourceId,
          refreshToken: refreshToken,
          resourceType: resourceType,
          tokenType: tokenType,
        };
        const action = { type: signIn.fulfilled.type, payload: expectedResult };
        const state = authSlice.reducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.success).toBe(true);
        expect(state.token).toBe(expectedResult);
      });
    });

    describe('given the thunk action is rejected', () => {
      const errors: APIError[] = [
        {
          title: 'Internal server error',
          detail: 'error detail',
          code: 'internal_server_error',
        },
      ];
      const mockError = mockAxiosError(500, 'Internal server error', errors);

      it('sets loading to false and adds data to error', () => {
        const action = { type: signIn.rejected.type, payload: mockError.response };
        const state = authSlice.reducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.errors).toEqual([errors[0].detail]);
      });
    });
  });
});
