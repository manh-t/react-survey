import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { answerDataTestIds } from 'components/Answer';
import { useAppDispatch, useAppSelector } from 'hooks';
import { SurveyState } from 'store/reducers/Survey';
import TestWrapper from 'tests/TestWrapper';

import QuestionScreen, { questionScreenTestIds } from '.';

const mockDispatch = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock('hooks');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useNavigate: () => mockUseNavigate,
}));

describe('QuestionScreen', () => {
  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <QuestionScreen />
      </TestWrapper>
    );
  };

  const mockState: { survey: SurveyState } = {
    survey: {
      survey: {
        id: 'd5de6a8f8f5f1cfe51bc',
        resourceType: 'survey',
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        questions: [
          {
            id: 'question 1',
            resourceType: 'question',
            text: 'Question 1',
            displayType: 'intro',
            answers: [],
          },
          {
            id: 'question 2',
            resourceType: 'question',
            text: 'Question 2',
            displayType: 'slider',
            answers: [
              {
                id: 'answer 1',
                resourceType: 'answer',
                text: 'Answer 1',
              },
              {
                id: 'answer 2',
                resourceType: 'answer',
                text: 'Answer 2',
              },
            ],
          },
          {
            id: 'question 3',
            resourceType: 'question',
            text: 'Question 3',
            displayType: 'outro',
            answers: [],
          },
        ],
      },
      isLoading: true,
      isError: false,
    },
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((callback) => callback(mockState));
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Question screen and its components', () => {
    render(<TestComponent />);

    const currentIndex = screen.getByTestId(questionScreenTestIds.index);
    const questionTitle = screen.getByTestId(questionScreenTestIds.title);
    const answerComponent = screen.getByTestId(answerDataTestIds.base);
    const closeButton = screen.getByTestId(questionScreenTestIds.closeButton);
    const nextButton = screen.getByTestId(questionScreenTestIds.nextButton);

    expect(currentIndex).toBeVisible();
    expect(currentIndex).toHaveTextContent('1/3');
    expect(questionTitle).toBeVisible();
    expect(questionTitle).toHaveTextContent('Question 1');
    expect(answerComponent).toBeVisible();
    expect(closeButton).toBeVisible();
    expect(nextButton).toBeVisible();
  });

  describe('given the next button is clicked', () => {
    it('renders the next question', () => {
      render(<TestComponent />);

      const currentIndex = screen.getByTestId(questionScreenTestIds.index);
      const questionTitle = screen.getByTestId(questionScreenTestIds.title);
      const nextButton = screen.getByTestId(questionScreenTestIds.nextButton);

      act(() => {
        nextButton.click();
      });

      expect(currentIndex).toBeVisible();
      expect(currentIndex).toHaveTextContent('2/3');
      expect(questionTitle).toBeVisible();
      expect(questionTitle).toHaveTextContent('Question 2');
    });
  });

  describe('given the close button is clicked', () => {
    it('navigates back to the previous screen', () => {
      render(<TestComponent />);

      const closeButton = screen.getByTestId(questionScreenTestIds.closeButton);

      act(() => {
        closeButton.click();
      });

      expect(mockUseNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
