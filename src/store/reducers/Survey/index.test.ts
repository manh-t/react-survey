/* eslint-disable @typescript-eslint/no-empty-function */
import { faker } from '@faker-js/faker';
import { AxiosResponse } from 'axios';

import { getSurvey } from 'adapters/Survey';

import { getSurveyAsyncThunk, surveySlice } from '.';

jest.mock('adapters/Survey');

describe('survey slice', () => {
  const id = faker.string.uuid();
  const title = faker.string.sample();
  const description = faker.string.sample();
  const coverImageUrl = faker.image.url();
  const surveyResponse = {
    data: {
      id: id,
      type: 'survey',
      attributes: {
        title: title,
        description: description,
        coverImageUrl: coverImageUrl,
      },
    },
  };

  const survey = {
    id: id,
    resourceType: 'survey',
    title: title,
    description: description,
    coverImageUrl: coverImageUrl,
  };

  describe('getSurveyAsyncThunk', () => {
    it('calls getSurvey API successfully', async () => {
      (getSurvey as jest.Mock).mockResolvedValue(surveyResponse as AxiosResponse);
      const dispatch = jest.fn();

      const input = 'survey id';

      const getSurveyFunction = getSurveyAsyncThunk(input);

      const getSurveyPayload = await getSurveyFunction(dispatch, () => {}, undefined);

      expect(getSurveyPayload.meta.arg).toBe(input);
      expect(getSurveyPayload.payload).toEqual(survey);

      expect(dispatch).toHaveBeenNthCalledWith(1, getSurveyAsyncThunk.pending(getSurveyPayload.meta.requestId, input));
      expect(dispatch).toHaveBeenNthCalledWith(2, getSurveyAsyncThunk.fulfilled(survey, getSurveyPayload.meta.requestId, input));
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
        const dispatchedState = surveySlice.reducer(mockEmptyState, {
          type: 'survey/getSurvey/fulfilled',
          payload: survey,
        });

        expect(dispatchedState.isLoading).toBe(false);
        expect(dispatchedState.isError).toBe(false);
        expect(dispatchedState.survey).toBe(survey);
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
