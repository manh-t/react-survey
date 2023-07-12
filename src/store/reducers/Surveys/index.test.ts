/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosResponse } from 'axios';

import { getSurveys } from 'adapters/Survey';

import { SurveysState, getSurveysAsyncThunk, surveysSlice } from '.';
import { surveysReducers } from './actions';

jest.mock('adapters/Survey');

describe('surveys slice', () => {
  const mockInitialState = {
    surveys: [
      {
        id: '1',
        resourceType: 'survey',
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        title: 'Working from home Check-In',
        description: 'We would like to know how you feel about our work from home.',
      },
      {
        id: '2',
        resourceType: 'survey',
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        title: 'Working from home Check-In',
        description: 'We would like to know how you feel about our work from home.',
      },
      {
        id: '3',
        resourceType: 'survey',
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        title: 'Working from home Check-In',
        description: 'We would like to know how you feel about our work from home.',
      },
    ],
    currentPosition: 0,
    isInitialLoading: true,
  };
  describe('nextSurvey', () => {
    it('changes the current position to next position', () => {
      const mockState: SurveysState = { ...mockInitialState };

      surveysReducers.nextSurvey(mockState);

      expect(mockState.currentPosition).toBe(1);
    });

    it("resets the current position when the next position is larger than the total surveys's indexes", () => {
      const mockState: SurveysState = { ...mockInitialState };

      surveysReducers.nextSurvey(mockState);
      surveysReducers.nextSurvey(mockState);
      surveysReducers.nextSurvey(mockState);

      expect(mockState.currentPosition).toBe(0);
    });
  });

  describe('selectSurvey', () => {
    it('changes the current position to the selected position', () => {
      const mockState: SurveysState = { ...mockInitialState };

      surveysReducers.selectSurvey(mockState, { type: 'selectSurvey', payload: 2 });

      expect(mockState.currentPosition).toBe(2);
    });
  });

  describe('getSurveysAsyncThunk', () => {
    const successResponse = {
      data: [
        {
          id: '1',
          type: 'survey',
          attributes: {
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            title: 'Working from home Check-In',
            description: 'We would like to know how you feel about our work from home.',
          },
        },
        {
          id: '2',
          type: 'survey',
          attributes: {
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            title: 'Working from home Check-In',
            description: 'We would like to know how you feel about our work from home.',
          },
        },
        {
          id: '3',
          type: 'survey',
          attributes: {
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            title: 'Working from home Check-In',
            description: 'We would like to know how you feel about our work from home.',
          },
        },
      ],
    };

    it('calls getSurveys API successfully', async () => {
      (getSurveys as jest.Mock).mockResolvedValue(successResponse as AxiosResponse);
      const dispatch = jest.fn();

      const getSurveysFunction = getSurveysAsyncThunk();

      const getSurveysPayload = await getSurveysFunction(dispatch, () => {}, undefined);

      const expectedResult = [
        {
          id: '1',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
        },
        {
          id: '2',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
        },
        {
          id: '3',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
        },
      ];

      expect(getSurveysPayload.payload).toEqual(expectedResult);

      expect(dispatch).toHaveBeenNthCalledWith(1, getSurveysAsyncThunk.pending(getSurveysPayload.meta.requestId));
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        getSurveysAsyncThunk.fulfilled(expectedResult, getSurveysPayload.meta.requestId)
      );
    });
  });

  describe('extraReducers', () => {
    const mockEmptyState = {
      surveys: [],
      currentPosition: 0,
      isInitialLoading: true,
    };
    describe('getSurveysAsyncThunk.fulfilled', () => {
      it('returns the surveys', async () => {
        const expectedResult = [
          {
            id: '1',
            resourceType: 'survey',
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            title: 'Working from home Check-In',
            description: 'We would like to know how you feel about our work from home.',
          },
          {
            id: '2',
            resourceType: 'survey',
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            title: 'Working from home Check-In',
            description: 'We would like to know how you feel about our work from home.',
          },
          {
            id: '3',
            resourceType: 'survey',
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            title: 'Working from home Check-In',
            description: 'We would like to know how you feel about our work from home.',
          },
        ];
        const dispatchedState = surveysSlice.reducer(mockEmptyState, {
          type: 'surveys/getSurveys/fulfilled',
          payload: expectedResult,
        });

        expect(dispatchedState.isInitialLoading).toBe(false);
        expect(dispatchedState.surveys).toBe(expectedResult);
      });
    });

    describe('getSurveysAsyncThunk.rejected', () => {
      it('returns no surveys', async () => {
        const dispatchedState = surveysSlice.reducer(mockEmptyState, {
          type: 'surveys/getSurveys/rejected',
        });

        expect(dispatchedState.isInitialLoading).toBe(false);
        expect(dispatchedState.surveys).toEqual([]);
      });
    });
  });
});
