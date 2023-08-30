import React from 'react';

import { render, screen } from '@testing-library/react';

import { mainViewTestIds } from 'components/MainView';
import TestWrapper from 'tests/TestWrapper';

import SurveyScreen, { surveyScreenTestIds } from '.';

describe('SurveyScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <SurveyScreen />
      </TestWrapper>
    );
  };

  it('renders Survey screen and its components', () => {
    render(<TestComponent />);

    const backgroundImage = screen.getByTestId(mainViewTestIds.base);
    const backButton = screen.getByTestId(surveyScreenTestIds.backButton);
    const coverImage = screen.getByTestId(surveyScreenTestIds.coverImage);
    const title = screen.getByTestId(surveyScreenTestIds.title);
    const description = screen.getByTestId(surveyScreenTestIds.description);
    const startSurveyButton = screen.getByTestId(surveyScreenTestIds.startSurveyButton);

    expect(backgroundImage).toBeVisible();
    expect(backButton).toBeVisible();
    expect(coverImage).toBeVisible();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(startSurveyButton).toBeVisible();
    expect(startSurveyButton).toHaveTextContent('Start Survey');
  });
});
