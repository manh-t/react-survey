import { PayloadAction } from '@reduxjs/toolkit';

import { SurveysState } from '.';

export const surveysReducers = {
  nextSurvey: (state: SurveysState) => {
    const nextPosition = state.currentPosition + 1;
    state.currentPosition = nextPosition >= state.surveys.length ? 0 : nextPosition;
  },
  selectSurvey: (state: SurveysState, action: PayloadAction<number>) => {
    state.currentPosition = action.payload;
  },
};
