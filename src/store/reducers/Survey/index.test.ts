/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosResponse } from 'axios';

import { getSurvey } from 'adapters/Survey';

import { getSurveyAsyncThunk, surveySlice } from '.';

jest.mock('adapters/Survey');

describe('survey slice', () => {
  describe('getSurveyAsyncThunk', () => {
    const successResponse = {
      data: {
        id: 'd5de6a8f8f5f1cfe51bc',
        type: 'survey',
        attributes: {
          title: 'Scarlett Bangkok',
          description: "We'd love ot hear from you!",
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        },
      },
    };

    it('calls getSurvey API successfully', async () => {
      (getSurvey as jest.Mock).mockResolvedValue(successResponse as AxiosResponse);
      const dispatch = jest.fn();

      const input = 'survey id';

      const getSurveyFunction = getSurveyAsyncThunk(input);

      const getSurveyPayload = await getSurveyFunction(dispatch, () => {}, undefined);

      const expectedResult = {
        id: 'd5de6a8f8f5f1cfe51bc',
        resourceType: 'survey',
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
      };

      expect(getSurveyPayload.meta.arg).toBe(input);
      expect(getSurveyPayload.payload).toEqual(expectedResult);

      expect(dispatch).toHaveBeenNthCalledWith(1, getSurveyAsyncThunk.pending(getSurveyPayload.meta.requestId, input));
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        getSurveyAsyncThunk.fulfilled(expectedResult, getSurveyPayload.meta.requestId, input)
      );
    });
  });

  describe('extraReducers', () => {
    const mockEmptyState = {
      isLoading: true,
      isError: false,
    };

    describe('getSurveyAsyncThunk.pending', () => {
      it('returns no survey', async () => {
        const dispatchedState = surveySlice.reducer(mockEmptyState, {
          type: 'survey/getSurvey/pending',
        });

        expect(dispatchedState.isLoading).toBe(true);
        expect(dispatchedState.survey).toBeUndefined();
        expect(dispatchedState.isError).toBe(false);
      });
    });

    describe('getSurveyAsyncThunk.fulfilled', () => {
      it('returns the survey', async () => {
        const expectedResult = {
          id: 'd5de6a8f8f5f1cfe51bc',
          resourceType: 'survey',
          title: 'Scarlett Bangkok',
          description: "We'd love ot hear from you!",
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        };
        const dispatchedState = surveySlice.reducer(mockEmptyState, {
          type: 'survey/getSurvey/fulfilled',
          payload: expectedResult,
        });

        expect(dispatchedState.isLoading).toBe(false);
        expect(dispatchedState.isError).toBe(false);
        expect(dispatchedState.survey).toBe(expectedResult);
      });
    });

    describe('getSurveyAsyncThunk.rejected', () => {
      it('returns no survey', async () => {
        const dispatchedState = surveySlice.reducer(mockEmptyState, {
          type: 'survey/getSurvey/rejected',
        });

        expect(dispatchedState.isLoading).toBe(false);
        expect(dispatchedState.isError).toBe(true);
        expect(dispatchedState.survey).toBeUndefined();
      });
    });
  });
});
