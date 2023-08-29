import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import { mainViewTestIds } from 'components/MainView';
import { useAppDispatch, useAppSelector } from 'hooks';
import { SurveyState } from 'store/reducers/Survey';
import TestWrapper from 'tests/TestWrapper';

import SurveyScreen, { surveyScreenTestIds } from '.';

const mockDispatch = jest.fn();

jest.mock('hooks');

describe('SurveyScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <SurveyScreen />
      </TestWrapper>
    );
  };

  const mockState: { survey: SurveyState } = {
    survey: {
      survey: {
        id: faker.string.uuid(),
        resourceType: 'survey',
        title: faker.string.sample(),
        description: faker.string.sample(),
        coverImageUrl: faker.image.url(),
      },
      isLoading: true,
      isError: false,
    },
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((callback) => callback(mockState));
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('given the isLoading is true', () => {
    it('shows the loading indicator', () => {
      render(<TestComponent />);

      const loadingDialogComponent = screen.getByTestId(surveyScreenTestIds.loadingDialog);

      expect(loadingDialogComponent).toBeVisible();
    });
  });

  describe('given the isLoading is false', () => {
    beforeEach(() => {
      mockState.survey.isLoading = false;
    });

    it('does NOT show the loading indicator', () => {
      render(<TestComponent />);

      expect(screen.queryByTestId(surveyScreenTestIds.loadingDialog)).not.toBeInTheDocument();
    });

    it('renders Survey screen and its components', () => {
      render(<TestComponent />);
      const mainView = screen.getByTestId(mainViewTestIds.base);
      const backButton = screen.getByTestId(surveyScreenTestIds.backButton);
      const coverImage = screen.getByTestId(surveyScreenTestIds.coverImage);
      const title = screen.getByTestId(surveyScreenTestIds.title);
      const description = screen.getByTestId(surveyScreenTestIds.description);
      const startSurveyButton = screen.getByTestId(surveyScreenTestIds.startSurveyButton);

      expect(mainView).toBeVisible();
      expect(backButton).toBeVisible();
      expect(coverImage).toBeVisible();
      expect(title).toBeVisible();
      expect(description).toBeVisible();
      expect(startSurveyButton).toBeVisible();
      expect(startSurveyButton).toHaveTextContent('Start Survey');
    });
  });
});
