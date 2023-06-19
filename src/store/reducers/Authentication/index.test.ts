import { AxiosResponse } from 'axios';

import authenticationAdapter from 'adapters/Authentication';
import { APIError } from 'helpers/error';
import { mockAxiosError } from 'tests/error';

import { authSlice, initialState, signIn } from '.';
import { SignInInput, signInAsync } from './actions';

jest.mock('adapters/Authentication');

describe('auth slice', () => {
  describe('signIn', () => {
    const mockSignIn = jest.fn();

    beforeEach(() => {
      authenticationAdapter.signIn = mockSignIn;
    });

    describe('payload creator', () => {
      const mockDispatch = jest.fn();
      const mockRejectWithValue = jest.fn();
      const mockThunkAPI = {
        dispatch: mockDispatch,
        getState: jest.fn(),
        extra: undefined,
        requestId: '',
        signal: jest.fn() as unknown as AbortSignal,
        abort: jest.fn(),
        rejectWithValue: mockRejectWithValue,
        fulfillWithValue: jest.fn(),
      };
      const resourceId = 'resource id';
      const successResponse = {
        data: {
          id: resourceId,
          type: 'resource type',
          attributes: { accessToken: 'access token', refreshToken: 'refresh token', tokenType: 'token type' },
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
        const payload: SignInInput = { email: 'test@test.com', password: 'password' };

        const authenticationMock = jest.spyOn(authenticationAdapter, 'signIn');
        authenticationMock.mockResolvedValue(successResponse as AxiosResponse);

        await signInAsync(payload, mockThunkAPI);

        expect(authenticationMock).toHaveBeenCalledWith(...Object.values(payload));

        authenticationMock.mockRestore();
      });

      it('calls signIn API unsuccessfully WITH response data', async () => {
        const payload: SignInInput = { email: 'test@test.com', password: 'password' };

        const authenticationMock = jest.spyOn(authenticationAdapter, 'signIn');
        authenticationMock.mockRejectedValue(mockError);

        await signInAsync(payload, mockThunkAPI);

        expect(mockRejectWithValue).toHaveBeenCalledWith({ data: mockError.response?.data, status: mockError.response?.status });

        authenticationMock.mockRestore();
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
        const action = { type: signIn.fulfilled.type, payload: { email: 'test@test.com', password: 'password' } };
        const state = authSlice.reducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.success).toBe(true);
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
