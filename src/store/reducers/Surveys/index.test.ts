import { SurveysState, initialState } from '.';
import { surveysReducers } from './actions';

describe('surveys slice', () => {
  describe('nextSurvey', () => {
    it('changes the current position to next position', () => {
      const mockState: SurveysState = { ...initialState };

      surveysReducers.nextSurvey(mockState);

      expect(mockState.currentPosition).toBe(1);
    });

    it("resets the current position when the next position is larger than the total surveys's indexes", () => {
      const mockState: SurveysState = { ...initialState };

      surveysReducers.nextSurvey(mockState);
      surveysReducers.nextSurvey(mockState);
      surveysReducers.nextSurvey(mockState);

      expect(mockState.currentPosition).toBe(0);
    });
  });

  describe('selectSurvey', () => {
    it('changes the current position to the selected position', () => {
      const mockState: SurveysState = { ...initialState };

      surveysReducers.selectSurvey(mockState, { type: 'selectSurvey', payload: 2 });

      expect(mockState.currentPosition).toBe(2);
    });
  });
});
