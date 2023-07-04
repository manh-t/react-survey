import React from 'react';

import { render, screen, within } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { SurveysState } from 'store/reducers/Surveys';
import { UserState } from 'store/reducers/User';
import TestWrapper from 'tests/TestWrapper';

import DashBoardScreen, { dashboardScreenTestIds } from '.';

// Mock the current date to a fixed date so the test is always correct regardless of the system date.
jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

const mockDispatch = jest.fn();

jest.mock('hooks');

describe('DashboardScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <DashBoardScreen />
      </TestWrapper>
    );
  };

  const mockState: { surveys: SurveysState; user: UserState } = {
    surveys: {
      surveys: [],
      currentPosition: 0,
      isInitialLoading: true,
    },
    user: {},
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((callback) => callback(mockState));
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('given the isInitialLoading is true', () => {
    it('shows the shimmers', () => {
      render(<TestComponent />);

      expect(screen.queryAllByTestId(dashboardScreenTestIds.shimmer)).toHaveLength(8);
    });
  });

  describe('given the isInitialLoading is false', () => {
    beforeEach(() => {
      mockState.surveys.isInitialLoading = false;
      mockState.surveys.surveys = [
        {
          id: '1',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
        },
      ];
    });

    it('does NOT show the shimmers', () => {
      render(<TestComponent />);

      expect(screen.queryAllByTestId(dashboardScreenTestIds.shimmer)).toHaveLength(0);
    });
  });

  describe('given the survey has data', () => {
    beforeEach(() => {
      mockState.surveys.isInitialLoading = false;
      mockState.surveys.surveys = [
        {
          id: '1',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
          createdAt: '2017-01-23T07:48:12.991Z',
        },
      ];
    });

    it('shows the corresponing data', () => {
      render(<TestComponent />);
      const backgroundImageComponent = screen.getByTestId(dashboardScreenTestIds.backgroundImage);
      const dashboardHeaderComponent = screen.getByTestId(dashboardScreenTestIds.header);
      const dashboardContentComponent = screen.getByTestId(dashboardScreenTestIds.content);

      expect(within(backgroundImageComponent).getByAltText('background')).toHaveAttribute(
        'src',
        'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_'
      );
      expect(dashboardHeaderComponent).toHaveTextContent('MON, JAN 23');
      expect(dashboardHeaderComponent).toHaveTextContent('3 years ago');
      expect(dashboardContentComponent).toHaveTextContent('Working from home Check-In');
      expect(dashboardContentComponent).toHaveTextContent('We would like to know how you feel about our work from home.');
    });
  });

  describe('given the user has data', () => {
    beforeEach(() => {
      mockState.surveys.isInitialLoading = false;
      mockState.surveys.surveys = [
        {
          id: '1',
          resourceType: 'survey',
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          title: 'Working from home Check-In',
          description: 'We would like to know how you feel about our work from home.',
          createdAt: '2017-01-23T07:48:12.991Z',
        },
      ];
      mockState.user.user = {
        id: 'id',
        resourceType: 'type',
        email: 'test',
        avatarUrl: 'http://testurl.com',
        name: 'test user',
      };
    });

    it('shows the corresponing data', () => {
      render(<TestComponent />);
      const dashboardHeaderComponent = screen.getByTestId(dashboardScreenTestIds.header);

      expect(within(dashboardHeaderComponent).getByAltText('user avatar')).toHaveAttribute('src', 'http://testurl.com');
    });
  });
});
