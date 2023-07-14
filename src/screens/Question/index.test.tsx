import React from 'react';

import { render, screen } from '@testing-library/react';

import TestWrapper from 'tests/TestWrapper';

import QuestionScreen, { questionScreenTestIds } from '.';

describe('QuestionScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <QuestionScreen />
      </TestWrapper>
    );
  };

  it('renders Question screen and its components', () => {
    render(<TestComponent />);

    const currentIndex = screen.getByTestId(questionScreenTestIds.index);
    const questionTitle = screen.getByTestId(questionScreenTestIds.title);
    const closeButton = screen.getByTestId(questionScreenTestIds.closeButton);
    const nextButton = screen.getByTestId(questionScreenTestIds.nextButton);

    expect(currentIndex).toBeVisible();
    expect(questionTitle).toBeVisible();
    expect(closeButton).toBeVisible();
    expect(nextButton).toBeVisible();
  });
});
