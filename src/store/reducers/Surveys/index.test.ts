/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosResponse } from 'axios';

import { getSurveys as getSurveysAdapter } from 'adapters/Survey';

import { getSurveys, surveysSlice } from '.';
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
    beforeEach(() => {
      mockInitialState.currentPosition = 0;
    });

    it('changes the current position to next position', () => {
      surveysReducers.nextSurvey(mockInitialState);

      expect(mockInitialState.currentPosition).toBe(1);
    });

    it("resets the current position when the next position is larger than the total surveys's indexes", () => {
      surveysReducers.nextSurvey(mockInitialState);
      surveysReducers.nextSurvey(mockInitialState);
      surveysReducers.nextSurvey(mockInitialState);

      expect(mockInitialState.currentPosition).toBe(0);
    });
  });

  describe('selectSurvey', () => {
    it('changes the current position to the selected position', () => {
      surveysReducers.selectSurvey(mockInitialState, { type: 'selectSurvey', payload: 2 });

      expect(mockInitialState.currentPosition).toBe(2);
    });
  });

  describe('getSurveys', () => {
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
      (getSurveysAdapter as jest.Mock).mockResolvedValue(successResponse as AxiosResponse);
      const dispatch = jest.fn();

      const getSurveysFunction = getSurveys();

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
    });
  });

  describe('extraReducers', () => {
    const mockEmptyState = {
      surveys: [],
      currentPosition: 0,
      isInitialLoading: true,
    };

    describe('getSurveys.fulfilled', () => {
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

    describe('getSurveys.rejected', () => {
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
