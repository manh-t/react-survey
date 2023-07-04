import { createSlice } from '@reduxjs/toolkit';

import { Survey } from 'types/survey';

import { surveysReducers } from './actions';

export interface SurveysState {
  surveys: Survey[];
  currentPosition: number;
}

export const initialState: SurveysState = {
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
      coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/287db81c5e4242412cc0_',
      title: 'I would like to know your life',
      description: 'Please let us know if you are having problems in life',
    },
    {
      id: '3',
      resourceType: 'survey',
      coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/0221e768b99dc3576210_',
      title: 'We will rock you!',
      description: 'La la la la la la la la l al al la lalal',
    },
  ],
  currentPosition: 0,
};

export const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: surveysReducers,
});

export const surveysAction = surveysSlice.actions;
