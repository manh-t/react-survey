/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosResponse } from 'axios';

import { signIn as authenticationSignIn } from 'adapters/Authentication';
import { mockAxiosError } from 'tests/error';
import { APIError } from 'types/error';

import { authSlice, initialState, signInAsyncThunk } from '.';
import { SignInInput } from './actions';

// The AsyncThunk test is following https://github.com/reduxjs/redux-toolkit/blob/635d6d5e513e13dd59cd717f600d501b30ca2381/src/tests/createAsyncThunk.test.ts

jest.mock('adapters/Authentication');

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
        const dispatch = jest.fn();
        const input: SignInInput = { email: 'test@test.com', password: 'password' };

        const signInFunction = signInAsyncThunk(input);

        const signInPayload = await signInFunction(dispatch, () => {}, undefined);

        const expectedResult = {
          accessToken: accessToken,
          id: resourceId,
          refreshToken: refreshToken,
          resourceType: resourceType,
          tokenType: tokenType,
        };

        expect(signInPayload.meta.arg).toBe(input);
        expect(signInPayload.payload).toEqual(expectedResult);

        expect(dispatch).toHaveBeenNthCalledWith(1, signInAsyncThunk.pending(signInPayload.meta.requestId, input));
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          signInAsyncThunk.fulfilled(expectedResult, signInPayload.meta.requestId, input)
        );
      });

      it('calls signIn API unsuccessfully WITH response data', async () => {
        (authenticationSignIn as jest.Mock).mockRejectedValue(mockError);
        const dispatch = jest.fn();

        const input: SignInInput = { email: 'test@test.com', password: 'password' };
        const signInFunction = signInAsyncThunk(input);

        try {
          await signInFunction(dispatch, () => {}, undefined);
        } catch (e) {}

        const errorAction = dispatch.mock.calls[1][0];

        expect(errorAction.error.message).toBe('Rejected');
        expect(errorAction.payload).toEqual({ data: mockError.response?.data, status: mockError.response?.status });
        expect(errorAction.meta.arg).toBe(input);

        expect(dispatch).toHaveBeenNthCalledWith(1, signInAsyncThunk.pending(errorAction.meta.requestId, input));
        expect(dispatch).toHaveBeenCalledTimes(2);
      });

      it('calls signIn API unsuccessfully WITHOUT response data', async () => {
        const error = Error('error test');
        (authenticationSignIn as jest.Mock).mockRejectedValue(error);
        const dispatch = jest.fn();

        const input: SignInInput = { email: 'test@test.com', password: 'password' };
        const signInFunction = signInAsyncThunk(input);

        try {
          await signInFunction(dispatch, () => {}, undefined);
        } catch (e) {}

        const errorAction = dispatch.mock.calls[1][0];

        expect(errorAction.error.message).toBe(error.message);
        expect(errorAction.meta.arg).toBe(input);

        expect(dispatch).toHaveBeenNthCalledWith(1, signInAsyncThunk.pending(errorAction.meta.requestId, input));
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
    });

    describe('given the thunk action is pending', () => {
      it('sets loading to true and resets errors', () => {
        const action = { type: signInAsyncThunk.pending.type, payload: { email: 'test@test.com', password: 'password' } };
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
        const action = { type: signInAsyncThunk.fulfilled.type, payload: expectedResult };
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
        const action = { type: signInAsyncThunk.rejected.type, payload: mockError.response };
        const state = authSlice.reducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.errors).toEqual([errors[0].detail]);
      });
    });
  });
});
