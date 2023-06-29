import React from 'react';

import { render } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { SurveysState } from 'store/reducers/Surveys';
import TestWrapper from 'tests/TestWrapper';

import DashBoardScreen from '.';

const mockUseNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('hooks');

jest.mock('react-router-dom', () => ({
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
      isInitialLoading: true,
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
    // eslint-disable-next-line jest/no-disabled-tests, jest/expect-expect
    it.skip('navigates to the SignIn screen', () => {
      render(<TestComponent />);

      // TODO: replace by another unit test later
    });
  });
});
