import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { Answer } from 'types/answer';

import MultiChoice, { multiChoiceDataTestIds } from '.';

describe('MultiChoice', () => {
  it('renders a multi choice component', () => {
    const answers = [
      { id: '1', resourceType: 'answer', text: 'Test 1' },
      { id: '2', resourceType: 'answer', text: 'Test 2' },
      { id: '3', resourceType: 'answer', text: 'Test 3' },
    ];

    render(<MultiChoice items={answers} isPickOne={false} />);

    const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

    expect(multiChoice).toBeVisible();
    expect(within(multiChoice).getAllByRole('presentation')).toHaveLength(3);
  });

  describe('given can pick many choices', () => {
    describe('given the first two items is clicked', () => {
      it('renders the first two components as checked state', () => {
        let selectedValues: Answer[] = [];

        const handleValuesChanged = (answers: Answer[]) => {
          selectedValues = answers;
        };
        const answers = [
          { id: '1', resourceType: 'answer', text: 'Test 1' },
          { id: '2', resourceType: 'answer', text: 'Test 2' },
          { id: '3', resourceType: 'answer', text: 'Test 3' },
        ];

        render(<MultiChoice items={answers} isPickOne={false} onValuesChanged={(answers) => handleValuesChanged(answers)} />);

        const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

        act(() => {
          within(multiChoice).getAllByRole('presentation').at(0)?.click();
        });

        act(() => {
          within(multiChoice).getAllByRole('presentation').at(1)?.click();
        });

        expect(within(multiChoice).getByText('Test 1')).not.toHaveClass('opacity-50');
        expect(within(multiChoice).getByText('Test 2')).not.toHaveClass('opacity-50');
        expect(selectedValues).toHaveLength(2);
      });
    });
  });

  describe('given can pick one choice', () => {
    describe('given the first item is clicked', () => {
      it('renders the first component as checked state', () => {
        let selectedValues: Answer[] = [];

        const handleValuesChanged = (answers: Answer[]) => {
          selectedValues = answers;
        };
        const answers = [
          { id: '1', resourceType: 'answer', text: 'Test 1' },
          { id: '2', resourceType: 'answer', text: 'Test 2' },
          { id: '3', resourceType: 'answer', text: 'Test 3' },
        ];

        render(<MultiChoice items={answers} isPickOne onValuesChanged={(answers) => handleValuesChanged(answers)} />);

        const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

        act(() => {
          within(multiChoice).getAllByRole('presentation').at(0)?.click();
        });

        expect(within(multiChoice).getByText('Test 1')).not.toHaveClass('opacity-50');
        expect(selectedValues).toHaveLength(1);
      });
    });
  });
});
