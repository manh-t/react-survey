import React from 'react';

import { render, screen } from '@testing-library/react';

import TestWrapper from 'tests/TestWrapper';

import QuestionCompleteScreen, { questionCompleteDataTestIds } from '.';

describe('QuestionCompleteScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <QuestionCompleteScreen />
      </TestWrapper>
    );
  };

  it('renders Question Complete screen and its components', () => {
    render(<TestComponent />);
    const lottie = screen.getByTestId(questionCompleteDataTestIds.lottie);
    const thankYou = screen.getByTestId(questionCompleteDataTestIds.thankYou);

    expect(lottie).toBeVisible();
    expect(thankYou).toBeVisible();
    expect(thankYou).toHaveTextContent('Thanks for taking the survey.');
  });
});
