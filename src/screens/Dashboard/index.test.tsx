import React from 'react';

import { render } from '@testing-library/react';

import { getToken } from 'helpers/authentication';
import { useAppDispatch, useAppSelector } from 'hooks';
import { paths } from 'routes';
import { SurveysState } from 'store/reducers/Surveys';
import TestWrapper from 'tests/TestWrapper';

import DashBoardScreen from '.';

const mockUseNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('hooks');

jest.mock('helpers/authentication');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useNavigate: () => mockUseNavigate,
}));

describe('DashboardScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <DashBoardScreen />
      </TestWrapper>
    );
  };

  const mockState: { surveys: SurveysState } = {
    surveys: {
      surveys: [
        {
          id: '1',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
        },
      ],
      currentPosition: 0,
    },
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((callback) => callback(mockState));
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('given the token is undefined', () => {
    beforeEach(() => {
      (getToken as jest.Mock).mockImplementation(() => undefined);
    });

    it('navigate to the SignIn screen', () => {
      render(<TestComponent />);

      expect(mockUseNavigate).toHaveBeenCalledWith(paths.signIn);
    });
  });
});
